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
    // Simulate sending delay
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
    <AnimatePresence>
      <Portal>
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
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
            className="relative w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[2.5rem] bg-surface-text-container mt-auto md:mt-0"
            style={{ boxShadow: "0 25px 60px -12px rgba(37, 53, 88, 0.35)" }}
          >
            {/* Ambient decorations */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-surface-accent/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-container/40 rounded-full blur-3xl pointer-events-none" />

            {/* Success overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-surface-text-container/95 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"
                  >
                    <span
                      className="material-symbols-outlined text-emerald-600"
                      style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-headline-sm font-headline-sm text-ink-primary"
                  >
                    Đã gửi thành công!
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-body-sm text-primary/70"
                  >
                    Bí mật của bạn đã được cập nhật và gửi đi
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 p-8 md:p-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-ink-primary/10 flex items-center justify-center shadow-md">
                    <span
                      className="material-symbols-outlined text-ink-primary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {note.icon ?? "edit_note"}
                    </span>
                  </div>
                  <div>
                    <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">
                      Chỉnh sửa bí mật
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

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-6 px-4 py-2.5 bg-amber-50 rounded-2xl border border-amber-200/60">
                <span className="material-symbols-outlined text-sm text-amber-600">info</span>
                <p className="text-label-sm font-label-sm text-amber-800">
                  Bạn có thể chỉnh sửa nội dung trước khi gửi cho người ấy. Hộp sẽ mở vào{" "}
                  <strong>{note.unlockDate}</strong>.
                </p>
              </div>

              {/* Form */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/80 border border-ink-primary/10 rounded-xl px-4 py-3.5 text-body-md text-ink-primary placeholder:text-primary/40 focus:ring-2 focus:ring-surface-accent focus:border-transparent transition-all outline-none"
                    placeholder="Nhập tiêu đề..."
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
                    Nội dung bí mật
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="w-full bg-white/80 border border-ink-primary/10 rounded-xl px-4 py-3.5 text-body-md text-ink-primary placeholder:text-primary/40 focus:ring-2 focus:ring-surface-accent focus:border-transparent transition-all outline-none resize-none leading-relaxed"
                    placeholder="Viết những điều bạn muốn gửi gắm..."
                  />
                  <p className="text-label-sm text-primary/50 mt-1.5 text-right">
                    {content.length} ký tự
                  </p>
                </div>

                {/* Unlock date & Category row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
                      Ngày mở khóa
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 text-xl pointer-events-none">
                        event
                      </span>
                      <input
                        type="text"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        className="w-full bg-white/80 border border-ink-primary/10 rounded-xl pl-12 pr-4 py-3.5 text-body-md text-ink-primary focus:ring-2 focus:ring-surface-accent focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
                      Danh mục
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white/80 border border-ink-primary/10 rounded-xl pl-4 pr-10 py-3.5 text-body-md text-ink-primary focus:ring-2 focus:ring-surface-accent focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none text-2xl">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags display */}
                {note.tags && note.tags.length > 0 && (
                  <div>
                    <label className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-2 block">
                      Nhãn
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-surface-accent/20 text-ink-primary text-label-sm font-label-sm rounded-full border border-surface-accent/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-ink-primary/8 my-6" />

              {/* Footer actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl font-label-md text-ink-primary border border-ink-primary/10 hover:bg-surface-container-high transition-colors text-center"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleSend}
                  disabled={isSending || !title.trim() || !content.trim()}
                  className="flex-1 py-4 rounded-2xl font-label-md text-ink-primary bg-surface-accent hover:opacity-90 active:scale-95 transition-all shadow-md shadow-surface-accent/20 text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-sm">send</span>
                      Gửi cho người ấy
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Portal>
    </AnimatePresence>
  );
};

export default LockedNoteEditPopup;
