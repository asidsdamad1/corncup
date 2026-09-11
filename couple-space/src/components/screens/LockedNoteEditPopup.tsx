"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface LockedNote {
  readonly id: string;
  readonly title: string;
  readonly previewText: string;
  readonly unlockDate: string;
  readonly icon?: string;
  readonly category?: string;
  readonly tags?: readonly string[];
}

interface LockedNoteEditPopupProps {
  readonly note: LockedNote;
  readonly onClose: () => void;
  readonly onSend: (updatedNote: {
    title: string;
    content: string;
    unlockDate: string;
    category: string;
  }) => void;
}

export const LockedNoteEditPopup: React.FC<Readonly<LockedNoteEditPopupProps>> = ({
  note,
  onClose,
  onSend,
}) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.previewText);
  const [unlockDate, setUnlockDate] = useState(note.unlockDate);
  const [category, setCategory] = useState(note.category ?? "Tình cảm");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => {
        onSend({ title, content, unlockDate, category });
      }, 1200);
    }, 800);
  };

  const categories = ["Tình cảm", "Du lịch", "Tương lai", "Kỷ niệm", "Lời hứa"];

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center p-0 md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-note-title"
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
        >
          {/* ---------- Success overlay ---------- */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-paper/97"
                role="status"
                aria-live="polite"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.4px] border-ink-primary bg-mint/25 -rotate-3"
                >
                  <span
                    className="material-symbols-outlined text-ink-primary"
                    style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
                    suppressHydrationWarning
                  >
                    check_circle
                  </span>
                </motion.span>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-headline-sm text-headline-sm text-ink-primary -rotate-[0.5deg]"
                >
                  Đã gửi thành công!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-body-sm text-body-sm text-primary"
                >
                  Bí mật của bạn đã được cập nhật và gửi đi
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-background-main -rotate-3">
                <span
                  className="material-symbols-outlined text-2xl text-ink-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  suppressHydrationWarning
                >
                  {note.icon ?? "edit_note"}
                </span>
              </span>
              <div className="min-w-0">
                <span className="font-headline block text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  Chỉnh sửa bí mật
                </span>
                <h2
                  id="edit-note-title"
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
            {/* Status notice */}
            <div className="toast toast-warn mb-6">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <p className="font-label-sm text-label-sm text-ink-primary">
                Bạn có thể chỉnh sửa nội dung trước khi gửi cho người ấy. Hộp sẽ mở vào{" "}
                <strong>{note.unlockDate}</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="field-label" htmlFor="note-title-input">
                  Tiêu đề
                </label>
                <input
                  id="note-title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="field"
                  placeholder="Nhập tiêu đề..."
                />
              </div>

              <div>
                <label className="field-label" htmlFor="note-content">
                  Nội dung bí mật
                </label>
                <textarea
                  id="note-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="field resize-none leading-relaxed"
                  placeholder="Viết những điều bạn muốn gửi gắm..."
                />
                <p className="font-label-sm text-label-sm mt-1.5 text-right text-primary">
                  {content.length} ký tự
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="note-date">
                    Ngày mở khóa
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-primary/50">
                      event
                    </span>
                    <input
                      id="note-date"
                      type="text"
                      value={unlockDate}
                      onChange={(e) => setUnlockDate(e.target.value)}
                      className="field pl-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label" htmlFor="note-category">
                    Danh mục
                  </label>
                  <div className="relative">
                    <select
                      id="note-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="field cursor-pointer appearance-none pr-10"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-2xl text-primary/50">
                      arrow_drop_down
                    </span>
                  </div>
                </div>
              </div>

              {note.tags && note.tags.length > 0 && (
                <div>
                  <span className="field-label">Nhãn</span>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="chip chip-blue">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <hr className="rule my-6" />
          </div>

          <div className="modal-foot md:px-8">
            <button onClick={onClose} className="btn flex-1 py-4">
              Hủy bỏ
            </button>
            <button
              onClick={handleSend}
              disabled={isSending || !title.trim() || !content.trim()}
              className="btn btn-accent flex-1 py-4"
            >
              {isSending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">
                    progress_activity
                  </span>
                  Đang gửi...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send</span>
                  Gửi cho người ấy
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
};

export default LockedNoteEditPopup;
