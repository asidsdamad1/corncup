"use client";

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";

interface WeeklyDatePlannerProps {}

const weekDays = [
  { label: "Thứ 2", date: 12 },
  { label: "Thứ 3", date: 13 },
  { label: "Thứ 4", date: 14 },
  { label: "Thứ 5", date: 15, active: true },
  { label: "Thứ 6", date: 16 },
  { label: "Thứ 7", date: 17 },
  { label: "CN", date: 18 },
];

const historyItems = [
  { title: "Đi dạo Hồ Tây", date: "10 Tháng 5", rating: 4.8, pct: "96%" },
  { title: "Triển lãm Nghệ thuật", date: "03 Tháng 5", rating: 4.5, pct: "90%" },
  { title: "Cooking Class tại gia", date: "28 Tháng 4", rating: 5.0, pct: "100%" },
  { title: "Camping Ba Vì", date: "15 Tháng 4", rating: 4.2, pct: "84%" },
];

const ratingCategories = [
  { label: "Chất lượng món ăn", rating: 4 },
  { label: "Giá cả", rating: 3 },
  { label: "Không gian (Vibe)", rating: 5 },
];

export const WeeklyDatePlanner: React.FC<WeeklyDatePlannerProps> = () => {
  const [ratings, setRatings] = useState(ratingCategories.map((r) => r.rating));
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary">


      {/* Top Bar */}
      <header className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 lg:ml-64 sticky top-0 z-40 bg-background-main/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="md:hidden material-symbols-outlined text-ink-primary">menu</span>
          <span className="font-headline-md text-headline-md font-bold text-ink-primary">Kế hoạch Hẹn hò</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-ink-primary cursor-pointer hover:opacity-70">notifications</span>
          <span className="material-symbols-outlined text-ink-primary cursor-pointer hover:opacity-70">favorite</span>
        </div>
      </header>

      <main className="lg:ml-64 px-margin-mobile md:px-margin-desktop py-stack-lg pb-24 md:pb-8">
        {/* Week Grid */}
        <section className="mb-stack-lg">
          <div className="flex items-center justify-between mb-stack-md">
            <h2 className="font-headline-sm text-headline-sm text-ink-primary">Tuần này của chúng mình</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {weekDays.map((d) => (
              <div key={d.date} className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[80px] ${d.active ? "bg-surface-accent text-ink-primary shadow-[0_4px_15px_rgba(37,53,88,0.08)] ring-2 ring-surface-accent" : "bg-white/20"}`}>
                <span className={`font-label-sm text-label-sm ${d.active ? "" : "opacity-60"}`}>{d.label}</span>
                <span className="font-headline-sm text-headline-sm">{d.date}</span>
                {d.active && <div className="w-1.5 h-1.5 bg-ink-primary rounded-full mt-1" />}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: Active Date */}
          <div className="lg:col-span-8 space-y-gutter">
            <article className="bg-surface-accent rounded-[2rem] p-8 shadow-[0_4px_15px_rgba(37,53,88,0.08)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-ink-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-wider">Hôm nay</span>
                  <span className="font-label-md text-label-md text-ink-primary opacity-60">15 Tháng 5, 2024</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-ink-primary mb-6">Ăn Phở &amp; Cà phê sáng</h3>
                <div className="flex flex-wrap gap-stack-md mb-8">
                  <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="material-symbols-outlined text-ink-primary">schedule</span>
                    <span className="font-body-md text-body-md">08:30 AM</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="material-symbols-outlined text-ink-primary">location_on</span>
                    <span className="font-body-md text-body-md">Phở Thìn Lò Đúc</span>
                  </div>
                </div>
                {/* Review Section */}
                <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 mb-gutter">
                  <h4 className="font-headline-sm text-headline-sm text-ink-primary mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">rate_review</span>Đánh giá trải nghiệm
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {ratingCategories.map((cat, ci) => (
                        <div key={ci} className="flex justify-between items-center">
                          <span className="font-body-md text-body-md">{cat.label}</span>
                          <div className="flex gap-1 text-ink-primary">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => {
                                  const next = [...ratings];
                                  next[ci] = star;
                                  setRatings(next);
                                }}
                                className="material-symbols-outlined cursor-pointer"
                                style={{ fontVariationSettings: star <= ratings[ci] ? "'FILL' 1" : "'FILL' 0", color: star <= ratings[ci] ? "#785556" : undefined }}
                              >favorite</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-ink-primary opacity-60">Lời nhắn cho buổi hẹn</label>
                      <div className="bg-surface-text-container rounded-xl p-4 min-h-[100px] border border-ink-primary/5">
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md p-0 resize-none placeholder:text-ink-primary/30"
                          placeholder="Chúng mình đã có một buổi sáng thật tuyệt..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full md:w-auto px-10 py-4 bg-ink-primary text-white rounded-full font-label-md text-label-md transition-transform active:scale-95">Lưu đánh giá</button>
              </div>
            </article>
            {/* Next Date Preview */}
            <div className="bg-white/40 rounded-3xl p-6 border border-white/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-ink-primary">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-ink-primary/60">SẮP TỚI - Thứ 7</p>
                  <p className="font-headline-sm text-headline-sm">Xem phim &amp; Ăn tối</p>
                </div>
              </div>
              <button className="p-3 bg-white rounded-full text-ink-primary shadow-[0_4px_15px_rgba(37,53,88,0.08)]">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>

          {/* Right: History */}
          <div className="lg:col-span-4">
            <section className="bg-ink-primary rounded-[2rem] p-8 text-white h-full shadow-[0_4px_15px_rgba(37,53,88,0.08)]">
              <h3 className="font-headline-sm text-headline-sm mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined">history</span>Lịch sử hẹn hò
              </h3>
              <div className="space-y-6">
                {historyItems.map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-label-md text-label-md group-hover:text-surface-accent transition-colors">{item.title}</h5>
                        <p className="font-body-sm text-body-sm opacity-50">{item.date}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                        <span className="font-label-sm text-label-sm">{item.rating}</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-surface-accent h-full rounded-full" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-center font-body-sm text-body-sm opacity-40 italic">&quot;Mỗi buổi hẹn là một mảnh ghép của hạnh phúc.&quot;</p>
            </section>
          </div>
        </div>
      </main>

      <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-surface-accent text-ink-primary rounded-full shadow-[0_4px_15px_rgba(37,53,88,0.08)] flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50">
        <span className="material-symbols-outlined text-[32px]">calendar_add_on</span>
      </button>
      <NavBar activeHref="/dates" />
    </div>
  );
};

export default WeeklyDatePlanner;
