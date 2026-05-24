"use client";

import NavBar from "@/components/ui/NavBar";

interface PlansAndSavingsProps {}

const goals = [
  { priority: "Ưu tiên cao", icon: "landscape", iconBg: "bg-surface-accent", pct: 65, title: "Du lịch Hà Giang", desc: "Chinh phục Mã Pì Lèng tháng 10 này.", current: "3.250.000đ", target: "5.000.000đ" },
  { priority: "Trung bình", icon: "camera", iconBg: "bg-surface-accent", pct: 20, title: "Mua máy ảnh mới", desc: "Để lưu giữ mọi khoảnh khắc bên nhau.", current: "8.000.000đ", target: "40.000.000đ" },
  { priority: "Ưu tiên cao", icon: "favorite", iconBg: "bg-secondary-container", pct: 5, title: "Đám cưới mơ ước", desc: "Kế hoạch cho năm 2026 rực rỡ.", current: "3.750.000đ", target: "75.000.000đ" },
];

export const PlansAndSavings: React.FC<PlansAndSavingsProps> = () => {
  return (
    <div className="text-ink-primary overflow-x-hidden min-h-screen bg-background-main">
      <main className="lg:ml-64 min-h-screen pb-24 md:pb-8">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background-main flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded-full hover:bg-surface-accent/20">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="font-headline-md text-headline-md font-bold text-ink-primary">Dự định &amp; Tiết kiệm</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full text-ink-primary hover:bg-surface-accent/20 transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
            </button>
          </div>
        </header>

        <div className="px-margin-mobile md:px-margin-desktop mt-stack-md space-y-stack-lg">
          {/* Savings Overview */}
          <section className="relative">
            <div className="bg-surface-accent rounded-3xl p-8 md:p-12 shadow-[0_4px_15px_rgba(37,53,88,0.08)] flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-ink-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 text-center md:text-left space-y-4">
                <span className="font-label-md text-label-md text-ink-primary uppercase tracking-widest opacity-80">Tổng tích lũy chung</span>
                <h3 className="font-headline-lg text-headline-lg md:text-5xl text-ink-primary font-bold">15.000.000đ</h3>
                <div className="bg-surface-text-container/80 backdrop-blur-sm px-6 py-3 rounded-2xl inline-block border border-ink-primary/5">
                  <p className="font-body-md text-body-md text-ink-primary italic">&quot;Quỹ cho những hành trình mới và những ước mơ chung.&quot;</p>
                </div>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex-1 px-8 py-4 bg-ink-primary text-white rounded-2xl font-label-md flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                  <span className="material-symbols-outlined">add_circle</span>Nạp thêm
                </button>
                <button className="flex-1 px-8 py-4 bg-white/50 backdrop-blur-md text-ink-primary rounded-2xl font-label-md flex items-center justify-center gap-3 border border-white/20 hover:bg-white/80 active:scale-95 transition-all">
                  <span className="material-symbols-outlined">history</span>Lịch sử
                </button>
              </div>
            </div>
          </section>

          {/* Goals Grid */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-headline-md text-headline-md text-ink-primary">Mục tiêu của chúng mình</h4>
                <p className="font-body-md text-body-md opacity-70">Từng bước nhỏ xây dựng tương lai lớn</p>
              </div>
              <span className="font-label-md text-ink-primary px-4 py-2 bg-white/40 rounded-full border border-ink-primary/10">3 mục tiêu đang thực hiện</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-ink-primary/60">Lọc theo:</span>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded-full bg-ink-primary text-white font-label-sm">Tất cả</button>
                  <button className="px-4 py-1.5 rounded-full bg-white/40 border border-ink-primary/10 text-ink-primary font-label-sm hover:bg-surface-accent/20 transition-all">Ưu tiên cao</button>
                  <button className="px-4 py-1.5 rounded-full bg-white/40 border border-ink-primary/10 text-ink-primary font-label-sm hover:bg-surface-accent/20 transition-all">Đang thực hiện</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {goals.map((goal, i) => (
                <div key={i} className="rounded-2xl p-6 hover:shadow-xl transition-all group" style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(37,53,88,0.1)" }}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 rounded-full bg-surface-accent/30 text-ink-primary font-label-sm text-[10px] uppercase tracking-wider border border-ink-primary/5">{goal.priority}</span>
                    <div className={`w-12 h-12 ${goal.iconBg} rounded-xl flex items-center justify-center text-ink-primary shadow-sm group-hover:rotate-6 transition-transform`}>
                      <span className="material-symbols-outlined text-3xl">{goal.icon}</span>
                    </div>
                  </div>
                  <h5 className="font-headline-sm text-headline-sm text-ink-primary mb-2">{goal.title}</h5>
                  <p className="font-body-sm text-body-sm text-ink-primary/70 mb-6">{goal.desc}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-label-sm font-label-sm">
                      <span>{goal.current}</span>
                      <span className="opacity-50">/ {goal.target}</span>
                    </div>
                    <div className="h-3 bg-surface-text-container rounded-full overflow-hidden border border-ink-primary/5">
                      <div className="h-full bg-surface-accent rounded-full shadow-[0_0_8px_rgba(245,199,199,0.8)]" style={{ width: `${goal.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              {/* Add New */}
              <button className="border-2 border-dashed border-ink-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/30 hover:border-ink-primary/50 transition-all group min-h-[220px]">
                <div className="w-14 h-14 rounded-full bg-white/50 flex items-center justify-center text-ink-primary/60 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">add</span>
                </div>
                <span className="font-label-md text-label-md text-ink-primary/70">Thêm mục tiêu mới</span>
              </button>
            </div>
          </section>

          {/* Quote */}
          <section className="py-stack-lg flex justify-center">
            <div className="max-w-2xl text-center space-y-4">
              <span className="material-symbols-outlined text-secondary text-4xl opacity-40">format_quote</span>
              <h4 className="font-headline-md text-headline-md text-ink-primary italic">&quot;Hạnh phúc không chỉ là điểm đến, mà là hành trình chúng mình cùng nhau chuẩn bị.&quot;</h4>
              <p className="font-label-md text-label-md text-ink-primary/50 uppercase tracking-widest">— Gửi người thương</p>
            </div>
          </section>
        </div>
      </main>

      <NavBar activeHref="/savings" />
    </div>
  );
};

export default PlansAndSavings;
