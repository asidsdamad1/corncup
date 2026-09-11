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
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
      {/* Top Bar */}
      <header className="fixed left-0 right-0 top-0 z-40 flex w-full items-center justify-between px-margin-mobile py-4 md:px-margin-desktop lg:left-64">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-ink-primary -rotate-[0.6deg]">
          {userName}
        </h1>
        <div className="flex items-center gap-3">
          <button className="btn btn-icon" aria-label="Khoá">
            <span className="material-symbols-outlined">lock</span>
          </button>
          <button className="btn btn-icon relative" aria-label="Thông báo">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-ink-primary bg-surface-accent" />
          </button>
        </div>
      </header>

      <main className="min-h-screen pb-32 pt-24 md:pb-12 lg:pl-64">
        <div className="mx-auto max-w-4xl px-margin-mobile md:px-margin-desktop">
          {/* Segmented Control */}
          <div className="tabs mb-stack-lg" role="tablist" aria-label="Lớp riêng tư">
            {["Riêng tôi", "Riêng bạn", "Với đối phương"].map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i as 0 | 1 | 2)}
                className={`tab ${activeTab === i ? "tab-on" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-stack-lg"
            >
              {activeTab === 0 && (
                <div className="space-y-stack-lg">
                  <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
                    {/* Mood Selector */}
                    <div className="card flex flex-col gap-4 p-6">
                      <h2 className="font-headline-sm text-headline-sm text-ink-primary">
                        Hôm nay thế nào?
                      </h2>
                      <div className="grid grid-cols-5 gap-2">
                        {moods.map((m, i) => (
                          <button
                            key={m}
                            onClick={() => setSelectedMood(i)}
                            aria-pressed={selectedMood === i}
                            className={`flex aspect-square w-full items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] text-2xl transition-all ${
                              selectedMood === i
                                ? "-rotate-2 border-ink-primary bg-surface-accent shadow-[0_3px_0_var(--color-ink-primary)]"
                                : "border-[var(--ink-20)] bg-paper hover:border-ink-primary hover:bg-surface-accent/30"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Private Note */}
                    <div className="card card-tilt-r card-accent flex flex-col gap-3 p-6">
                      <div className="flex items-center gap-2 text-ink-primary">
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        <span className="font-label-sm text-label-sm">Ghi chú riêng tư</span>
                      </div>
                      <textarea
                        value={privateNote}
                        onChange={(e) => setPrivateNote(e.target.value)}
                        className="ruled min-h-[100px] flex-grow resize-none border-l-2 border-ink-primary/30 bg-transparent font-body-md text-body-md text-ink-primary placeholder:text-ink-primary/40"
                        placeholder="Điều gì làm bạn suy nghĩ..."
                      />
                      <button className="btn btn-ink btn-sm self-end">Lưu tâm sự</button>
                    </div>
                  </div>

                  {/* Daily Prompt */}
                  <div className="sheet p-8">
                    <span className="chip chip-accent mb-3">✨ Suy ngẫm hôm nay</span>
                    <div className="ruled mt-3">
                      <p className="italic text-ink-primary">
                        &quot;Ba điều bạn cảm thấy biết ơn về đối phương trong ngày hôm nay là
                        gì?&quot;
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="sheet p-8">
                  <div className="mb-8 flex flex-col items-center gap-8 md:flex-row">
                    <div className="relative flex-none">
                      <div className="flex h-32 w-32 items-center justify-center rounded-full border-[2.6px] border-ink-primary bg-surface-accent">
                        <span className="material-symbols-outlined text-4xl text-ink-primary">
                          person
                        </span>
                      </div>
                      <span className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-[2.6px] border-ink-primary bg-mint" />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="mb-2 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                        <h2 className="font-headline-md text-headline-md text-ink-primary">
                          Duy đang cảm thấy
                        </h2>
                        <span className="stamp">✨<small>Yên bình</small></span>
                      </div>
                      <div className="ruled mb-6">
                        <p className="italic text-ink-primary">
                          &quot;Vừa hoàn thành một dự án lớn, cảm thấy thật nhẹ nhõm...&quot;
                        </p>
                      </div>
                      <button className="btn btn-accent">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                        Gửi yêu thương
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="grid grid-cols-1 gap-stack-md md:grid-cols-2">
                  <div className="card card-ink group flex flex-col items-center justify-center p-8 text-center">
                    <span className="chip chip-accent mb-4">Vibe của chúng mình</span>
                    <div className="font-headline-lg text-8xl font-bold text-paper transition-transform duration-500 group-hover:scale-105">
                      92
                    </div>
                    <p className="font-body-sm text-body-sm mt-2 text-primary-fixed">
                      Đang ở trạng thái kết nối rất tốt!
                    </p>
                  </div>

                  <div className="sheet flex flex-col p-8">
                    <h3 className="font-headline-sm text-headline-sm mb-4 text-ink-primary">
                      Mục tiêu chung
                    </h3>
                    <div className="flex flex-grow flex-col gap-4">
                      <div className="panel flex items-start gap-4 p-4">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                          <span className="material-symbols-outlined text-ink-primary">
                            restaurant
                          </span>
                        </span>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md text-ink-primary">
                            Nấu ăn cùng nhau
                          </p>
                          <p className="font-body-sm text-body-sm text-primary">Hôm nay, 19:00</p>
                        </div>
                        <span
                          className="material-symbols-outlined ml-auto text-mint"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          suppressHydrationWarning
                        >
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trends Chart */}
              <div className="sheet p-8">
                <div className="mb-8 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-headline-sm text-ink-primary">
                      Xu hướng cảm xúc
                    </h3>
                    <p className="font-body-sm text-body-sm text-primary">Thống kê 7 ngày qua</p>
                  </div>
                  <button aria-label="Tuỳ chọn" className="text-primary hover:text-ink-primary">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>

                <div className="flex h-40 items-end justify-between gap-2 px-2">
                  {weekBars.map((bar) => (
                    <div key={bar.day} className="group flex w-full flex-col items-center gap-2">
                      <div
                        className={`relative w-full rounded-t-[10px] border-[2.2px] border-b-0 transition-colors ${
                          bar.active
                            ? "border-ink-primary bg-surface-accent"
                            : "border-[var(--ink-20)] bg-paper group-hover:border-ink-primary group-hover:bg-surface-accent/40"
                        }`}
                        style={{ height: bar.h }}
                      >
                        {bar.active && (
                          <span className="chip absolute -top-9 left-1/2 -translate-x-1/2">Vui</span>
                        )}
                      </div>
                      <span
                        className={`font-label-sm text-label-sm ${
                          bar.active ? "font-bold text-ink-primary" : "text-primary"
                        }`}
                      >
                        {bar.day}
                      </span>
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
