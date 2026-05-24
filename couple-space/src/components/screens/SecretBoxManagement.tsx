"use client";

import { useState } from "react";
import { secretNotes } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";

interface SecretBoxManagementProps {}

const lockedCapsules = [
  { title: "Lần đầu tiên...", desc: "Một lời hứa nhỏ cho tương lai của chúng mình tại Đà Lạt.", unlockLabel: "Mở khóa vào", unlockValue: "14/02/2025" },
  { title: "Gửi em năm 30 tuổi", desc: "Những suy nghĩ ngô nghê của anh lúc này gửi cho em sau này.", unlockLabel: "Đếm ngược", unlockValue: "426 ngày" },
  { title: "Điều bất ngờ cuối năm", desc: "Một kế hoạch bí mật cho chuyến đi kỷ niệm 2 năm.", unlockLabel: "Mở khóa vào", unlockValue: "31/12/2024" },
];

const unlockedMemories = [
  { title: "Bức thư tình đầu tiên", date: "Đã mở: 20/10/2023", preview: '"Anh vẫn nhớ như in ngày đầu mình gặp nhau tại quán cafe nhỏ ấy..."', liked: true },
  { title: "Lời chúc năm mới 2024", date: "Đã mở: 01/01/2024", preview: "Một năm trôi qua thật nhanh nhưng đầy ý nghĩa khi có em ở bên...", liked: false },
  { title: "Valentine đặc biệt", date: "Đã mở: 14/02/2024", preview: '"Không cần quà cáp xa xỉ, chỉ cần mình bên nhau thế này là đủ..."', liked: false },
];

export const SecretBoxManagement: React.FC<SecretBoxManagementProps> = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">


      {/* Main */}
      <main className="lg:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-10 pb-24 md:pb-10">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-ink-primary">Hộp thư bí mật</h2>
            <p className="font-body-md text-body-md text-on-primary-container mt-1 opacity-80">Nơi lưu giữ những điều chưa nói</p>
          </div>
          <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl flex items-center gap-2 font-label-md shadow-sm hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
            Tạo hộp mới
          </button>
        </header>

        {/* Waiting to Unlock */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-ink-primary">lock_clock</span>
            <h3 className="font-headline-sm text-headline-sm text-ink-primary">Đang chờ mở khóa</h3>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x" style={{ scrollbarWidth: "none" }}>
            {lockedCapsules.map((cap, i) => (
              <div key={i} className="snap-start min-w-[300px] rounded-xl p-6 flex flex-col items-center text-center group cursor-pointer hover:bg-white/50 transition-all"
                style={{ background: "rgba(255,255,255,0.4)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-ink-primary mb-2">{cap.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">{cap.desc}</p>
                <div className="mt-auto w-full py-3 bg-ink-primary/5 rounded-lg">
                  <p className="font-label-sm text-label-sm text-ink-primary uppercase tracking-widest">{cap.unlockLabel}</p>
                  <p className="font-headline-sm text-headline-sm text-primary mt-1">{cap.unlockValue}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unlocked Memories */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-ink-primary">drafts</span>
            <h3 className="font-headline-sm text-headline-sm text-ink-primary">Kỷ niệm đã mở</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-body-sm text-ink-primary shadow-sm"
                placeholder="Tìm kiếm kỷ niệm..."
                type="text"
              />
            </div>
            <div className="relative">
              <select className="appearance-none bg-surface-container-lowest border-none rounded-xl py-3 pl-4 pr-10 font-label-md text-ink-primary shadow-sm focus:ring-2 focus:ring-primary/20 w-full md:w-48">
                <option>Sắp xếp: Mới nhất</option>
                <option>Sắp xếp: Cũ nhất</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedMemories.filter((m) => m.title.toLowerCase().includes(search.toLowerCase())).map((mem, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-container to-surface-accent">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary mb-2">{mem.date}</span>
                  <h4 className="font-headline-sm text-headline-sm text-ink-primary mb-2">{mem.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">{mem.preview}</p>
                  {mem.liked && (
                    <div className="mt-auto pt-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      <span className="font-label-sm text-label-sm text-secondary">Yêu thích</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <NavBar activeHref="/secrets" />
    </div>
  );
};

export default SecretBoxManagement;
