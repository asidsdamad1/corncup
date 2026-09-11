"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import { Portal } from "@/components/ui/Portal";

export const CreateSecretBox: React.FC = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [passcode, setPasscode] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
      <main className="flex min-h-screen flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex w-full items-center justify-between gap-3 border-b-[1.6px] border-[var(--ink-08)] bg-background-main/95 px-margin-mobile py-4 md:px-margin-desktop">
          <div className="flex min-w-0 items-center gap-3">
            <button className="btn btn-icon md:hidden" aria-label="Menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-ink-primary -rotate-[0.5deg]">
              Tạo Hộp Bí Mật
            </h2>
          </div>
          <button className="btn btn-icon" aria-label="Thông báo">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        {/* Form */}
        <section className="flex flex-1 items-start justify-center px-margin-mobile py-stack-lg pb-32 md:px-margin-desktop md:pb-10">
          <div className="sheet w-full max-w-2xl p-8 md:p-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
                <span className="material-symbols-outlined text-ink-primary">lock_open</span>
              </span>
              <div className="min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-ink-primary">
                  Gửi gắm điều thầm kín
                </h3>
                <p className="font-body-sm text-body-sm text-primary">
                  Hộp bí mật sẽ chỉ mở ra vào khoảnh khắc bạn chọn.
                </p>
              </div>
            </div>

            <hr className="rule mb-8" />

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="field-label" htmlFor="title">
                  Tiêu đề cảm xúc
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="field"
                  placeholder="Nhập tiêu đề (ví dụ: Lần đầu tiên ta gặp nhau)"
                  type="text"
                />
              </div>

              <div>
                <label className="field-label" htmlFor="message">
                  Lời nhắn bí mật
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field resize-none"
                  placeholder="Viết những lời bạn muốn nhắn gửi..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="passcode">
                    Thiết lập mật mã (4 số)
                  </label>
                  <div className="relative">
                    <input
                      id="passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ""))}
                      className="field font-headline text-center tracking-[0.6em]"
                      maxLength={4}
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
                    id="unlock-date"
                    value={unlockDate}
                    onChange={(e) => setUnlockDate(e.target.value)}
                    className="field"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2 md:flex-row">
                <button className="btn flex-1 py-4" type="button">
                  Hủy bỏ
                </button>
                <button className="btn btn-accent flex-1 py-4" type="submit">
                  <span className="material-symbols-outlined">lock</span>
                  Tạo hộp bí mật
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <NavBar activeHref="/secrets" />

      {/* ---------- Success notification ---------- */}
      <AnimatePresence>
        {showModal && (
          <Portal>
            <div
              className="overlay z-[100] items-center justify-center px-4"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="secret-locked-title"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", damping: 24, stiffness: 300 }}
                className="card card-flat w-full max-w-sm p-8 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.4px] border-ink-primary bg-surface-accent -rotate-3">
                  <span className="material-symbols-outlined text-4xl text-ink-primary">
                    lock_clock
                  </span>
                </span>
                <h4
                  id="secret-locked-title"
                  className="font-headline-sm text-headline-sm mb-2 text-ink-primary"
                >
                  Hộp bí mật đã khóa!
                </h4>
                <p className="font-body-md text-body-md mb-8 text-primary">
                  Điều thầm kín của bạn đã được lưu giữ an toàn cho đến ngày hẹn.
                </p>
                <button className="btn btn-ink w-full py-4" onClick={() => setShowModal(false)}>
                  Tuyệt vời
                </button>
              </motion.div>
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateSecretBox;
