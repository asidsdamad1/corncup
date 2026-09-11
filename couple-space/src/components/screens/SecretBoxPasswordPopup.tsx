"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";
import { PASSCODE_LENGTH } from "@/lib/secretBox";

interface SecretBoxPasswordPopupProps {
  readonly noteTitle: string;
  /**
   * The passcode this box was created with.
   *
   * It used to be a module constant `"1234"` shared by every box, which meant
   * the code the writer chose was collected and then thrown away.
   */
  readonly passcode: string;
  readonly onSuccess: () => void;
  readonly onClose: () => void;
}

/** Wrong tries allowed before the field goes quiet for a while. */
const MAX_ATTEMPTS = 5;
const COOLDOWN_SECONDS = 30;

/**
 * ⚠️ The passcode is still compared in the browser, so this remains a
 * decorative gate: the note's content is already in the page. The real gate
 * is a Server Action that refuses to send `content` until it has checked the
 * passcode itself — see plan.md § Giai đoạn 7. The attempt limit below is
 * worth having anyway, but do not mistake it for security.
 */
export function SecretBoxPasswordPopup({
  noteTitle,
  passcode,
  onSuccess,
  onClose,
}: SecretBoxPasswordPopupProps) {
  const [entered, setEntered] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const blocked = cooldown > 0;

  const handleUnlock = () => {
    if (blocked) return;
    if (entered === passcode) {
      onSuccess();
      return;
    }
    const next = attempts + 1;
    setAttempts(next);
    setError(true);
    setEntered("");
    if (next >= MAX_ATTEMPTS) {
      setCooldown(COOLDOWN_SECONDS);
      setAttempts(0);
    }
  };

  const remaining = MAX_ATTEMPTS - attempts;

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center p-0 md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pw-title"
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
          initial={{ scale: 0.97, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.9, 0.25, 1] }}
          className={`modal mt-auto max-w-md md:mt-0 ${error ? "shake" : ""}`}
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="modal-body flex flex-col gap-6 p-8">
            <div className="space-y-2 text-center">
              <span className="mx-auto mb-2 flex h-16 w-16 -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                <span className="material-symbols-outlined text-3xl text-ink-primary">
                  favorite
                </span>
              </span>
              <h2
                id="pw-title"
                className="font-headline-md text-headline-md -rotate-[0.5deg] text-ink-primary"
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
                  value={entered}
                  onChange={(e) => {
                    setEntered(e.target.value.replace(/\D/g, "").slice(0, PASSCODE_LENGTH));
                    setError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className={`field font-headline text-center text-xl font-bold tracking-[0.4em] ${
                    error ? "field-error" : ""
                  }`}
                  placeholder="••••"
                  type="password"
                  inputMode="numeric"
                  maxLength={PASSCODE_LENGTH}
                  autoComplete="off"
                  disabled={blocked}
                />
              </div>

              {/* The wrong-code message used to print the answer: "Thử lại với
                  1234". It now says only that the code was wrong, and how many
                  goes are left. */}
              {error && !blocked && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="font-body-sm text-body-sm text-center text-error"
                >
                  Mật mã không đúng. Còn {remaining} lần thử.
                </motion.p>
              )}

              {blocked && (
                <p role="alert" className="font-body-sm text-body-sm text-center text-primary">
                  Sai quá nhiều lần. Thử lại sau {cooldown} giây.
                </p>
              )}

              <button
                onClick={handleUnlock}
                disabled={blocked || entered.length < PASSCODE_LENGTH}
                className="btn btn-accent w-full py-4"
              >
                <span className="material-symbols-outlined">key</span>
                Mở khóa ngay
              </button>

              <button onClick={onClose} className="btn w-full">
                Hủy
              </button>
            </div>

            <hr className="rule" />

            <p className="font-label-sm text-label-sm text-center text-primary">
              Mật mã do người tạo hộp đặt riêng cho từng hộp.
            </p>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default SecretBoxPasswordPopup;
