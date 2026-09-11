"use client";

import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";
import { onImageError } from "@/lib/image";
import { formatUnlockDate } from "@/lib/secretBox";
import type { SecretNote } from "@/data/mockData";

interface SecretBoxDetailModalProps {
  readonly note: SecretNote;
  readonly onClose: () => void;
}

/**
 * Reads a box that is already open.
 *
 * It no longer takes a locked note at all. The previous version accepted one,
 * announced "Bạn vẫn có thể xem trước nội dung bên dưới" and then printed the
 * secret — the lock was decoration on top of a page that had already given
 * everything away. A box that is still shut now goes through the passcode.
 *
 * The type comes from `data/mockData`; this file used to declare its own
 * near-copy in which `previewText` was optional while the real one was not.
 */
export function SecretBoxDetailModal({ note, onClose }: SecretBoxDetailModalProps) {
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center p-0 md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-title"
      >
        <motion.button
          className="absolute inset-0 cursor-default"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-label="Đóng"
          tabIndex={-1}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="modal custom-scrollbar mt-auto max-w-2xl md:mt-0"
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="modal-head">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 flex-none -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                <span
                  className="material-symbols-outlined text-2xl text-ink-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  suppressHydrationWarning
                >
                  {note.icon ?? "lock_open"}
                </span>
              </span>
              <div className="min-w-0">
                <span className="font-headline block text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  Hộp bí mật đã mở
                </span>
                <h2
                  id="note-title"
                  className="font-headline-sm text-headline-sm mt-0.5 truncate text-ink-primary"
                >
                  {note.title}
                </h2>
              </div>
            </div>
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="modal-body md:px-8">
            {note.coverImage && (
              <div className="mat mb-6 -rotate-[0.8deg]">
                <div className="mat-inner relative h-56 overflow-hidden">
                  <img
                    src={note.coverImage}
                    alt={note.coverImageAlt ?? note.title}
                    loading="lazy"
                    decoding="async"
                    onError={onImageError}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/40 to-transparent" />
                </div>
              </div>
            )}

            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="chip chip-soft">
                <span className="material-symbols-outlined">event</span>
                Đã mở: {formatUnlockDate(note.openedAt ?? note.unlockAt)}
              </span>
              <span className="chip chip-soft">
                <span className="material-symbols-outlined">folder</span>
                {note.category}
              </span>
            </div>

            <hr className="rule mb-5" />

            <div className="ruled mb-6">
              <p className="whitespace-pre-wrap italic text-ink-primary">
                &ldquo;{note.content}&rdquo;
              </p>
            </div>

            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="chip chip-blue">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* "Lưu vào kỷ niệm" used to sit here with no handler. A button that
              does nothing is worse than no button, so it is gone until there
              is something for it to do. */}
          <div className="modal-foot md:px-8">
            <button onClick={onClose} className="btn flex-1 py-4">
              Đóng lại
            </button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default SecretBoxDetailModal;
