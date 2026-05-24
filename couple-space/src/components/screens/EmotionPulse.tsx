"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/ui/NavBar";

interface EmotionPulseProps {
  readonly userName?: string;
  readonly partnerName?: string;
}

const weekBars = [
  { day: "T2", h: "40%" }, { day: "T3", h: "65%" }, { day: "T4", h: "50%" },
  { day: "T5", h: "85%" }, { day: "T6", h: "70%" },
  { day: "T7", h: "95%", active: true }, { day: "CN", h: "60%" },
];

export const EmotionPulse: React.FC<EmotionPulseProps> = ({ userName = "Duyên" }) => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [selectedMood, setSelectedMood] = useState<number | null>(1);
  const [privateNote, setPrivateNote] = useState("");

  const moods = ["😊", "🥰", "😴", "😌", "🤒"];

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-transparent flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
        <h1 className="text-headline-lg font-headline-lg text-ink-primary">Duyên</h1>
        <div className="flex gap-4 items-center">
          <button className="hover:opacity-80 transition-opacity active:scale-95">
            <span className="material-symbols-outlined text-ink-primary">lock</span>
          </button>
          <button className="hover:opacity-80 relative">
            <span className="material-symbols-outlined text-ink-primary">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-surface-accent rounded-full border border-background-main" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-32 md:pb-12 lg:pl-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Segmented Control */}
          <div className="relative flex p-1 mb-stack-lg bg-surface-text-container/50 rounded-full border border-ink-primary/10 overflow-hidden">
            <div
              className="absolute h-[calc(100%-8px)] top-1 bg-surface-accent rounded-full transition-all duration-300"
              style={{ width: "33.33%", left: `calc(${activeTab * 33.33}% + 4px)` }}
            />
            {["Riêng tôi", "Riêng bạn", "Với đối phương"].map((label, i) => (
              <button
                key={label}
                onClick={() => setActiveTab(i as 0 | 1 | 2)}
                className={`relative z-10 flex-1 py-3 text-label-md font-label-md transition-colors text-center ${activeTab === i ? "text-ink-primary" : "text-ink-primary/60"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-stack-lg">
              {activeTab === 0 && (
                <div className="space-y-stack-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                    {/* Mood Selector */}
                    <div className="bg-surface-text-container p-6 rounded-[2rem] shadow-sm flex flex-col gap-4 border border-ink-primary/5">
                      <h2 className="text-headline-sm font-headline-sm text-ink-primary">Hôm nay thế nào?</h2>
                      <div className="grid grid-cols-5 gap-2">
                        {moods.map((m, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedMood(i)}
                            className={`w-full aspect-square rounded-2xl flex items-center justify-center text-2xl hover:bg-surface-accent transition-colors ${selectedMood === i ? "bg-surface-accent shadow-sm ring-2 ring-ink-primary/5" : "bg-background-main/30"}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Private Note */}
                    <div className="bg-surface-accent/60 p-6 rounded-[2rem] shadow-sm flex flex-col gap-3 border border-ink-primary/5 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-ink-primary/70">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span className="text-label-sm font-label-sm">Ghi chú riêng tư</span>
                      </div>
                      <textarea
                        value={privateNote}
                        onChange={(e) => setPrivateNote(e.target.value)}
                        className="w-full flex-grow bg-transparent border-none focus:ring-0 text-body-md font-body-md text-ink-primary placeholder:text-ink-primary/40 resize-none min-h-[100px]"
                        placeholder="Điều gì làm bạn suy nghĩ..."
                      />
                      <button className="self-end px-6 py-2 bg-ink-primary text-white rounded-full text-label-md font-label-md hover:opacity-90 transition-opacity">Lưu tâm sự</button>
                    </div>
                  </div>
                  {/* Daily Prompt */}
                  <div className="bg-surface-text-container p-8 rounded-[2.5rem] border border-ink-primary/5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-surface-accent/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div className="relative z-10 flex flex-col gap-2">
                      <span className="text-surface-accent text-headline-sm">✨</span>
                      <h3 className="text-headline-sm font-headline-sm text-ink-primary">Suy ngẫm hôm nay</h3>
                      <p className="text-body-md font-body-md text-ink-primary/70 italic">&quot;Ba điều bạn cảm thấy biết ơn về đối phương trong ngày hôm nay là gì?&quot;</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="bg-surface-text-container p-8 rounded-[2.5rem] border border-ink-primary/5 shadow-sm">
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-4 border-surface-accent bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-ink-primary/40">person</span>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-surface-text-container" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <h2 className="text-headline-md font-headline-md text-ink-primary">Duy đang cảm thấy</h2>
                        <span className="text-3xl">✨ Yên bình</span>
                      </div>
                      <p className="text-body-md font-body-md text-ink-primary/60 mb-6 italic">&quot;Vừa hoàn thành một dự án lớn, cảm thấy thật nhẹ nhõm...&quot;</p>
                      <button className="px-4 py-2 bg-surface-accent rounded-full text-ink-primary text-label-md font-label-md flex items-center gap-2 hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">favorite</span> Gửi yêu thương
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="bg-ink-primary p-8 rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/20 to-transparent opacity-50" />
                    <div className="relative z-10">
                      <span className="text-surface-accent text-label-md font-label-md uppercase tracking-widest mb-4 block">Vibe của chúng mình</span>
                      <div className="text-8xl font-headline-lg text-white mb-2 group-hover:scale-110 transition-transform duration-500">92</div>
                      <p className="text-white/80 font-body-sm">Đang ở trạng thái kết nối rất tốt!</p>
                    </div>
                  </div>
                  <div className="bg-surface-text-container p-8 rounded-[2.5rem] border border-ink-primary/5 shadow-sm flex flex-col">
                    <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-4">Mục tiêu chung</h3>
                    <div className="flex-grow flex flex-col gap-4">
                      <div className="flex items-start gap-4 bg-background-main/20 p-4 rounded-2xl">
                        <div className="bg-surface-accent w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-ink-primary">restaurant</span>
                        </div>
                        <div>
                          <p className="text-label-md font-label-md text-ink-primary">Nấu ăn cùng nhau</p>
                          <p className="text-body-sm font-body-sm text-ink-primary/60">Hôm nay, 19:00</p>
                        </div>
                        <div className="ml-auto">
                          <span className="material-symbols-outlined text-surface-accent" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trends Chart */}
              <div className="bg-surface-text-container/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-ink-primary/5 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-headline-sm font-headline-sm text-ink-primary">Xu hướng cảm xúc</h3>
                    <p className="text-body-sm font-body-sm text-ink-primary/60">Thống kê 7 ngày qua</p>
                  </div>
                  <span className="material-symbols-outlined text-ink-primary/40">more_horiz</span>
                </div>
                <div className="flex items-end justify-between h-40 gap-2 px-2">
                  {weekBars.map((bar) => (
                    <div key={bar.day} className="flex flex-col items-center gap-2 w-full group">
                      <div
                        className={`w-full bg-surface-accent rounded-t-lg transition-opacity relative ${bar.active ? "opacity-100 shadow-lg" : "opacity-40 group-hover:opacity-100"}`}
                        style={{ height: bar.h }}
                      >
                        {bar.active && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink-primary text-white text-[10px] px-2 py-1 rounded">Vui</div>
                        )}
                      </div>
                      <span className={`text-label-sm font-label-sm ${bar.active ? "text-ink-primary font-bold" : "text-ink-primary/40"}`}>{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <NavBar activeHref="/emotions" />
    </div>
  );
};

export default EmotionPulse;
