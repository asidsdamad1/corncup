"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export const SecretBoxDetailModal: React.FC<Readonly<SecretBoxDetailModalProps>> = ({ note, onClose }) => {
  return (
    <AnimatePresence>
      <Portal>
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink-primary/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] bg-surface-text-container"
            style={{ boxShadow: "0 25px 60px -12px rgba(37, 53, 88, 0.35)" }}
          >
            {/* Ambient decorations */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-surface-accent/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-container/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-8 md:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${note.isLocked ? "bg-ink-primary/10" : "bg-surface-accent/80"}`}>
                    <span
                      className="material-symbols-outlined text-ink-primary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {note.icon ?? (note.isLocked ? "lock" : "lock_open")}
                    </span>
                  </div>
                  <div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                      {note.isLocked ? "Hộp bí mật đang chờ" : "Hộp bí mật đã mở"}
                    </span>
                    <h2 className="text-headline-sm font-headline-sm text-ink-primary mt-0.5">
                      {note.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-surface-container transition-colors ml-4 flex-shrink-0"
                  aria-label="Đóng"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>

              {/* Locked badge */}
              {note.isLocked && (
                <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-ink-primary/5 rounded-2xl border border-ink-primary/10">
                  <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    Hộp này sẽ mở vào <strong className="text-ink-primary">{note.unlockDate}</strong> — Bạn vẫn có thể xem trước nội dung bên dưới.
                  </p>
                </div>
              )}

              {/* Cover image (if any) */}
              {note.coverImage && (
                <div className="w-full h-56 rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={note.coverImage}
                    alt={note.coverImageAlt ?? note.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/40 to-transparent" />
                </div>
              )}

              {/* Date + category row */}
              <div className="flex items-center gap-4 mb-6">
                {note.unlockDate && (
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">event</span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">
                      {note.isLocked ? "Mở khóa vào:" : "Đã mở:"} {note.unlockDate}
                    </span>
                  </div>
                )}
                {note.category && (
                  <span className="text-label-sm font-label-sm text-on-surface-variant opacity-60">·</span>
                )}
                {note.category && (
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">folder</span>
                    <span className="text-label-sm font-label-sm text-on-surface-variant">{note.category}</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-ink-primary/8 mb-6" />

              {/* Content */}
              <div className="bg-surface-container-lowest/60 rounded-2xl p-6 border border-ink-primary/5 mb-6">
                <p className="text-body-md font-body-md text-ink-primary/85 leading-relaxed whitespace-pre-wrap italic">
                  {note.previewText
                    ? `"${note.previewText}"`
                    : "Không có nội dung nào được lưu trong hộp bí mật này."}
                </p>
              </div>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-accent/30 text-ink-primary text-label-sm font-label-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl font-label-md text-ink-primary border border-ink-primary/10 hover:bg-surface-container-high transition-colors text-center"
                >
                  Đóng lại
                </button>
                <button
                  className="flex-1 py-4 rounded-2xl font-label-md text-ink-primary bg-surface-accent hover:opacity-90 active:scale-95 transition-all shadow-md shadow-surface-accent/20 text-center flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">favorite</span>
                  Lưu vào kỷ niệm
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Portal>
    </AnimatePresence>
  );
};
