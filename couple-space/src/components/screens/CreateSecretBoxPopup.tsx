import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";

interface CreateSecretBoxPopupProps {
  readonly onClose: () => void;
  readonly onSuccess: (data: { title: string; content: string; unlockDate: string; passcode: string }) => void;
}

export const CreateSecretBoxPopup: React.FC<Readonly<CreateSecretBoxPopupProps>> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [passcode, setPasscode] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !passcode || !unlockDate) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    // Show success modal first, then trigger onSuccess
    setIsSuccessModalOpen(true);
  };

  const handleFinish = () => {
    setIsSuccessModalOpen(false);
    onSuccess({ title, content, unlockDate, passcode });
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink-primary/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl bg-surface-text-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
        style={{ boxShadow: "0 15px 30px -10px rgba(37, 53, 88, 0.2)" }}
      >
        {/* Atmospheric background element */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-surface-accent/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-surface-accent flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-ink-primary">lock_open</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">Gửi gắm điều thầm kín</h3>
              <p className="font-body-sm text-on-surface-variant">Hộp bí mật sẽ chỉ mở ra vào khoảnh khắc bạn chọn.</p>
            </div>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant ml-1" htmlFor="title">Tiêu đề cảm xúc</label>
              <input
                className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề (ví dụ: Lần đầu tiên ta gặp nhau)"
                type="text"
              />
            </div>
            {/* Content Field */}
            <div className="space-y-2">
              <label className="font-label-md text-on-surface-variant ml-1" htmlFor="message">Lời nhắn bí mật</label>
              <textarea
                className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all resize-none focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                id="message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết những lời bạn muốn nhắn gửi..."
                rows={5}
              ></textarea>
            </div>
            {/* Security & Unlock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Passcode Setup */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant ml-1" htmlFor="passcode">Thiết lập mật mã (4 số)</label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all tracking-[1em] text-center focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                    id="passcode"
                    maxLength={4}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                    placeholder="••••"
                    type="password"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">key</span>
                </div>
              </div>
              {/* Unlock Condition */}
              <div className="space-y-2">
                <label className="font-label-md text-on-surface-variant ml-1" htmlFor="unlock-date">Thời gian mở khóa</label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 pr-12 font-body-md transition-all focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40 appearance-none"
                    id="unlock-date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    type="date"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 pointer-events-none">event</span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                className="flex-1 px-8 py-4 rounded-2xl font-label-md text-ink-primary border border-ink-primary/10 hover:bg-surface-container-high transition-colors text-center"
                type="button"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
              <button
                className="flex-1 px-8 py-4 rounded-2xl font-label-md text-ink-primary bg-surface-accent hover:opacity-90 active:scale-95 transition-all shadow-md shadow-surface-accent/20 text-center"
                type="submit"
              >
                Tạo hộp bí mật
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <Portal>
            <div className="fixed inset-0 z-[210] flex items-center justify-center px-4 bg-ink-primary/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-surface-text-container p-8 rounded-[2.5rem] max-w-sm w-full text-center"
            >
              <div className="w-20 h-20 bg-surface-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">lock_clock</span>
              </div>
              <h4 className="text-headline-sm font-headline-sm mb-2 text-ink-primary">
                  &ldquo;{title}&rdquo; đã được khóa!
                </h4>
                <p className="font-body-md text-on-surface-variant mb-8">Điều thầm kín của bạn đã được lưu giữ an toàn cho đến ngày hẹn.</p>
              <button
                className="w-full py-4 bg-ink-primary text-white rounded-2xl font-label-md hover:opacity-90 transition-opacity"
                onClick={handleFinish}
              >
                Tuyệt vời
              </button>
            </motion.div>
          </div>
          </Portal>
        )}
      </AnimatePresence>
      </div>
    </Portal>
  );
};
