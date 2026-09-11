"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onImageError } from "@/lib/image";
import { formatUnlockDate } from "@/lib/secretBox";
import type { SecretNote } from "@/data/mockData";

interface SecretBoxUnlockSuccessProps {
  /**
   * The box that was just opened.
   *
   * This screen used to hold one letter written directly into the JSX —
   * "Những điều anh chưa nói", a hard-coded hero image and two Đà Lạt tags —
   * so every box, whichever you opened, revealed the same words.
   */
  readonly note: SecretNote;
  readonly onBack: () => void;
}

export function SecretBoxUnlockSuccess({ note, onBack }: SecretBoxUnlockSuccessProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [sparks] = useState(() =>
    Array.from({ length: 12 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400 - 100,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-surface-accent">
      <div className="flex flex-1 justify-center px-4 py-5 md:px-20 lg:px-40">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <main className="mt-10 flex flex-1 flex-col gap-6 md:mt-0">
            <header className="sheet flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:flex-nowrap md:px-6">
              <div className="flex min-w-0 items-center gap-3 text-ink-primary">
                <button onClick={onBack} className="btn btn-icon" aria-label="Quay lại">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                <h2 className="font-headline-sm text-headline-sm text-ink-primary">
                  Hộp thư bí mật
                </h2>
              </div>
            </header>

            <div className="flex flex-col gap-1 px-1">
              <p className="font-headline -rotate-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                Hộp bí mật · Đã giải mã
              </p>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg -rotate-[0.6deg] text-ink-primary">
                Mở khóa thành công
              </h1>
              <p className="font-body-md text-body-md text-primary">
                Những điều chưa nói, nay đã được hé lộ
              </p>
            </div>

            <div className="sheet overflow-hidden">
              {note.coverImage ? (
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={note.coverImage}
                    alt={note.coverImageAlt ?? note.title}
                    loading="eager"
                    decoding="async"
                    onError={onImageError}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-primary/80 to-transparent p-6">
                    <div className="min-w-0 text-paper">
                      <h3 className="font-headline-md text-headline-md -rotate-[0.5deg]">
                        {note.title}
                      </h3>
                      <p className="font-body-sm text-body-sm mt-1 flex flex-wrap items-center gap-2 text-paper/85">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        Hẹn mở: {formatUnlockDate(note.unlockAt)}
                      </p>
                    </div>
                  </div>
                  <span className="chip chip-accent absolute right-4 top-4">
                    <span className="material-symbols-outlined">lock_open</span>
                    Đã giải mã
                  </span>
                </div>
              ) : (
                /* A box with no photo gets a plain ink panel rather than a
                   borrowed stock image that belongs to somebody else's note. */
                <div className="card-ink relative flex flex-col gap-2 p-6">
                  <span className="chip chip-accent absolute right-4 top-4">
                    <span className="material-symbols-outlined">lock_open</span>
                    Đã giải mã
                  </span>
                  <h3 className="font-headline-md text-headline-md -rotate-[0.5deg] pr-32 text-paper">
                    {note.title}
                  </h3>
                  <p className="font-body-sm text-body-sm flex items-center gap-2 text-primary-fixed">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    Hẹn mở: {formatUnlockDate(note.unlockAt)}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-6 p-6 md:p-8">
                <span className="chip chip-soft">
                  <span className="material-symbols-outlined">edit_note</span>
                  {note.category}
                </span>

                <div className="ruled">
                  <p className="whitespace-pre-wrap">{note.content}</p>
                </div>

                {note.tags && note.tags.length > 0 && (
                  <>
                    <hr className="rule" />
                    <div className="flex flex-wrap gap-3">
                      {note.tags.map((tag) => (
                        <span key={tag} className="chip chip-blue">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* One action, and it does what it says. The old footer offered
                  "Lưu vào Hành trình" and "Chia sẻ", neither wired to anything,
                  plus a "Khóa lại vào hộp" that actually created a new opened
                  note — the opposite of locking anything. */}
              <div className="flex justify-end border-t-[1.6px] border-dashed border-[var(--ink-20)] bg-surface-text-container p-6">
                <button onClick={onBack} className="btn btn-ink">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Về Hộp bí mật
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-primary"
            role="status"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{ scale: 1.15, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="mb-5 flex h-28 w-28 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.6px] border-surface-accent bg-ink-primary text-surface-accent"
            >
              <span
                className="material-symbols-outlined text-7xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
                suppressHydrationWarning
              >
                lock_open
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-headline text-2xl font-bold tracking-[0.2em] text-paper"
            >
              BÍ MẬT ĐÃ MỞ
            </motion.h2>

            {sparks.map((spark, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0.5],
                  x: spark.x,
                  y: spark.y,
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                className="absolute h-3 w-3 rounded-full bg-surface-accent"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SecretBoxUnlockSuccess;
