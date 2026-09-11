"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import { Portal } from "@/components/ui/Portal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { SecretBoxPasswordPopup } from "./SecretBoxPasswordPopup";
import { SecretBoxUnlockSuccess } from "./SecretBoxUnlockSuccess";
import { CreateSecretBoxPopup } from "./CreateSecretBoxPopup";
import { SecretBoxDetailModal } from "./SecretBoxDetailModal";
import { LockedNoteEditPopup } from "./LockedNoteEditPopup";
import { onImageError } from "@/lib/image";
import { formatUnlockDate, statusOf, timeUntil } from "@/lib/secretBox";
import {
  addSecretNote,
  markOpened,
  removeSecretNote,
  updateSecretNote,
  useSecretNotes,
} from "@/lib/secretStore";
import type { SecretNote } from "@/data/mockData";

type SortKey = "newest" | "oldest" | "az";

const SORTS: ReadonlyArray<{ key: SortKey; label: string }> = [
  { key: "newest", label: "Mới nhất" },
  { key: "oldest", label: "Cũ nhất" },
  { key: "az", label: "A - Z" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function SecretBoxManagement() {
  const notes = useSecretNotes();

  /* One clock for the screen. `Date.now()` seeds it so the server renders the
     same locked/open split the client will; only the seconds can disagree,
     and those digits say so. The old version seeded three numbers from the
     data and decremented them, which drifted whenever the tab was backgrounded. */
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [unlockTarget, setUnlockTarget] = useState<SecretNote | null>(null);
  const [justOpenedId, setJustOpenedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<SecretNote | null>(null);
  const [reading, setReading] = useState<SecretNote | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SecretNote | null>(null);

  const featured = notes.find((n) => n.featured);

  const { waiting, opened, matched } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const hit = (n: SecretNote) =>
      q === "" || n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q);

    const by = (a: SecretNote, b: SecretNote) => {
      if (sort === "az") return a.title.localeCompare(b.title, "vi");
      const d = Date.parse(a.unlockAt) - Date.parse(b.unlockAt);
      return sort === "oldest" ? d : -d;
    };

    /* Search covers both lists. It used to apply only to the opened ones, so
       typing a word narrowed half the screen and left the other half alone. */
    const all = notes.filter(hit);
    return {
      waiting: all.filter((n) => !n.openedAt && !n.featured).sort(by),
      opened: all.filter((n) => n.openedAt).sort(by),
      matched: all.length,
    };
  }, [notes, search, sort]);

  const searching = search.trim() !== "";
  const justOpened = justOpenedId ? notes.find((n) => n.id === justOpenedId) : undefined;

  /**
   * The passcode is the way in, whatever the box is for. A box past its date
   * opens and is read; a box still waiting can be edited. Either way the code
   * is asked for first — the waiting list used to jump straight into the
   * editor on a single click.
   */
  const handleUnlocked = (note: SecretNote) => {
    setUnlockTarget(null);
    if (statusOf(note, Date.now()) === "locked") {
      setEditing(note);
      return;
    }
    markOpened(note.id);
    setJustOpenedId(note.id);
  };

  const openBox = (note: SecretNote) => {
    if (note.openedAt) setReading(note);
    else setUnlockTarget(note);
  };

  const header = (
    <header className="mb-stack-lg">
      <p className="font-headline -rotate-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
        Duyên · Secret Locked Notes
      </p>
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg -rotate-[0.6deg] text-ink-primary">
        Hộp bí mật
      </h2>
      <p className="font-body-md text-body-md mt-2 max-w-[52ch] text-primary">
        Gửi gắm những điều chưa nói cho tương lai của chúng ta.
      </p>
    </header>
  );

  return (
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
      <main className="min-h-screen flex-1 px-margin-mobile py-10 pb-32 md:px-margin-desktop lg:ml-64 lg:pb-10">
        {header}

        {notes.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-20 text-center">
            <div className="card-dashed mb-8 flex h-48 w-48 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-6xl text-primary/50">
                auto_stories
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 -rotate-[0.5deg] text-ink-primary">
              Chưa có điều bí mật nào
            </h3>
            <p className="font-body-lg text-body-lg mx-auto mb-10 max-w-md text-primary">
              Hãy bắt đầu viết xuống những tâm tư, lời nhắn nhủ hay những kỷ niệm sắp tới để gửi
              cho nhau trong tương lai.
            </p>
            <button onClick={() => setIsCreateOpen(true)} className="btn btn-accent px-10 py-4">
              <span className="material-symbols-outlined">add_circle</span>
              Tạo hộp thư đầu tiên
            </button>
          </section>
        ) : (
          <>
            {featured && <FeaturedBox note={featured} now={now} onOpen={() => openBox(featured)} />}

            <div className="mb-stack-lg flex justify-center md:justify-start">
              <button onClick={() => setIsCreateOpen(true)} className="btn btn-accent px-8 py-4">
                <span className="material-symbols-outlined">add_circle</span>
                Gửi thêm bí mật
              </button>
            </div>

            {/* ── Search & sort ── */}
            <section className="sheet mb-stack-md flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="field pl-12"
                  placeholder="Tìm theo tiêu đề hoặc lời gợi ý..."
                  aria-label="Tìm hộp bí mật"
                />
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <label className="font-label-md text-label-md text-primary" htmlFor="secret-sort">
                  Sắp xếp:
                </label>
                {/* Wired up. It had three options, no value and no handler, so
                    picking one changed nothing at all. */}
                <select
                  id="secret-sort"
                  className="field w-auto cursor-pointer"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            {searching && matched === 0 && (
              <div className="card card-dashed flex flex-col items-center gap-2 p-10 text-center">
                <span className="material-symbols-outlined text-4xl text-primary/50">
                  search_off
                </span>
                <p className="font-label-md text-label-md text-ink-primary">
                  Không có hộp nào khớp với &ldquo;{search.trim()}&rdquo;
                </p>
                <button type="button" onClick={() => setSearch("")} className="btn btn-sm mt-2">
                  Xoá tìm kiếm
                </button>
              </div>
            )}

            {waiting.length > 0 && (
              <section className="mb-stack-lg">
                <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 text-ink-primary">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Đang chờ mở khóa
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
                  {waiting.map((note, i) => (
                    <WaitingCard
                      key={note.id}
                      note={note}
                      now={now}
                      tilted={i % 2 === 1}
                      onOpen={() => openBox(note)}
                      onDelete={() => setPendingDelete(note)}
                    />
                  ))}
                </div>
              </section>
            )}

            {opened.length > 0 && (
              <section className="mb-stack-lg">
                <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-ink-primary">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  Kỷ niệm đã mở
                </h3>
                <div className="masonry-grid">
                  {opened.map((note, i) => (
                    <OpenedCard
                      key={note.id}
                      note={note}
                      tilted={i % 2 === 1}
                      onRead={() => setReading(note)}
                      onDelete={() => setPendingDelete(note)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <NavBar activeHref="/secrets" />

      {/* ---------- Overlays ---------- */}
      <AnimatePresence>
        {isCreateOpen && (
          <CreateSecretBoxPopup
            onClose={() => setIsCreateOpen(false)}
            onSuccess={(note) => {
              addSecretNote(note);
              setIsCreateOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unlockTarget && (
          <SecretBoxPasswordPopup
            noteTitle={unlockTarget.title}
            passcode={unlockTarget.passcode}
            onClose={() => setUnlockTarget(null)}
            onSuccess={() => handleUnlocked(unlockTarget)}
          />
        )}
      </AnimatePresence>

      {justOpened && (
        <Portal>
          <div className="fixed inset-0 z-[200] overflow-y-auto bg-background-main">
            <SecretBoxUnlockSuccess note={justOpened} onBack={() => setJustOpenedId(null)} />
          </div>
        </Portal>
      )}

      <AnimatePresence>
        {reading && <SecretBoxDetailModal note={reading} onClose={() => setReading(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {editing && (
          <LockedNoteEditPopup
            note={editing}
            onClose={() => setEditing(null)}
            onSave={(patch) => {
              updateSecretNote(editing.id, patch);
              setEditing(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pendingDelete && (
          <ConfirmDialog
            title="Xoá hộp bí mật này?"
            subject={pendingDelete.title}
            body={
              pendingDelete.openedAt
                ? "Lá thư đã mở này sẽ bị gỡ khỏi hộp bí mật."
                : "Hộp này chưa từng được mở. Nội dung bên trong sẽ mất mà không ai đọc được."
            }
            confirmLabel="Xoá hộp"
            onConfirm={() => {
              removeSecretNote(pendingDelete.id);
              setPendingDelete(null);
            }}
            onClose={() => setPendingDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- pieces ---------------- */

function FeaturedBox({
  note,
  now,
  onOpen,
}: {
  note: SecretNote;
  now: number;
  onOpen: () => void;
}) {
  const status = statusOf(note, now);
  const left = timeUntil(note, now);
  const due = status !== "locked";

  return (
    <section className="card card-ink card-flat mb-stack-lg p-8">
      <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-12">
        <div className="flex w-full flex-col items-center md:w-2/5">
          <button onClick={onOpen} className="group relative" aria-label={`Mở khóa: ${note.title}`}>
            <span
              className={`flex h-48 w-48 items-center justify-center rounded-full border-[2.6px] transition-all duration-500 hover:scale-105 md:h-64 md:w-64 ${
                due ? "border-mint bg-mint/15" : "border-surface-accent bg-paper/10"
              }`}
            >
              <span
                className={`material-symbols-outlined ${due ? "text-mint" : "text-surface-accent"}`}
                style={{ fontSize: "100px", fontVariationSettings: "'FILL' 1" }}
                suppressHydrationWarning
              >
                {due ? "lock_open" : "lock"}
              </span>
            </span>
          </button>

          <div className="mt-8 text-center">
            {/* Three states, not two. "Đã đến hạn" is not the same as "đã mở",
                and the old screen showed "Đã mở khóa ✨" over a box that still
                demanded a passcode. */}
            <span
              className={
                status === "opened"
                  ? "chip border-mint bg-mint/20 text-paper"
                  : status === "ready"
                    ? "chip chip-accent"
                    : "chip chip-accent"
              }
            >
              {status === "opened" ? "Đã mở" : status === "ready" ? "Đã đến hạn" : "Đang khóa"}
            </span>
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 -rotate-[0.6deg] text-paper">
            {note.title}
          </h3>
          <p className="font-body-lg text-body-lg mb-8 max-w-lg text-primary-fixed">
            {note.preview}
          </p>

          {left ? (
            <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-3 md:justify-start">
              {[
                { label: "Ngày", value: pad(left.days) },
                { label: "Giờ", value: pad(left.hours) },
                { label: "Phút", value: pad(left.minutes) },
                { label: "Giây", value: pad(left.seconds) },
              ].map(({ label, value }, idx) => (
                <div key={label} className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <div
                    className={`min-w-[52px] rounded-[var(--radius-wobble-sm)] border-[2.2px] border-paper/40 bg-paper/10 px-3 py-2 text-center sm:min-w-[72px] sm:px-5 sm:py-3 ${
                      idx % 2 ? "rotate-[1deg]" : "-rotate-[1.2deg]"
                    }`}
                  >
                    <span
                      className="font-headline block text-lg font-bold leading-tight tabular-nums text-paper sm:text-2xl"
                      /* Seeded on the server, corrected a tick after hydration:
                         the seconds are the one thing that cannot match. */
                      suppressHydrationWarning
                    >
                      {value}
                    </span>
                    <span className="font-headline text-[0.54rem] font-semibold uppercase tracking-[0.2em] text-primary-fixed">
                      {label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="font-headline text-lg font-bold text-paper/40 sm:text-xl">
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body-md text-body-md mb-2 text-primary-fixed">
              {status === "opened"
                ? `Đã mở ngày ${formatUnlockDate(note.openedAt ?? note.unlockAt)}.`
                : "Đã tới ngày hẹn. Nhập mật mã để mở."}
            </p>
          )}

          <p className="font-label-sm text-label-sm mt-4 text-primary-fixed">
            Hẹn mở: {formatUnlockDate(note.unlockAt)}
          </p>
        </div>
      </div>
    </section>
  );
}

function WaitingCard({
  note,
  now,
  tilted,
  onOpen,
  onDelete,
}: {
  note: SecretNote;
  now: number;
  tilted: boolean;
  onOpen: () => void;
  onDelete: () => void;
}) {
  const due = statusOf(note, now) === "ready";

  return (
    <div className="relative min-w-[280px] flex-none md:min-w-0">
      <button
        onClick={onOpen}
        className={`card flex h-full w-full flex-col gap-3 p-5 text-left transition-transform duration-300 hover:-translate-y-1 ${
          tilted ? "card-tilt-r" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-background-main">
            <span className="material-symbols-outlined text-xl text-ink-primary">
              {note.icon ?? "lock"}
            </span>
          </span>
          <span className={`chip ${due ? "chip-accent" : "chip-soft"} mr-11`}>
            {due ? "Đã đến hạn" : formatUnlockDate(note.unlockAt)}
          </span>
        </div>
        <div className="min-w-0">
          <h4 className="font-headline-sm text-headline-sm text-ink-primary">{note.title}</h4>
          {/* The teaser, never `content`. This line is why the two fields are
              separate: the old card printed the secret on the outside of the box. */}
          <p className="font-body-sm text-body-sm line-clamp-2 text-primary">{note.preview}</p>
        </div>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.2px] border-ink-primary bg-paper shadow-[0_2px_0_var(--color-ink-primary)] transition-transform hover:-translate-y-0.5"
        aria-label={`Xoá hộp bí mật: ${note.title}`}
        title="Xoá hộp bí mật"
      >
        <span className="material-symbols-outlined text-[17px] text-ink-primary">delete</span>
      </button>
    </div>
  );
}

function OpenedCard({
  note,
  tilted,
  onRead,
  onDelete,
}: {
  note: SecretNote;
  tilted: boolean;
  onRead: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="masonry-item relative">
      <button
        onClick={onRead}
        className={`card block w-full overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 ${
          tilted ? "card-tilt-r" : ""
        }`}
      >
        {note.coverImage ? (
          <div className="relative w-full">
            {/* Height came from `note.id === "sn-6" ? "h-64" : "h-48"`, so the
                layout was pinned to one row of the sample data. */}
            <img
              src={note.coverImage}
              alt={note.coverImageAlt ?? note.title}
              loading="lazy"
              decoding="async"
              onError={onImageError}
              className="h-48 w-full object-cover"
            />
            <span className="chip absolute left-4 top-4">
              {formatUnlockDate(note.openedAt ?? note.unlockAt)}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 px-6 pt-6">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
              <span className="material-symbols-outlined text-base text-ink-primary">
                {note.icon ?? "history_edu"}
              </span>
            </span>
            <span className="chip chip-soft mr-11">
              {formatUnlockDate(note.openedAt ?? note.unlockAt)}
            </span>
          </div>
        )}

        <div className="p-6">
          <h4 className="font-headline-sm text-headline-sm mb-2 text-ink-primary">{note.title}</h4>
          <div className="ruled">
            <p className="line-clamp-3 text-ink-primary">{note.content}</p>
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="chip chip-blue">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <hr className="rule my-4" />
          <span className="font-label-sm text-label-sm flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-base">visibility</span>
            Xem chi tiết
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.2px] border-ink-primary bg-paper shadow-[0_2px_0_var(--color-ink-primary)] transition-transform hover:-translate-y-0.5"
        aria-label={`Xoá hộp bí mật: ${note.title}`}
        title="Xoá hộp bí mật"
      >
        <span className="material-symbols-outlined text-[17px] text-ink-primary">delete</span>
      </button>
    </div>
  );
}

export default SecretBoxManagement;
