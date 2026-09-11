"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";
import { formatUnlockDate, fromDateInput, toDateInput, todayInput } from "@/lib/secretBox";
import type { SecretNote } from "@/data/mockData";

interface LockedNoteEditPopupProps {
  readonly note: SecretNote;
  readonly onClose: () => void;
  readonly onSave: (
    patch: Pick<SecretNote, "title" | "preview" | "content" | "unlockAt" | "category">
  ) => void;
}

const CATEGORIES = ["Tình cảm", "Du lịch", "Tương lai", "Kỷ niệm", "Lời hứa"];

/**
 * Edit a box that has not opened yet. Reached only after the passcode, the
 * same as opening one — otherwise the lock would mean nothing, which is
 * precisely what it used to mean: the waiting list opened this dialog on a
 * single click and handed over the whole text.
 */
export function LockedNoteEditPopup({ note, onClose, onSave }: LockedNoteEditPopupProps) {
  const [title, setTitle] = useState(note.title);
  const [preview, setPreview] = useState(note.preview);
  const [content, setContent] = useState(note.content);
  const [unlockDate, setUnlockDate] = useState(toDateInput(note.unlockAt));
  const [category, setCategory] = useState(
    CATEGORIES.includes(note.category) ? note.category : CATEGORIES[0]
  );
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  const [today] = useState(() => todayInput(Date.now()));
  const canSave = title.trim() !== "" && content.trim() !== "" && unlockDate >= today;

  /* Saves straight away. The previous version faked 800ms of "sending" and
     then another 1200ms of celebration with bare setTimeouts — closing the
     dialog in between did not cancel them, so a cancelled edit still landed
     two seconds later. */
  const handleSave = () => {
    if (!canSave) return;
    onSave({
      title: title.trim(),
      preview: preview.trim(),
      content: content.trim(),
      unlockAt: fromDateInput(unlockDate),
      category,
    });
  };

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
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 flex-none -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-background-main">
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
            <div className="toast toast-warn mb-6">
              <span className="material-symbols-outlined text-[18px]">info</span>
              <p className="font-label-sm text-label-sm text-ink-primary">
                Hộp này vẫn chưa tới ngày mở. Bạn có thể sửa nội dung, hoặc dời ngày mở.
                Hiện đang hẹn <strong>{formatUnlockDate(note.unlockAt)}</strong>.
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
                <label className="field-label" htmlFor="note-preview">
                  Lời gợi ý <span className="text-primary">(hiện ra khi hộp còn khóa)</span>
                </label>
                <input
                  id="note-preview"
                  type="text"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  className="field"
                  placeholder="Một câu bâng quơ, đủ để tò mò mà chưa lộ gì"
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
                  {/* A real date picker. It was a free-text box, so "Hôm nay"
                      or anything else could be typed in and nothing checked it. */}
                  <input
                    id="note-date"
                    type="date"
                    value={unlockDate}
                    min={today}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    className="field appearance-none"
                  />
                </div>

                <div>
                  <label className="field-label" htmlFor="note-category">
                    Danh mục
                  </label>
                  <select
                    id="note-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="field cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
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
            <button onClick={handleSave} disabled={!canSave} className="btn btn-accent flex-1 py-4">
              <span className="material-symbols-outlined text-base">save</span>
              Lưu lại
            </button>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default LockedNoteEditPopup;
