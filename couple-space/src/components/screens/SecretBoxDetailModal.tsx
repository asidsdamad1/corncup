"use client";

import React from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface SecretNote {
  readonly id: string;
  readonly title: string;
  readonly previewText?: string;
  readonly unlockDate?: string;
  readonly icon?: string;
  readonly coverImage?: string;
  readonly coverImageAlt?: string;
  readonly tags?: readonly string[];
  readonly isLocked?: boolean;
  readonly category?: string;
}

interface SecretBoxDetailModalProps {
  readonly note: SecretNote;
  readonly onClose: () => void;
}

export const SecretBoxDetailModal: React.FC<Readonly<SecretBoxDetailModalProps>> = ({
  note,
  onClose,
}) => {
  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center p-0 md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-title"
      >
        {/* click-away backdrop */}
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
          className="modal mt-auto max-w-2xl md:mt-0"
        >
          <div className="modal-head">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={`flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary -rotate-3 ${
                  note.isLocked ? "bg-background-main" : "bg-surface-accent"
                }`}
              >
                <span
                  className="material-symbols-outlined text-2xl text-ink-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  suppressHydrationWarning
                >
                  {note.icon ?? (note.isLocked ? "lock" : "lock_open")}
                </span>
              </span>
              <div className="min-w-0">
                <span className="font-headline block text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  {note.isLocked ? "Hộp bí mật đang chờ" : "Hộp bí mật đã mở"}
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
            {/* Locked notice */}
            {note.isLocked && (
              <div className="toast toast-warn mb-5">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <p className="font-label-sm text-label-sm text-ink-primary">
                  Hộp này sẽ mở vào <strong>{note.unlockDate}</strong> — Bạn vẫn có thể xem trước
                  nội dung bên dưới.
                </p>
              </div>
            )}

            {/* Cover, mounted like a print */}
            {note.coverImage && (
              <div className="mat mb-6 -rotate-[0.8deg]">
                <div className="mat-inner relative h-56 overflow-hidden">
                  <img
                    src={note.coverImage}
                    alt={note.coverImageAlt ?? note.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/40 to-transparent" />
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {note.unlockDate && (
                <span className="chip chip-soft">
                  <span className="material-symbols-outlined">event</span>
                  {note.isLocked ? "Mở khóa vào" : "Đã mở"}: {note.unlockDate}
                </span>
              )}
              {note.category && (
                <span className="chip chip-soft">
                  <span className="material-symbols-outlined">folder</span>
                  {note.category}
                </span>
              )}
            </div>

            <hr className="rule mb-5" />

            {/* The note itself, on ruled paper */}
            <div className="ruled mb-6">
              <p className="whitespace-pre-wrap italic text-ink-primary">
                {note.previewText
                  ? `"${note.previewText}"`
                  : "Không có nội dung nào được lưu trong hộp bí mật này."}
              </p>
            </div>

            {/* Tags */}
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

          <div className="modal-foot md:px-8">
            <button onClick={onClose} className="btn flex-1 py-4">
              Đóng lại
            </button>
            <button className="btn btn-accent flex-1 py-4">
              <span className="material-symbols-outlined">favorite</span>
              Lưu vào kỷ niệm
            </button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
};

export default SecretBoxDetailModal;
