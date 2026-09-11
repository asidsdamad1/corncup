"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { memories } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";
import Meter from "@/components/ui/Meter";
import Link from "next/link";
import { useSecretNotes } from "@/lib/secretStore";
import { daysUntil, progressOf, statusOf } from "@/lib/secretBox";

interface HomePageProps {
  readonly userName?: string;
}

export const HomePage: React.FC<HomePageProps> = ({ userName = "Anh Thư" }) => {
  const [activeEmotionTab, setActiveEmotionTab] = useState<"me" | "you" | "us">("me");
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const latestMemory = memories[0];

  /* The teaser used to read "Cần 3 ngày nữa" and "Tiến trình: 80%" as
     plain text, tied to nothing. It now shows whichever box opens next. */
  const secretNotes = useSecretNotes();
  const [now] = useState(() => Date.now());
  const nextSecret = secretNotes
    .filter((n) => !n.openedAt)
    .sort((a, b) => Date.parse(a.unlockAt) - Date.parse(b.unlockAt))[0];

  const emotionIcons = [
    { icon: "sentiment_very_satisfied", label: "Hạnh phúc" },
    { icon: "sentiment_satisfied", label: "Bình yên" },
    { icon: "favorite", label: "Được yêu" },
    { icon: "self_care", label: "Cần nghỉ" },
    { icon: "mood_bad", label: "Mệt mỏi" },
  ];

  return (
    <div className="min-h-screen font-body-md text-on-background selection:bg-surface-accent/30">
      <main className="min-h-screen px-margin-mobile py-stack-lg pb-32 lg:ml-64 lg:px-margin-desktop lg:pb-10">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-headline text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary -rotate-2">
              Duyên · Digital Sanctuary
            </p>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-1 text-ink-primary -rotate-[0.6deg]">
              Chào buổi sáng, {userName}
            </h2>
            <p className="font-body-md text-body-md max-w-[52ch] text-primary">
              Hôm nay là một ngày tuyệt vời để cùng nhau viết tiếp chương mới.
            </p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button className="btn btn-icon" aria-label="Thông báo">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="btn btn-icon" aria-label="Cài đặt">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-gutter">
          {/* ---------- Emotion Engine ---------- */}
          <section className="sheet col-span-12 p-stack-md lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">Emotion Engine</h3>
              <div className="tabs" role="tablist" aria-label="Lớp riêng tư">
                {[
                  { key: "me", label: "Riêng tôi" },
                  { key: "you", label: "Riêng bạn" },
                  { key: "us", label: "Với đối phương" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={activeEmotionTab === tab.key}
                    onClick={() => setActiveEmotionTab(tab.key as "me" | "you" | "us")}
                    className={`tab ${activeEmotionTab === tab.key ? "tab-on" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center py-4">
              <p className="font-body-lg text-body-lg mb-8 text-ink-primary">
                Hôm nay bạn thấy thế nào?
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                {emotionIcons.map((emo) => {
                  const on = selectedEmotion === emo.label;
                  return (
                    <button
                      key={emo.label}
                      onClick={() => setSelectedEmotion(emo.label)}
                      aria-pressed={on}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span
                        className={`flex h-16 w-16 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] text-ink-primary transition-all duration-200 ${
                          on
                            ? "-rotate-2 border-ink-primary bg-surface-accent shadow-[0_3px_0_var(--color-ink-primary)]"
                            : "border-[var(--ink-20)] bg-paper group-hover:border-ink-primary group-hover:bg-surface-accent/30"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-3xl"
                          style={{ fontVariationSettings: on ? "'FILL' 1" : "'FILL' 0" }}
                          suppressHydrationWarning
                        >
                          {emo.icon}
                        </span>
                      </span>
                      <span className="font-label-sm text-label-sm">{emo.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ---------- Shared Savings ---------- */}
          <section className="card card-tilt-r col-span-12 p-stack-md lg:col-span-5">
            <div className="mb-6 flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                <span className="material-symbols-outlined text-ink-primary">savings</span>
              </span>
              <span className="chip chip-soft">Tiết kiệm chung</span>
            </div>

            <p className="font-body-sm text-body-sm mb-1 text-primary">Hiện tại</p>
            <h4 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-ink-primary">
              15.000.000đ
            </h4>

            <hr className="rule my-5" />

            <div className="font-label-md text-label-md mb-3 flex justify-between text-ink-primary">
              <span>Chuyến đi Đà Lạt</span>
            </div>
            <Meter value={75} label="Chuyến đi Đà Lạt" />
            <div className="font-label-sm text-label-sm mt-3 flex justify-between text-primary">
              <span>Đã góp: 15.000.000đ</span>
              <span>Mục tiêu: 20.000.000đ</span>
            </div>
          </section>

          {/* ---------- Date Night Planner ---------- */}
          <section className="sheet col-span-12 flex flex-col p-stack-md lg:col-span-4">
            <div className="mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-ink-primary">calendar_today</span>
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">Hẹn hò tuần này</h3>
            </div>

            <div className="panel flex-1 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-12 flex-none flex-col items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent text-ink-primary -rotate-3">
                  <span className="font-headline text-[0.55rem] font-semibold uppercase tracking-[0.14em]">
                    Th7
                  </span>
                  <span className="font-headline text-xl font-bold leading-none">18</span>
                </div>
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-ink-primary">
                    Nhà hàng Ý Pasta del Sol
                  </p>
                  <p className="font-body-sm text-body-sm text-primary">19:00 • Quận 1, TP.HCM</p>
                  <div className="mt-4 flex -space-x-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-primary bg-surface-accent font-headline text-[10px] font-bold text-ink-primary">
                      AT
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink-primary bg-primary-fixed font-headline text-[10px] font-bold text-ink-primary">
                      DH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn mt-4 w-full">Chi tiết lịch trình</button>
          </section>

          {/* ---------- Memory Spotlight ---------- */}
          <section className="sheet group col-span-12 overflow-hidden lg:col-span-5">
            <div className="relative h-48 overflow-hidden">
              {latestMemory?.coverImage ? (
                <img
                  src={latestMemory.coverImage}
                  alt={latestMemory.coverImageAlt ?? "Kỷ niệm"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-primary-container to-tertiary-container" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 to-transparent" />
              <span className="chip chip-accent absolute bottom-4 left-4">Kỷ niệm hôm nay</span>
            </div>
            <div className="p-stack-md">
              <div className="ruled">
                <p className="text-ink-primary">
                  &quot;Giữa mây ngàn Hà Giang, ta thấy cả thế giới trong mắt nhau.&quot;
                </p>
              </div>
              <hr className="rule my-4" />
              <div className="font-label-sm text-label-sm flex items-center justify-between text-primary">
                <span>Chuyến đi Hà Giang, 2023</span>
                <button aria-label="Chia sẻ" className="hover:text-ink-primary">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </section>

          {/* ---------- Secret Note Teaser ---------- */}
          <Link
            href="/secrets"
            className="card card-ink col-span-12 flex flex-col items-center justify-center p-stack-md text-center transition-transform duration-300 hover:-translate-y-1 lg:col-span-3"
          >
            <span className="mb-4 flex h-16 w-16 -rotate-3 items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-paper/40 bg-paper/10">
              <span
                className="material-symbols-outlined text-3xl text-surface-accent"
                style={{ fontVariationSettings: "'FILL' 1" }}
                suppressHydrationWarning
              >
                lock
              </span>
            </span>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-paper">Hộp bí mật</h3>

            {nextSecret ? (
              <>
                <p className="font-body-sm text-body-sm mb-6 text-primary-fixed">
                  {statusOf(nextSecret, now) === "ready"
                    ? `"${nextSecret.title}" đã tới ngày mở.`
                    : `Còn ${daysUntil(nextSecret, now)} ngày nữa để mở "${nextSecret.title}".`}
                </p>
                <Meter
                  value={progressOf(nextSecret, now)}
                  showValue={false}
                  curve={1}
                  label="Tiến trình mở khóa"
                  className="w-full"
                />
                <p className="font-headline mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-paper/60">
                  Tiến trình: {progressOf(nextSecret, now)}%
                </p>
              </>
            ) : (
              <p className="font-body-sm text-body-sm text-primary-fixed">
                Chưa có hộp nào đang chờ. Viết một điều gì đó cho mai sau?
              </p>
            )}
          </Link>
        </div>
      </main>

      <motion.button
        whileTap={{ scale: 0.95 }}
        className="btn btn-accent fixed bottom-28 right-6 z-40 h-14 w-14 rounded-full p-0 lg:bottom-10 lg:right-10"
        aria-label="Thêm mới"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </motion.button>

      <NavBar activeHref="/" />
    </div>
  );
};

export default HomePage;
