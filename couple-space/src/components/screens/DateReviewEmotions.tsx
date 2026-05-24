"use client";

import { useState } from "react";
import NavBar from "@/components/ui/NavBar";

interface DateReviewEmotionsProps {}

export const DateReviewEmotions: React.FC<DateReviewEmotionsProps> = () => {
  const [foodRating, setFoodRating] = useState(4);
  const [priceRating, setPriceRating] = useState(3);
  const [vibeRating, setVibeRating] = useState(5);
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-background-main text-ink-primary font-body-md selection:bg-surface-accent selection:text-ink-primary">
      {/* SideNavBar */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-background-main border-r border-on-primary-container/10 py-stack-lg z-50">
        <div className="px-6 mb-10">
          <h1 className="font-headline-lg text-headline-lg text-ink-primary">Duyên</h1>
          <p className="font-label-md text-label-md text-on-primary-container/60">Digital Sanctuary</p>
        </div>
        <nav className="flex-1 space-y-2">
          <a className="flex items-center gap-3 text-on-primary-container hover:bg-white/20 px-4 py-3 mx-2 rounded-xl transition-colors" href="/">
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-md text-label-md">Home</span>
          </a>
          <a className="flex items-center gap-3 text-on-primary-container hover:bg-white/20 px-4 py-3 mx-2 rounded-xl transition-colors" href="/emotions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label-md text-label-md">Emotion Engine</span>
          </a>
          <a className="flex items-center gap-3 text-on-primary-container hover:bg-white/20 px-4 py-3 mx-2 rounded-xl transition-colors" href="/memories">
            <span className="material-symbols-outlined">timeline</span>
            <span className="font-label-md text-label-md">Memory Timeline</span>
          </a>
          <a className="flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-xl px-4 py-3 mx-2" href="/dates">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-md text-label-md">Date Planner</span>
          </a>
          <a className="flex items-center gap-3 text-on-primary-container hover:bg-white/20 px-4 py-3 mx-2 rounded-xl transition-colors" href="/plans">
            <span className="material-symbols-outlined">savings</span>
            <span className="font-label-md text-label-md">Shared Future</span>
          </a>
        </nav>
        <div className="mt-auto px-2 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 mb-4 bg-ink-primary text-white rounded-xl font-label-md text-label-md">
            <span className="material-symbols-outlined">add</span>
            New Memory
          </button>
          <a className="flex items-center gap-3 text-on-primary-container hover:bg-white/20 px-4 py-3 rounded-xl transition-colors" href="/settings">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </a>
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-margin-desktop h-16 md:ml-64 sticky top-0 z-40 bg-background-main/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="md:hidden material-symbols-outlined text-ink-primary">menu</span>
          <span className="font-headline-md text-headline-md font-bold text-ink-primary">Kế hoạch Hẹn hò</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-ink-primary cursor-pointer hover:opacity-70">notifications</span>
          <span className="material-symbols-outlined text-ink-primary cursor-pointer hover:opacity-70">favorite</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgjou473H9dQEuErnZIlFI5YxDENJp6lHjjq40R-jsJrSTWF1twtzCK6PG7O-eVw4vhMb-b2KsoRBTqKpWiwD38GvzsKWSJA2HG4e49DroQRJz6-hqScj20n-gir4PoUuP2l0sEMCfAyKH0m0a2uG1mFTM4Vz2gAr4aK60KxjRnCNepXfv_N5vlbfl1qaX7rKTxDxK1b3oQSzTOKthdnxmwuAyafCvr-P1ClBWx_2ugR9dasV4QBBfRC9OKxzF8WOiB7NSPgTBxBk"
            />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="md:ml-64 px-margin-mobile md:px-margin-desktop py-stack-lg pb-32">
        {/* Weekly Planner View */}
        <section className="mb-stack-lg">
          <div className="flex items-center justify-between mb-stack-md">
            <h2 className="font-headline-sm text-headline-sm text-ink-primary">Tuần này của chúng mình</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-3 overflow-x-auto pb-2">
            {[
              { day: "Thứ 2", num: 12, active: false },
              { day: "Thứ 3", num: 13, active: false },
              { day: "Thứ 4", num: 14, active: false },
              { day: "Thứ 5", num: 15, active: true },
              { day: "Thứ 6", num: 16, active: false },
              { day: "Thứ 7", num: 17, active: false },
              { day: "CN", num: 18, active: false },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[80px] transition-all ${
                  item.active ? "bg-surface-accent text-ink-primary soft-shadow ring-2 ring-surface-accent" : "bg-white/20"
                }`}
              >
                <span className="font-label-sm text-label-sm opacity-60">{item.day}</span>
                <span className="font-headline-sm text-headline-sm">{item.num}</span>
                {item.active && <div className="w-1.5 h-1.5 bg-ink-primary rounded-full mt-1" />}
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Active Date Card */}
          <div className="lg:col-span-8 space-y-gutter">
            <article className="bg-surface-accent rounded-[2rem] p-8 soft-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined text-[8rem]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  restaurant
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-ink-primary text-white rounded-full font-label-sm text-label-sm uppercase tracking-wider">Hôm nay</span>
                  <span className="font-label-md text-label-md text-ink-primary opacity-60">15 Tháng 5, 2024</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-ink-primary mb-6">Ăn Phở &amp; Cà phê sáng</h3>

                {/* Details */}
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
                    <span className="material-symbols-outlined">rate_review</span>
                    Đánh giá trải nghiệm
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {/* Food rating */}
                      <div className="flex justify-between items-center">
                        <span className="font-body-md text-body-md">Chất lượng món ăn</span>
                        <div className="flex gap-1 text-ink-primary">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => setFoodRating(star)}
                              className={`material-symbols-outlined cursor-pointer transition-colors ${
                                star <= foodRating ? "text-secondary" : "text-ink-primary/30"
                              }`}
                              style={{ fontVariationSettings: star <= foodRating ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              favorite
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price rating */}
                      <div className="flex justify-between items-center">
                        <span className="font-body-md text-body-md">Giá cả</span>
                        <div className="flex gap-1 text-ink-primary">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => setPriceRating(star)}
                              className={`material-symbols-outlined cursor-pointer transition-colors ${
                                star <= priceRating ? "text-secondary" : "text-ink-primary/30"
                              }`}
                              style={{ fontVariationSettings: star <= priceRating ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              favorite
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Vibe rating */}
                      <div className="flex justify-between items-center">
                        <span className="font-body-md text-body-md">Không gian (Vibe)</span>
                        <div className="flex gap-1 text-ink-primary">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => setVibeRating(star)}
                              className={`material-symbols-outlined cursor-pointer transition-colors ${
                                star <= vibeRating ? "text-secondary" : "text-ink-primary/30"
                              }`}
                              style={{ fontVariationSettings: star <= vibeRating ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              favorite
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-label-md text-label-md text-ink-primary opacity-60">Lời nhắn cho buổi hẹn</label>
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 min-h-[100px] border border-ink-primary/5">
                        <textarea
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          className="w-full bg-transparent border-none focus:ring-0 font-body-md text-body-md p-0 resize-none placeholder:text-ink-primary/30 outline-none"
                          placeholder="Chúng mình đã có một buổi sáng thật tuyệt..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post-date Emotions */}
                <div className="mt-8 pt-8 border-t border-ink-primary/10">
                  <h4 className="font-headline-sm text-headline-sm text-ink-primary mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">mood</span>
                    Cảm xúc sau buổi hẹn
                  </h4>
                  <div className="flex gap-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden bg-white/20">
                          <img
                            alt="Your avatar"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgjou473H9dQEuErnZIlFI5YxDENJp6lHjjq40R-jsJrSTWF1twtzCK6PG7O-eVw4vhMb-b2KsoRBTqKpWiwD38GvzsKWSJA2HG4e49DroQRJz6-hqScj20n-gir4PoUuP2l0sEMCfAyKH0m0a2uG1mFTM4Vz2gAr4aK60KxjRnCNepXfv_N5vlbfl1qaX7rKTxDxK1b3oQSzTOKthdnxmwuAyafCvr-P1ClBWx_2ugR9dasV4QBBfRC9OKxzF8WOiB7NSPgTBxBk"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center text-lg soft-shadow border border-ink-primary/5 shadow-sm">🥰</div>
                      </div>
                      <span className="font-label-md text-label-md text-ink-primary opacity-60">Của bạn</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-ink-primary opacity-40">person</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center text-lg soft-shadow border border-ink-primary/5 shadow-sm">✨</div>
                      </div>
                      <span className="font-label-md text-label-md text-ink-primary opacity-60">Của người ấy</span>
                    </div>
                  </div>
                </div>

                <button className="w-full md:w-auto px-10 py-4 mt-8 bg-ink-primary text-white rounded-full font-label-md text-label-md transition-transform active:scale-95 shadow-md">Lưu đánh giá</button>
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
              <button className="p-3 bg-white rounded-full text-ink-primary soft-shadow">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          </div>

          {/* Right Column: History List */}
          <div className="lg:col-span-4">
            <section className="bg-ink-primary rounded-[2rem] p-8 text-white h-full soft-shadow flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm mb-8 flex items-center gap-3 text-white">
                  <span className="material-symbols-outlined">history</span>
                  Lịch sử hẹn hò
                </h3>
                <div className="space-y-6">
                  {[
                    { title: "Đi dạo Hồ Tây", date: "10 Tháng 5", score: "4.8", width: "w-[96%]" },
                    { title: "Triển lãm Nghệ thuật", date: "03 Tháng 5", score: "4.5", width: "w-[90%]" },
                    { title: "Cooking Class tại gia", date: "28 Tháng 4", score: "5.0", width: "w-full" },
                    { title: "Camping Ba Vì", date: "15 Tháng 4", score: "4.2", width: "w-[84%]" },
                  ].map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-label-md text-label-md group-hover:text-surface-accent transition-colors">{item.title}</h5>
                          <p className="font-body-sm text-body-sm opacity-50">{item.date}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                          <span className="font-label-sm text-label-sm">{item.score}</span>
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            favorite
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className={`bg-surface-accent h-full ${item.width}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mt-12 rounded-2xl overflow-hidden aspect-square border-2 border-white/10">
                  <img
                    alt="Couple memory"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuANnSjdw2itKW6qvJOk_6ykcfeteb2wMcgB2weK3T5h0DoJDYMcN0ro2uxjc9ehvOCvElw6bjQenyMP5-MqKgBtNiXFWiciEWLd6x9SqO_cU7M-8NKiCrW8AuoJ6O02ZfmWvR8xCMxxcGfQMLMkpH6tHLjGVQKODMj17e_19lbc7Sv9cUu4gJ7A9GrXip8BN8mDfv3Au7wSmNeWvXM-4ja3h8wYkgTPjKrSS1zlTCD8yRTLLS2bhWAQJt1Fw66jxirFxr_Vg1RnFIM"
                  />
                </div>
                <p className="mt-6 text-center font-body-sm text-body-sm opacity-40 italic">&quot;Mỗi buổi hẹn là một mảnh ghép của hạnh phúc.&quot;</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-8 w-14 h-14 bg-surface-accent text-ink-primary rounded-full soft-shadow flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50">
        <span className="material-symbols-outlined text-[32px]">calendar_add_on</span>
      </button>

      <NavBar activeHref="/dates" />
    </div>
  );
};

export default DateReviewEmotions;
