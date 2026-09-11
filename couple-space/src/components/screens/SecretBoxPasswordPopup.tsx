"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface SecretBoxPasswordPopupProps {
  readonly noteTitle?: string;
  readonly onSuccess?: () => void;
  readonly onClose?: () => void;
}

/**
 * ⚠️ The passcode is compared on the client purely so the mockup is
 * interactive. The real gate belongs in a Server Action — note content
 * must never reach the browser before the server has authorised it.
 */
const CORRECT = "1234";

export const SecretBoxPasswordPopup: React.FC<SecretBoxPasswordPopupProps> = ({
  noteTitle = "Love you",
  onSuccess,
  onClose,
}) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (passcode === CORRECT) {
      onSuccess?.();
      return;
    }
    setError(true);
    setTimeout(() => {
      setPasscode("");
      setError(false);
    }, 1500);
  };

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center p-0 md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pw-title"
      >
        <motion.div
          initial={{ scale: 0.97, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] }}
          className={`modal mt-auto max-w-md md:mt-0 ${error ? "shake" : ""}`}
        >
          <div className="modal-body flex flex-col gap-6 p-8">
            <div className="space-y-2 text-center">
              <span className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
                <span className="material-symbols-outlined text-3xl text-ink-primary">
                  favorite
                </span>
              </span>
              <h2
                id="pw-title"
                className="font-headline-md text-headline-md text-ink-primary -rotate-[0.5deg]"
              >
                Mở khóa Hộp bí mật
              </h2>
              <span className="chip chip-soft">{noteTitle}</span>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="field-label" htmlFor="pw-input">
                  Mật mã bảo mật
                </label>
                <input
                  id="pw-input"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className={`field font-headline text-center text-xl font-bold tracking-[0.4em] ${
                    error ? "field-error" : ""
                  }`}
                  placeholder="••••"
                  type="password"
                  autoComplete="off"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="font-body-sm text-body-sm text-center text-error"
                >
                  Mật mã không chính xác. Thử lại với &quot;1234&quot;
                </motion.p>
              )}

              <button onClick={handleUnlock} className="btn btn-accent w-full py-4">
                <span className="material-symbols-outlined">key</span>
                Mở khóa ngay
              </button>

              <button onClick={onClose} className="btn w-full">
                Hủy
              </button>
            </div>

            <hr className="rule" />

            <p className="font-label-sm text-label-sm text-center text-primary">
              Bạn có thể thay đổi các tùy chọn này trong phần Cài đặt.
            </p>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
};

export default SecretBoxPasswordPopup;
