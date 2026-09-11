"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";
import {
  PASSCODE_LENGTH,
  fromDateInput,
  isValidPasscode,
  todayInput,
} from "@/lib/secretBox";
import type { SecretNote } from "@/data/mockData";

interface CreateSecretBoxPopupProps {
  readonly onClose: () => void;
  readonly onSuccess: (note: SecretNote) => void;
}

/** Offered categories. "Đã mở" is not among them — that is a state, not a kind. */
const CATEGORIES = ["Tình cảm", "Du lịch", "Tương lai", "Kỷ niệm", "Lời hứa"] as const;

export function CreateSecretBoxPopup({ onClose, onSuccess }: CreateSecretBoxPopupProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");
  const [passcode, setPasscode] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  const [today] = useState(() => todayInput(Date.now()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Each rule says which field is wrong. The old check was one blanket
       "điền đầy đủ thông tin", which passed a 1-digit passcode under a label
       that promised four, and accepted an unlock date in the past. */
    if (!title.trim()) return setError("Hãy đặt một tiêu đề cho hộp.");
    if (!content.trim()) return setError("Hộp chưa có lời nhắn nào bên trong.");
    if (!isValidPasscode(passcode)) return setError(`Mật mã phải đúng ${PASSCODE_LENGTH} chữ số.`);
    if (!unlockDate) return setError("Hãy chọn ngày mở khóa.");
    if (unlockDate < today) return setError("Ngày mở khóa phải từ hôm nay trở đi.");
    setError(null);
    setIsSuccessModalOpen(true);
  };

  const handleFinish = () => {
    setIsSuccessModalOpen(false);
    onSuccess({
      id: `sn-new-${Date.now()}`,
      title: title.trim(),
      preview: preview.trim() || "Một điều thầm kín đang chờ ngày mở.",
      content: content.trim(),
      unlockAt: fromDateInput(unlockDate),
      createdAt: new Date().toISOString(),
      passcode,
      category,
      icon: "lock_clock",
    });
  };

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-secret-title"
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-default"
          onClick={onClose}
          aria-label="Đóng"
          tabIndex={-1}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal custom-scrollbar max-w-2xl"
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 flex-none -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                <span className="material-symbols-outlined text-ink-primary">lock_open</span>
              </span>
              <div className="min-w-0">
                <h3
                  id="create-secret-title"
                  className="font-headline-sm text-headline-sm text-ink-primary"
                >
                  Gửi gắm điều thầm kín
                </h3>
                <p className="font-body-sm text-body-sm text-primary">
                  Hộp bí mật sẽ chỉ mở ra vào khoảnh khắc bạn chọn.
                </p>
              </div>
            </div>
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form className="modal-body space-y-6 md:px-8" onSubmit={handleSubmit}>
            <div>
              <label className="field-label" htmlFor="title">
                Tiêu đề cảm xúc
              </label>
              <input
                className="field"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề (ví dụ: Lần đầu tiên ta gặp nhau)"
                type="text"
              />
            </div>

            <div>
              <label className="field-label" htmlFor="message">
                Lời nhắn bí mật
              </label>
              <textarea
                className="field resize-none"
                id="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết những lời bạn muốn nhắn gửi..."
                rows={5}
              />
            </div>

            {/* The teaser exists so the waiting-list card has something to show.
                Without it the card would have to print the secret, which is
                exactly what the old screen did. */}
            <div>
              <label className="field-label" htmlFor="preview">
                Lời gợi ý <span className="text-primary">(hiện ra khi hộp còn khóa)</span>
              </label>
              <input
                className="field"
                id="preview"
                value={preview}
                onChange={(e) => setPreview(e.target.value)}
                placeholder="Một câu bâng quơ, đủ để tò mò mà chưa lộ gì"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="passcode">
                  Thiết lập mật mã ({PASSCODE_LENGTH} số)
                </label>
                <div className="relative">
                  <input
                    className="field font-headline text-center tracking-[0.6em]"
                    id="passcode"
                    maxLength={PASSCODE_LENGTH}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••"
                    type="password"
                    inputMode="numeric"
                  />
                  <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/50">
                    key
                  </span>
                </div>
              </div>

              <div>
                <label className="field-label" htmlFor="unlock-date">
                  Thời gian mở khóa
                </label>
                <input
                  className="field appearance-none"
                  id="unlock-date"
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  type="date"
                  min={today}
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="create-category">
                Danh mục
              </label>
              <select
                id="create-category"
                className="field cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="toast toast-error" role="alert">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <p className="font-label-sm text-label-sm text-ink-primary">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-2 md:flex-row">
              <button className="btn flex-1 py-4" type="button" onClick={onClose}>
                Hủy bỏ
              </button>
              <button className="btn btn-accent flex-1 py-4" type="submit">
                <span className="material-symbols-outlined">lock</span>
                Tạo hộp bí mật
              </button>
            </div>
          </form>
        </motion.div>

        {/* ---------- Success notification ---------- */}
        <AnimatePresence>
          {isSuccessModalOpen && (
            <div
              className="overlay z-[210] items-center justify-center px-4"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="locked-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", damping: 24, stiffness: 300 }}
                className="card card-flat w-full max-w-sm p-8 text-center"
              >
                <span className="mx-auto mb-6 flex h-20 w-20 -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.4px] border-ink-primary bg-surface-accent">
                  <span className="material-symbols-outlined text-4xl text-ink-primary">
                    lock_clock
                  </span>
                </span>
                <h4
                  id="locked-title"
                  className="font-headline-sm text-headline-sm mb-2 text-ink-primary"
                >
                  &ldquo;{title}&rdquo; đã được khóa!
                </h4>
                <p className="font-body-md text-body-md mb-8 text-primary">
                  Điều thầm kín của bạn đã được lưu giữ cho đến ngày hẹn.
                </p>
                <button className="btn btn-ink w-full py-4" onClick={handleFinish} autoFocus>
                  Tuyệt vời
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  );
}

export default CreateSecretBoxPopup;
