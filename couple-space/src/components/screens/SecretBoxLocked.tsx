"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/ui/NavBar";

interface SecretBoxLockedProps {}

export const SecretBoxLocked: React.FC<SecretBoxLockedProps> = () => {
  const [time, setTime] = useState({
    hours: 3,
    minutes: 14,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let sec = prev.seconds - 1;
        let min = prev.minutes;
        let hr = prev.hours;

        if (sec < 0) {
          sec = 59;
          min -= 1;
        }
        if (min < 0) {
          min = 59;
          hr -= 1;
        }
        if (hr < 0) {
          hr = 0;
          min = 0;
          sec = 0;
          clearInterval(timer);
        }
        return { hours: hr, minutes: min, seconds: sec };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-background-main text-ink-primary font-body-md min-h-screen overflow-x-hidden">
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col h-full py-8 px-4 fixed left-0 top-0 z-50 w-64 bg-background-main border-r border-ink-primary border-opacity-10">
        <div className="mb-10 px-4">
          <h1 className="text-headline-md font-headline-md font-bold text-ink-primary">Duyên</h1>
          <p className="text-label-sm font-label-sm opacity-70">Digital Sanctuary</p>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/emotions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label-md text-label-md">Cảm xúc</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/memories">
            <span className="material-symbols-outlined">timeline</span>
            <span className="font-label-md text-label-md">Hành trình</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/plans">
            <span className="material-symbols-outlined">savings</span>
            <span className="font-label-md text-label-md">Tương lai</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-ink-primary opacity-70 hover:opacity-100 hover:bg-surface-container transition-all" href="/dates">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="font-label-md text-label-md">Hẹn hò</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-surface-accent text-ink-primary rounded-xl font-bold scale-[0.98]" href="/secrets">
            <span className="material-symbols-outlined">lock</span>
            <span className="font-label-md text-label-md">Bí mật</span>
          </a>
        </nav>
      </aside>

      {/* TopAppBar */}
      <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-background-main">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2">
            <h2 className="text-headline-md font-headline-md font-bold text-ink-primary">Hộp thư bí mật</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-ink-primary hover:bg-surface-accent p-2 rounded-full transition-colors">notifications</button>
            <button className="material-symbols-outlined text-ink-primary hover:bg-surface-accent p-2 rounded-full transition-colors">account_circle</button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="pt-24 pb-32 px-margin-mobile md:px-margin-desktop md:ml-64 min-h-screen">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-stack-lg items-center">
          {/* Left Side: Descriptive & Locked Status */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
            <div>
              <h3 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-ink-primary mb-2">Hộp thư bí mật</h3>
              <p className="text-body-lg font-body-lg text-ink-primary opacity-80">Những điều chưa nói, chờ ngày hé lộ.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-ink-primary/10 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3 text-ink-primary justify-center lg:justify-start">
                <span className="material-symbols-outlined text-[32px]">lock_clock</span>
                <div className="text-left">
                  <p className="text-label-md font-label-md uppercase tracking-wider opacity-60">Status</p>
                  <p className="text-headline-sm font-headline-sm">Đang khóa</p>
                </div>
              </div>
              <div className="h-[2px] w-full bg-ink-primary opacity-10" />
              <p className="text-body-md font-body-md">Đây là nơi lưu giữ những tâm tư, kỷ niệm và lời nhắn gửi chỉ dành cho tương lai. Hộp thư sẽ tự động mở cửa vào ngày kỷ niệm đặc biệt của hai bạn.</p>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between text-label-md font-label-md">
                  <span>Thời gian còn lại</span>
                  <span>Mở khóa sau 3 ngày nữa</span>
                </div>
                <div className="h-3 w-full bg-surface-container-low rounded-full overflow-hidden">
                  <div className="h-full bg-surface-accent w-[85%] rounded-full shadow-[0_0_8px_rgba(245,199,199,0.8)]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href="/secrets/create" className="flex-1 px-8 py-4 bg-ink-primary text-white rounded-xl font-label-md text-label-md hover:scale-[0.98] transition-transform active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_circle</span>
                Gửi thêm bí mật
              </a>
              <button className="flex-1 px-8 py-4 bg-surface-container-low text-ink-primary opacity-50 rounded-xl font-label-md text-label-md cursor-not-allowed flex items-center justify-center gap-2" disabled>
                <span className="material-symbols-outlined">key_off</span>
                Mở khóa
              </button>
            </div>
          </div>

          {/* Right Side: The Vault Visuals */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative order-1 lg:order-2 py-10">
            {/* Atmospheric Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="w-72 h-72 bg-surface-accent rounded-full blur-[80px] opacity-30 animate-pulse" />
            </div>
            {/* Main Vault Image */}
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-surface-accent blur-xl opacity-20 rounded-full scale-110 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-ink-primary rounded-[2.5rem] flex flex-col items-center justify-center border-4 border-surface-accent/30 overflow-hidden shadow-[0_0_20px_rgba(245,199,199,0.4)]">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                  alt="Futuristic digital safe"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr6MZ_l_FkOQkC4lH5Qtw_3Q-7HcZGH_8tXUFOPbIrlEIVeuIS3wf6Z3ZzhEFLjzqpVkhKcJFtpBP-_8htvzmjZQLx1x5Dsc38vrptkxwePe11rUToFNZPJ8Ml4u9Il0vYbzQqrq39jc_wlfsK-V4N8Ok4Rp_6DfnR4CGKvMolJoTDdJfGjoDTZVwdDBtlDpEdhCAe9cE3pS5M4GZhC7ab8Ruchir0IjPkmLIw-bjsSmQLxAdZtCmYrz6tyqFfybpBsC3J1rML3wM"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="material-symbols-outlined text-[80px] md:text-[100px] text-surface-accent mb-4 animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                  <div className="text-surface-accent font-headline-md text-headline-md tracking-[0.2em] px-6 py-2 border-y border-surface-accent/20">
                    {format(time.hours)}:{format(time.minutes)}:{format(time.seconds)}
                  </div>
                  <p className="text-surface-accent/60 text-label-sm font-label-sm mt-4 uppercase">Giờ • Phút • Giây</p>
                </div>
              </div>
            </div>

            {/* Hidden Notes Peeking Out */}
            <div className="absolute top-0 right-0 md:right-10 transform rotate-12 opacity-60 pointer-events-none">
              <div className="w-32 h-40 bg-surface-text-container rounded-lg p-4 shadow-lg border border-ink-primary/10 blur-[1px]">
                <div className="w-full h-2 bg-ink-primary/10 rounded mb-2" />
                <div className="w-3/4 h-2 bg-ink-primary/10 rounded mb-2" />
                <div className="w-1/2 h-2 bg-ink-primary/10 rounded" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 md:left-10 transform -rotate-6 opacity-60 pointer-events-none">
              <div className="w-32 h-40 bg-surface-accent rounded-lg p-4 shadow-lg border border-ink-primary/10 blur-[1px]">
                <div className="w-full h-2 bg-ink-primary/20 rounded mb-2" />
                <div className="w-5/6 h-2 bg-ink-primary/20 rounded mb-2" />
                <div className="w-2/3 h-2 bg-ink-primary/20 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric Bento Grid for Hints */}
        <div className="mt-20">
          <h4 className="text-headline-sm font-headline-sm mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">visibility</span>
            Gợi ý từ hộp thư
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            <div className="col-span-2 md:col-span-2 h-48 bg-white/40 backdrop-blur-md border border-ink-primary/10 rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden group">
              <div className="absolute top-4 right-4 bg-surface-accent/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-ink-primary">photo_library</span>
              </div>
              <p className="text-label-md font-label-md opacity-60">Khoảnh khắc</p>
              <h5 className="text-headline-sm font-headline-sm">12 tấm ảnh bí mật</h5>
            </div>
            <div className="h-48 bg-white/40 backdrop-blur-md border border-ink-primary/10 rounded-2xl p-6 flex flex-col justify-end group transition-all">
              <span className="material-symbols-outlined mb-2">sticky_note_2</span>
              <h5 className="text-body-md font-body-md font-bold">Lần đầu gặp...</h5>
            </div>
            <div className="h-48 bg-white/40 backdrop-blur-md border border-ink-primary/10 rounded-2xl p-6 flex flex-col justify-end group transition-all">
              <span className="material-symbols-outlined mb-2">mic</span>
              <h5 className="text-body-md font-body-md font-bold">Ghi âm #4</h5>
            </div>
          </div>
        </div>
      </main>

      <NavBar activeHref="/secrets" />
    </div>
  );
};

export default SecretBoxLocked;
