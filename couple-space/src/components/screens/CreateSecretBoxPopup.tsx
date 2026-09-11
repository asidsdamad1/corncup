"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface CreateSecretBoxPopupProps {
  readonly onClose: () => void;
  readonly onSuccess: (data: {
    title: string;
    content: string;
    unlockDate: string;
    passcode: string;
  }) => void;
}

export const CreateSecretBoxPopup: React.FC<Readonly<CreateSecretBoxPopupProps>> = ({
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [passcode, setPasscode] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !passcode || !unlockDate) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setError(null);
    setIsSuccessModalOpen(true);
  };

  const handleFinish = () => {
    setIsSuccessModalOpen(false);
    onSuccess({ title, content, unlockDate, passcode });
  };

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-secret-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 24 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="modal custom-scrollbar max-w-2xl"
        >
          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="passcode">
                  Thiết lập mật mã (4 số)
                </label>
                <div className="relative">
                  <input
                    className="field font-headline text-center tracking-[0.6em]"
                    id="passcode"
                    maxLength={4}
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
                />
              </div>
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
                <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.4px] border-ink-primary bg-surface-accent -rotate-3">
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
                  Điều thầm kín của bạn đã được lưu giữ an toàn cho đến ngày hẹn.
                </p>
                <button className="btn btn-ink w-full py-4" onClick={handleFinish}>
                  Tuyệt vời
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  );
};

export default CreateSecretBoxPopup;
