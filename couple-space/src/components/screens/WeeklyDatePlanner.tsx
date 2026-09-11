"use client";

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";
import Meter from "@/components/ui/Meter";

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
  { title: "Đi dạo Hồ Tây", date: "10 Tháng 5", rating: 4.8, pct: 96 },
  { title: "Triển lãm Nghệ thuật", date: "03 Tháng 5", rating: 4.5, pct: 90 },
  { title: "Cooking Class tại gia", date: "28 Tháng 4", rating: 5.0, pct: 100 },
  { title: "Camping Ba Vì", date: "15 Tháng 4", rating: 4.2, pct: 84 },
];

const ratingCategories = [
  { label: "Chất lượng món ăn", rating: 4 },
  { label: "Giá cả", rating: 3 },
  { label: "Không gian (Vibe)", rating: 5 },
];

export const WeeklyDatePlanner: React.FC = () => {
  const [ratings, setRatings] = useState(ratingCategories.map((r) => r.rating));
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen font-body-md text-ink-primary">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between gap-3 border-b-[1.6px] border-[var(--ink-08)] bg-background-main/95 px-margin-mobile md:px-margin-desktop lg:ml-64">
        <div className="flex min-w-0 items-center gap-3">
          <button className="btn btn-icon md:hidden" aria-label="Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-headline-md text-headline-md text-ink-primary -rotate-[0.5deg]">
            Kế hoạch Hẹn hò
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-icon" aria-label="Thông báo">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="btn btn-icon" aria-label="Yêu thích">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </header>

      <main className="px-margin-mobile py-stack-lg pb-32 md:px-margin-desktop md:pb-10 lg:ml-64">
        {/* ---------- Week Grid ---------- */}
        <section className="mb-stack-lg">
          <div className="mb-stack-md flex items-center justify-between gap-3">
            <h2 className="font-headline-sm text-headline-sm text-ink-primary">
              Tuần này của chúng mình
            </h2>
            <div className="flex gap-2">
              <button className="btn btn-icon" aria-label="Tuần trước">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="btn btn-icon" aria-label="Tuần sau">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
            {weekDays.map((d, i) => (
              <div
                key={d.date}
                className={`flex min-w-[80px] flex-col items-center gap-1 rounded-[var(--radius-wobble-sm)] border-[2.2px] p-4 ${
                  d.active
                    ? "-rotate-2 border-ink-primary bg-surface-accent text-ink-primary shadow-[0_3px_0_var(--color-ink-primary)]"
                    : `border-[var(--ink-20)] bg-paper ${i % 2 ? "rotate-[0.5deg]" : "-rotate-[0.4deg]"}`
                }`}
              >
                <span
                  className={`font-headline text-[0.58rem] font-semibold uppercase tracking-[0.14em] ${
                    d.active ? "text-ink-primary" : "text-primary"
                  }`}
                >
                  {d.label}
                </span>
                <span className="font-headline-sm text-headline-sm">{d.date}</span>
                {d.active && <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-ink-primary" />}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          {/* ---------- Left: Active Date ---------- */}
          <div className="space-y-gutter lg:col-span-8">
            <article className="card card-accent card-flat p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="chip chip-blue">Hôm nay</span>
                <span className="font-label-md text-label-md text-ink-primary/70">
                  15 Tháng 5, 2024
                </span>
              </div>

              <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6 text-ink-primary -rotate-[0.6deg]">
                Ăn Phở &amp; Cà phê sáng
              </h3>

              <div className="mb-8 flex flex-wrap gap-3">
                <span className="chip">
                  <span className="material-symbols-outlined">schedule</span>08:30 AM
                </span>
                <span className="chip">
                  <span className="material-symbols-outlined">location_on</span>Phở Thìn Lò Đúc
                </span>
              </div>

              {/* Review */}
              <div className="sheet mb-gutter p-6">
                <h4 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-ink-primary">
                  <span className="material-symbols-outlined">rate_review</span>
                  Đánh giá trải nghiệm
                </h4>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    {ratingCategories.map((cat, ci) => (
                      <div key={cat.label} className="flex items-center justify-between gap-3">
                        <span className="font-body-md text-body-md">{cat.label}</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => {
                                const next = [...ratings];
                                next[ci] = star;
                                setRatings(next);
                              }}
                              aria-label={`${cat.label}: ${star} trên 5`}
                              className="material-symbols-outlined cursor-pointer text-ink-primary"
                              style={{
                                fontVariationSettings:
                                  star <= ratings[ci] ? "'FILL' 1" : "'FILL' 0",
                                color: star <= ratings[ci] ? "var(--color-secondary)" : undefined,
                              }}
                              suppressHydrationWarning
                            >
                              favorite
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="date-note">
                      Lời nhắn cho buổi hẹn
                    </label>
                    <textarea
                      id="date-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="ruled min-h-[100px] w-full resize-none bg-transparent font-body-md text-body-md placeholder:text-ink-primary/30"
                      placeholder="Chúng mình đã có một buổi sáng thật tuyệt..."
                    />
                  </div>
                </div>
              </div>

              <button className="btn btn-ink w-full px-10 py-4 md:w-auto">Lưu đánh giá</button>
            </article>

            {/* Next Date Preview */}
            <div className="card card-tilt-r flex items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-background-main text-ink-primary">
                  <span className="material-symbols-outlined">movie</span>
                </span>
                <div className="min-w-0">
                  <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-primary">
                    Sắp tới · Thứ 7
                  </p>
                  <p className="font-headline-sm text-headline-sm">Xem phim &amp; Ăn tối</p>
                </div>
              </div>
              <button className="btn btn-icon" aria-label="Sửa">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>

          {/* ---------- Right: History ---------- */}
          <div className="lg:col-span-4">
            <section className="card card-ink card-flat h-full p-8">
              <h3 className="font-headline-sm text-headline-sm mb-8 flex items-center gap-3 text-paper">
                <span className="material-symbols-outlined">history</span>Lịch sử hẹn hò
              </h3>

              <div className="space-y-6">
                {historyItems.map((item) => (
                  <div key={item.title} className="group">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h5 className="font-label-md text-label-md text-paper transition-colors group-hover:text-surface-accent">
                          {item.title}
                        </h5>
                        <p className="font-body-sm text-body-sm text-primary-fixed/70">
                          {item.date}
                        </p>
                      </div>
                      <span className="flex flex-none items-center gap-1 rounded-lg border border-paper/30 px-2 py-1">
                        <span className="font-label-sm text-label-sm text-paper">{item.rating}</span>
                        <span
                          className="material-symbols-outlined text-[14px] text-surface-accent"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          suppressHydrationWarning
                        >
                          favorite
                        </span>
                      </span>
                    </div>
                    <Meter value={item.pct} showValue={false} label={item.title} />
                  </div>
                ))}
              </div>

              <p className="font-body-sm text-body-sm mt-10 text-center italic text-primary-fixed/60">
                &quot;Mỗi buổi hẹn là một mảnh ghép của hạnh phúc.&quot;
              </p>
            </section>
          </div>
        </div>
      </main>

      <button
        className="btn btn-accent fixed bottom-28 right-6 z-50 h-14 w-14 rounded-full p-0 md:bottom-8 md:right-8"
        aria-label="Thêm buổi hẹn"
      >
        <span className="material-symbols-outlined text-[32px]">calendar_add_on</span>
      </button>
      <NavBar activeHref="/dates" />
    </div>
  );
};

export default WeeklyDatePlanner;
