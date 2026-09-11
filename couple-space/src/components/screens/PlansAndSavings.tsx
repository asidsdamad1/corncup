"use client";

import NavBar from "@/components/ui/NavBar";
import Meter from "@/components/ui/Meter";

const goals = [
  { priority: "Ưu tiên cao", icon: "landscape", pct: 65, title: "Du lịch Hà Giang", desc: "Chinh phục Mã Pì Lèng tháng 10 này.", current: "3.250.000đ", target: "5.000.000đ" },
  { priority: "Trung bình", icon: "camera", pct: 20, title: "Mua máy ảnh mới", desc: "Để lưu giữ mọi khoảnh khắc bên nhau.", current: "8.000.000đ", target: "40.000.000đ" },
  { priority: "Ưu tiên cao", icon: "favorite", pct: 5, title: "Đám cưới mơ ước", desc: "Kế hoạch cho năm 2026 rực rỡ.", current: "3.750.000đ", target: "75.000.000đ" },
];

const filters = ["Tất cả", "Ưu tiên cao", "Đang thực hiện"];

export const PlansAndSavings: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden text-ink-primary">
      <main className="min-h-screen pb-32 lg:ml-64 md:pb-10">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex w-full items-center justify-between gap-4 border-b-[1.6px] border-[var(--ink-08)] bg-background-main/95 px-margin-mobile py-4 md:px-margin-desktop">
          <div className="flex min-w-0 items-center gap-3">
            <button className="btn btn-icon md:hidden" aria-label="Menu">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-headline-md text-headline-md text-ink-primary -rotate-[0.5deg]">
              Dự định &amp; Tiết kiệm
            </h2>
          </div>
          <button className="btn btn-icon relative" aria-label="Thông báo">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-ink-primary bg-surface-accent" />
          </button>
        </header>

        <div className="mt-stack-md space-y-stack-lg px-margin-mobile md:px-margin-desktop">
          {/* ---------- Savings Overview ---------- */}
          <section>
            <div className="card card-accent card-flat flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-12">
              <div className="space-y-4 text-center md:text-left">
                <span className="chip">Tổng tích lũy chung</span>
                <h3 className="font-headline-lg text-headline-lg text-ink-primary md:text-5xl -rotate-[0.6deg]">
                  15.000.000đ
                </h3>
                <div className="ruled bg-paper/70">
                  <p className="text-ink-primary">
                    &quot;Quỹ cho những hành trình mới và những ước mơ chung.&quot;
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
                <button className="btn btn-ink flex-1 px-8 py-4">
                  <span className="material-symbols-outlined">add_circle</span>Nạp thêm
                </button>
                <button className="btn flex-1 px-8 py-4">
                  <span className="material-symbols-outlined">history</span>Lịch sử
                </button>
              </div>
            </div>
          </section>

          {/* ---------- Goals Grid ---------- */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-headline-md text-headline-md text-ink-primary -rotate-[0.5deg]">
                  Mục tiêu của chúng mình
                </h4>
                <p className="font-body-md text-body-md text-primary">
                  Từng bước nhỏ xây dựng tương lai lớn
                </p>
              </div>
              <span className="chip chip-soft">3 mục tiêu đang thực hiện</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-label-md text-label-md text-primary">Lọc theo:</span>
              <div className="tabs w-auto">
                {filters.map((f, i) => (
                  <button key={f} className={`tab px-4 ${i === 0 ? "tab-on" : ""}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-3">
              {goals.map((goal, i) => (
                <div
                  key={goal.title}
                  className={`card group p-6 ${i % 2 === 1 ? "card-tilt-r" : ""}`}
                >
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <span className="chip chip-soft">{goal.priority}</span>
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent text-ink-primary transition-transform group-hover:-rotate-6">
                      <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                    </span>
                  </div>

                  <h5 className="font-headline-sm text-headline-sm mb-2 text-ink-primary">
                    {goal.title}
                  </h5>
                  <p className="font-body-sm text-body-sm mb-5 text-primary">{goal.desc}</p>

                  <hr className="rule mb-4" />

                  <div className="font-label-sm text-label-sm mb-3 flex justify-between">
                    <span className="text-ink-primary">{goal.current}</span>
                    <span className="text-primary">/ {goal.target}</span>
                  </div>
                  <Meter value={goal.pct} curve={(i % 3) as 0 | 1 | 2} label={goal.title} />
                </div>
              ))}

              {/* Empty state — a space waiting to be filled in */}
              <button className="card-dashed group flex min-h-[220px] flex-col items-center justify-center gap-4 p-6 transition-colors hover:border-ink-primary">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-[2.2px] border-[var(--ink-20)] bg-paper text-primary transition-transform group-hover:scale-110 group-hover:border-ink-primary">
                  <span className="material-symbols-outlined text-3xl">add</span>
                </span>
                <span className="font-label-md text-label-md text-primary">Thêm mục tiêu mới</span>
              </button>
            </div>
          </section>

          {/* ---------- Quote ---------- */}
          <section className="flex justify-center py-stack-lg">
            <div className="max-w-2xl space-y-4 text-center">
              <span className="material-symbols-outlined text-4xl text-surface-accent">
                format_quote
              </span>
              <h4 className="font-headline-md text-headline-md italic text-ink-primary -rotate-[0.5deg]">
                &quot;Hạnh phúc không chỉ là điểm đến, mà là hành trình chúng mình cùng nhau chuẩn
                bị.&quot;
              </h4>
              <p className="font-headline text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary">
                — Gửi người thương
              </p>
            </div>
          </section>
        </div>
      </main>

      <NavBar activeHref="/savings" />
    </div>
  );
};

export default PlansAndSavings;
