import type { SecretNote } from "@/data/mockData";

/**
 * The three states a secret box can be in.
 *
 * The old code had only `isLocked`, which forced two different ideas into one
 * boolean: "the day has not come yet" and "nobody has opened it yet". That is
 * why the hero could say "Đã mở khóa ✨" and still demand a passcode. They are
 * separate facts and they are kept separate here.
 */
export type SecretStatus = "locked" | "ready" | "opened";

export function statusOf(note: SecretNote, now: number): SecretStatus {
  if (note.openedAt) return "opened";
  return Date.parse(note.unlockAt) > now ? "locked" : "ready";
}

export interface Countdown {
  readonly days: number;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds: number;
}

/**
 * How long until the box opens, or null once the moment has passed.
 *
 * Derived from `unlockAt - now` every time it is asked. The previous version
 * seeded three numbers from the data and decremented them on an interval,
 * which meant a backgrounded tab (where timers are throttled) came back with
 * a clock that had quietly fallen behind real time.
 */
export function timeUntil(note: SecretNote, now: number): Countdown | null {
  const ms = Date.parse(note.unlockAt) - now;
  if (!Number.isFinite(ms) || ms <= 0) return null;
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** dd.mm.yyyy — the format the screen already used for unlock dates. */
export function formatUnlockDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}

/** `<input type="date">` wants yyyy-mm-dd, in local time. */
export function toDateInput(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Today as yyyy-mm-dd, for the `min` of an unlock-date picker. */
export function todayInput(now: number): string {
  return toDateInput(new Date(now).toISOString());
}

/**
 * A date picker gives a day, not a moment. Opening at 09:00 local reads as
 * "that morning" rather than at midnight, which is nobody's idea of a day.
 */
export function fromDateInput(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return new Date().toISOString();
  return new Date(y, m - 1, d, 9, 0, 0).toISOString();
}

/** A passcode is exactly four digits. Anything else is not a passcode. */
export const PASSCODE_LENGTH = 4;

export function isValidPasscode(value: string): boolean {
  return new RegExp(`^\\d{${PASSCODE_LENGTH}}$`).test(value);
}

/**
 * How far along the wait is, 0-100.
 *
 * Measured from when the box was written to when it opens, so it answers
 * "how much of the wait is behind us" rather than being a number somebody
 * typed in. Clamped, because a box can be created and opened out of order.
 */
export function progressOf(note: SecretNote, now: number): number {
  const from = Date.parse(note.createdAt);
  const to = Date.parse(note.unlockAt);
  if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return 100;
  return Math.round(Math.min(100, Math.max(0, ((now - from) / (to - from)) * 100)));
}

/** Whole days left, rounded up. 0 means it opens today or is already due. */
export function daysUntil(note: SecretNote, now: number): number {
  const ms = Date.parse(note.unlockAt) - now;
  return ms <= 0 ? 0 : Math.ceil(ms / 86400000);
}
