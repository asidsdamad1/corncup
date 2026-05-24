"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { emotions, memories } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";

interface HomePageProps {
  readonly userName?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ userName = "Anh Thư" }) => {
  const [activeEmotionTab, setActiveEmotionTab] = useState<"me" | "you" | "us">("me");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const latestMemory = memories[0];

  const emotionIcons = [
    { icon: "sentiment_very_satisfied", label: "Hạnh phúc", fill: true },
    { icon: "sentiment_satisfied", label: "Bình yên", fill: false },
    { icon: "favorite", label: "Được yêu", fill: false },
    { icon: "self_care", label: "Cần nghỉ", fill: false },
    { icon: "mood_bad", label: "Mệt mỏi", fill: false },
  ];

  return (
    <div className="min-h-screen bg-background-main selection:bg-surface-accent/30 font-body-md text-on-background">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-background-main hidden lg:flex flex-col py-8 px-4 z-50">
        <div className="mb-12 px-4">
          <h1 className="font-headline-md text-headline-md font-bold text-ink-primary">Duyên</h1>
          <p className="font-label-sm text-label-sm text-ink-primary/60">Our Digital Sanctuary</p>
        </div>
        <nav className="flex-1 flex flex-col space-y-2">
          <a href="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-ink-primary font-bold border-r-4 border-surface-accent bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-label-md">Home</span>
          </a>
          <a href="/emotions" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label-md text-label-md">Our Journey</span>
          </a>
          <a href="/plans" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="font-label-md text-label-md">Finances</span>
          </a>
          <a href="/dates" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-md text-label-md">Date Night</span>
          </a>
          <a href="/memories" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined">auto_stories</span>
            <span className="font-label-md text-label-md">Memories</span>
          </a>
        </nav>
        <button className="mt-auto mx-4 bg-ink-primary text-white py-3 px-4 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Add New Memory</span>
        </button>
      </aside>

      <main className="lg:ml-64 min-h-screen px-margin-mobile lg:px-margin-desktop py-stack-lg pb-24 lg:pb-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-ink-primary mb-1">Chào buổi sáng, {userName}</h2>
            <p className="font-body-md text-body-md text-primary opacity-80">Hôm nay là một ngày tuyệt vời để cùng nhau viết tiếp chương mới.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-ink-primary hover:bg-surface-accent transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-ink-primary hover:bg-surface-accent transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-gutter">
          {/* Emotion Engine */}
          <section className="col-span-12 lg:col-span-7 bg-white/40 backdrop-blur-md rounded-[24px] p-stack-md shadow-[0_4px_15px_rgba(37,53,88,0.08)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">Emotion Engine</h3>
              <div className="flex bg-surface-container-low p-1 rounded-full gap-1">
                {[{ key: "me", label: "Riêng tôi" }, { key: "you", label: "Riêng bạn" }, { key: "us", label: "Với đối phương" }].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveEmotionTab(tab.key as "me" | "you" | "us")}
                    className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all ${activeEmotionTab === tab.key ? "bg-surface-accent text-ink-primary" : "text-on-surface-variant"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center py-4">
              <p className="font-body-lg text-body-lg text-ink-primary mb-8">Hôm nay bạn thấy thế nào?</p>
              <div className="flex flex-wrap justify-center gap-6">
                {emotionIcons.map((emo) => (
                  <button key={emo.label} onClick={() => setSelectedEmotion(emo.label)} className="group flex flex-col items-center space-y-2">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-ink-primary transition-all duration-300 ${selectedEmotion === emo.label ? "bg-surface-accent" : "bg-surface-container-low group-hover:bg-surface-accent"}`}>
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: emo.fill || selectedEmotion === emo.label ? "'FILL' 1" : "'FILL' 0" }}>{emo.icon}</span>
                    </div>
                    <span className="font-label-sm text-label-sm">{emo.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Shared Savings */}
          <section className="col-span-12 lg:col-span-5 bg-surface-text-container rounded-[24px] p-stack-md shadow-[0_4px_15px_rgba(37,53,88,0.08)] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-surface-accent/20 p-2 rounded-lg"><span className="material-symbols-outlined text-ink-primary">savings</span></div>
                <span className="font-label-md text-label-md text-primary bg-white/50 px-3 py-1 rounded-full">Tiết kiệm chung</span>
              </div>
              <div className="mb-8">
                <p className="font-body-sm text-body-sm text-primary mb-1">Hiện tại</p>
                <h4 className="font-headline-lg text-headline-lg text-ink-primary">15.000.000đ</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between font-label-md text-label-md text-ink-primary"><span>Chuyến đi Đà Lạt</span><span>75%</span></div>
                <div className="w-full bg-outline-variant/30 h-3 rounded-full overflow-hidden">
                  <div className="bg-surface-accent h-full rounded-full" style={{ width: "75%" }} />
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant"><span>Đã góp: 15.000.000đ</span><span>Mục tiêu: 20.000.000đ</span></div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-surface-accent/10 rounded-full blur-3xl" />
          </section>

          {/* Date Night Planner */}
          <section className="col-span-12 lg:col-span-4 bg-white/40 backdrop-blur-md rounded-[24px] p-stack-md shadow-[0_4px_15px_rgba(37,53,88,0.08)] flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-symbols-outlined text-ink-primary">calendar_today</span>
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">Hẹn hò tuần này</h3>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-4 border border-ink-primary/5">
              <div className="flex items-start space-x-4">
                <div className="bg-surface-accent text-ink-primary w-12 h-14 rounded-lg flex flex-col items-center justify-center font-bold">
                  <span className="text-xs uppercase">Th7</span>
                  <span className="text-xl">18</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-ink-primary">Nhà hàng Ý Pasta del Sol</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">19:00 • Quận 1, TP.HCM</p>
                  <div className="mt-4 flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-accent flex items-center justify-center font-bold text-[10px] text-ink-primary">AT</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-fixed flex items-center justify-center font-bold text-[10px] text-ink-primary">DH</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 font-label-md text-label-md text-ink-primary border border-ink-primary/20 rounded-lg hover:bg-surface-accent transition-colors">Chi tiết lịch trình</button>
          </section>

          {/* Memory Spotlight */}
          <section className="col-span-12 lg:col-span-5 bg-surface-text-container rounded-[24px] overflow-hidden shadow-[0_4px_15px_rgba(37,53,88,0.08)] group">
            <div className="relative h-48 overflow-hidden">
              {latestMemory?.coverImage ? (
                <img src={latestMemory.coverImage} alt={latestMemory.coverImageAlt ?? "Memory"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-container to-tertiary-container" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 to-transparent" />
              <div className="absolute bottom-4 left-4"><span className="bg-surface-accent text-ink-primary font-label-sm text-label-sm px-2 py-1 rounded-md">Kỷ niệm hôm nay</span></div>
            </div>
            <div className="p-stack-md">
              <p className="font-body-md text-body-md italic text-ink-primary leading-relaxed">&quot;Giữa mây ngàn Hà Giang, ta thấy cả thế giới trong mắt nhau.&quot;</p>
              <div className="mt-4 flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
                <span>Chuyến đi Hà Giang, 2023</span>
                <span className="material-symbols-outlined cursor-pointer hover:text-ink-primary">share</span>
              </div>
            </div>
          </section>

          {/* Secret Note Teaser */}
          <section className="col-span-12 lg:col-span-3 bg-on-tertiary-fixed rounded-[24px] p-stack-md shadow-[0_4px_15px_rgba(37,53,88,0.08)] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full" />
              <div className="absolute top-10 right-5 w-2 h-2 bg-surface-accent rounded-full" />
              <div className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-primary-fixed rounded-full" />
            </div>
            <div className="relative z-10 mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-surface-accent" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-white mb-2 relative z-10">Hộp bí mật</h3>
            <p className="font-body-sm text-body-sm text-primary-fixed opacity-70 mb-6 relative z-10">Cần 3 ngày nữa để mở khóa lá thư từ quá khứ.</p>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden relative z-10 mb-2">
              <div className="bg-surface-accent h-full rounded-full w-[80%]" />
            </div>
            <p className="text-[10px] text-white/40 uppercase tracking-widest relative z-10">Tiến trình: 80%</p>
          </section>
        </div>
      </main>

      <button className="fixed bottom-24 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-ink-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
      <NavBar activeHref="/" />
    </div>
  );
};

export default HomePage;
