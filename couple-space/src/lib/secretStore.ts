"use client";

import { useSyncExternalStore } from "react";
import { secretNotes as seedNotes } from "@/data/mockData";
import type { SecretNote } from "@/data/mockData";

/**
 * A shared store for secret boxes, same shape as `memoryStore`.
 *
 * It replaces a `useState(secretNotes)` that lived inside the screen: every
 * edit was invisible to anything else, and the home page could only quote
 * hard-coded numbers because it had no way to see the real ones.
 *
 * Still memory only — a refresh restores the seed data. Real persistence is
 * a Server Action writing through Prisma, and it is the point at which the
 * lock stops being decorative; see plan.md § Giai đoạn 7.
 */

interface State {
  readonly notes: readonly SecretNote[];
}

let state: State = { notes: seedNotes };

const listeners = new Set<() => void>();

function setState(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Must return a stable reference or useSyncExternalStore loops forever.
const getSnapshot = () => state;

export function useSecretNotes(): readonly SecretNote[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot).notes;
}

export function useSecretNote(id: string): SecretNote | undefined {
  return useSecretNotes().find((n) => n.id === id);
}

/* ---------------- mutations ---------------- */

const replace = (id: string, fn: (n: SecretNote) => SecretNote) =>
  setState({ notes: state.notes.map((n) => (n.id === id ? fn(n) : n)) });

export function addSecretNote(note: SecretNote) {
  setState({ notes: [note, ...state.notes] });
}

/**
 * Patch a note. `unlockAt` is included on purpose: the edit dialog always
 * offered to change the unlock date, but the old handler copied across only
 * title, text and category, so the date was dropped after the screen had
 * already said "Đã gửi thành công!".
 */
export function updateSecretNote(
  id: string,
  patch: Partial<Pick<SecretNote, "title" | "preview" | "content" | "unlockAt" | "category">>
) {
  replace(id, (n) => ({ ...n, ...patch }));
}

/** Every add has a matching remove; nothing should be stuck here by mistake. */
export function removeSecretNote(id: string) {
  setState({ notes: state.notes.filter((n) => n.id !== id) });
}

/**
 * Record that the passcode was accepted. Opening is a one-way door, so a
 * second unlock of the same box must not stamp a new time over the first.
 */
export function markOpened(id: string) {
  replace(id, (n) => (n.openedAt ? n : { ...n, openedAt: new Date().toISOString() }));
}
