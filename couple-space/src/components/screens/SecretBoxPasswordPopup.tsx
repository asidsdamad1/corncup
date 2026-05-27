"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface SecretBoxPasswordPopupProps {
  readonly noteTitle?: string;
  readonly onSuccess?: () => void;
  readonly onClose?: () => void;
}

export const SecretBoxPasswordPopup: React.FC<SecretBoxPasswordPopupProps> = ({
  noteTitle = "Love you",
  onSuccess,
  onClose,
}) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const CORRECT = "1234";

  const handleUnlock = () => {
    if (passcode === CORRECT) {
      onSuccess?.();
    } else {
      setError(true);
      setTimeout(() => {
        setPasscode("");
        setError(false);
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      <Portal>
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink-primary/40 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-white/40 backdrop-blur-md"
        >
          <div className="p-8 flex flex-col gap-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-surface-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-ink-primary text-3xl">favorite</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-ink-primary">Mở khóa Hộp bí mật</h2>
              <p className="font-body-sm text-body-sm text-secondary font-bold">{noteTitle}</p>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <div className="space-y-2">
                <label className="font-label-sm text-label-sm text-ink-primary opacity-60 ml-1">Mật mã bảo mật</label>
                <input
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className="w-full p-4 bg-surface-container-low border-2 border-surface-accent/20 rounded-2xl text-center font-headline-sm text-headline-sm focus:outline-none focus:border-surface-accent transition-all placeholder:text-ink-primary/20 tracking-widest text-ink-primary"
                  placeholder="Nhập mã bí mật"
                  type="password"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-body-sm text-error"
                >
                  Mật mã không chính xác. Thử lại với "1234"
                </motion.p>
              )}

              <button
                onClick={handleUnlock}
                className="w-full py-4 bg-surface-accent text-ink-primary rounded-xl font-bold font-label-md text-label-md hover:brightness-95 transition-all shadow-lg shadow-surface-accent/20"
              >
                Mở khóa ngay
              </button>
              
              <button
                onClick={onClose}
                className="w-full py-4 text-ink-primary opacity-60 font-label-md font-bold hover:opacity-100 transition-opacity"
              >
                Hủy
              </button>
            </div>
            <p className="text-center text-[11px] font-label-sm text-label-sm text-ink-primary/50">
              Bạn có thể thay đổi các tùy chọn này trong phần Cài đặt.
            </p>
          </div>
        </motion.div>
        </div>
      </Portal>
    </AnimatePresence>
  );
};

export default SecretBoxPasswordPopup;
