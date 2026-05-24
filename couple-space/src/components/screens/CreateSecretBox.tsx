"use client";

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";

interface CreateSecretBoxProps {}

export const CreateSecretBox: React.FC<CreateSecretBoxProps> = () => {
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
    <div className="min-h-screen text-ink-primary font-body-md overflow-x-hidden bg-background-main">


      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 bg-background-main z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-full hover:bg-surface-accent/20 transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-headline-md font-headline-md text-ink-primary">Tạo Hộp Bí Mật</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-ink-primary hover:opacity-80 transition-opacity">notifications</button>
          </div>
        </header>

        {/* Form */}
        <section className="flex-1 flex items-start justify-center px-margin-mobile md:px-margin-desktop py-stack-lg pb-24 md:pb-8">
          <div className="w-full max-w-2xl bg-surface-text-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_15px_30px_-10px_rgba(37,53,88,0.08)]">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-surface-accent/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-surface-accent flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-ink-primary">lock_open</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm">Gửi gắm điều thầm kín</h3>
                  <p className="font-body-sm text-on-surface-variant">Hộp bí mật sẽ chỉ mở ra vào khoảnh khắc bạn chọn.</p>
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant ml-1" htmlFor="title">Tiêu đề cảm xúc</label>
                  <input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all focus:outline-none focus:border-surface-accent focus:shadow-[0_0_0_2px_rgba(245,199,199,0.4)]"
                    placeholder="Nhập tiêu đề (ví dụ: Lần đầu tiên ta gặp nhau)"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface-variant ml-1" htmlFor="message">Lời nhắn bí mật</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all resize-none focus:outline-none focus:border-surface-accent focus:shadow-[0_0_0_2px_rgba(245,199,199,0.4)]"
                    placeholder="Viết những lời bạn muốn nhắn gửi..."
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-2">
                    <label className="font-label-md text-on-surface-variant ml-1" htmlFor="passcode">Thiết lập mật mã (4 số)</label>
                    <div className="relative">
                      <input
                        id="passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all tracking-[1em] text-center focus:outline-none focus:border-surface-accent"
                        maxLength={4}
                        placeholder="••••"
                        type="password"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">key</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-md text-on-surface-variant ml-1" htmlFor="unlock-date">Thời gian mở khóa</label>
                    <div className="relative">
                      <input
                        id="unlock-date"
                        value={unlockDate}
                        onChange={(e) => setUnlockDate(e.target.value)}
                        className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-6 py-4 font-body-md transition-all focus:outline-none focus:border-surface-accent"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 pt-6">
                  <button className="flex-1 px-8 py-4 rounded-2xl font-label-md text-ink-primary border border-ink-primary/10 hover:bg-surface-container-high transition-colors text-center" type="button">
                    Hủy bỏ
                  </button>
                  <button className="flex-1 px-8 py-4 rounded-2xl font-label-md text-ink-primary bg-surface-accent hover:opacity-90 active:scale-95 transition-all shadow-md shadow-surface-accent/20 text-center" type="submit">
                    Tạo hộp bí mật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <NavBar activeHref="/secrets" />

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-ink-primary/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-surface-text-container p-8 rounded-[2.5rem] max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-20 h-20 bg-surface-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">lock_clock</span>
            </div>
            <h4 className="text-headline-sm font-headline-sm mb-2">Hộp bí mật đã khóa!</h4>
            <p className="font-body-md text-on-surface-variant mb-8">Điều thầm kín của bạn đã được lưu giữ an toàn cho đến ngày hẹn.</p>
            <button className="w-full py-4 bg-ink-primary text-white rounded-2xl font-label-md hover:opacity-90 transition-opacity" onClick={() => setShowModal(false)}>
              Tuyệt vời
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSecretBox;
