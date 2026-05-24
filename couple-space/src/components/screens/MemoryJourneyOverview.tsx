"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { memories } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";

interface MemoryJourneyOverviewProps {}

type FilterTag = "Tất cả" | "Du lịch" | "Hằng ngày" | "Lãng mạn";

export const MemoryJourneyOverview: React.FC<MemoryJourneyOverviewProps> = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("Tất cả");
  const filters: FilterTag[] = ["Tất cả", "Du lịch", "Hằng ngày", "Lãng mạn"];

  const filtered = activeFilter === "Tất cả"
    ? memories
    : memories.filter((m) => m.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-background-main selection:bg-surface-accent/30 font-body-md text-on-background">
      {/* Side Navigation Bar (Desktop) */}
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-background-main border-r border-on-primary-fixed/10 p-stack-md space-y-stack-md z-50">
        <div className="mb-stack-lg px-2 pt-4">
          <h1 className="font-headline-md text-headline-md text-on-primary-fixed">Duyên</h1>
          <p className="font-label-sm text-label-sm text-on-primary-fixed opacity-70">Digital Sanctuary</p>
        </div>
        <div className="flex flex-col space-y-2">
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed/80 hover:bg-surface-accent/50 rounded-xl transition-all duration-200" href="/emotions">
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label-md text-label-md">Emotions</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 bg-surface-accent text-on-primary-fixed rounded-xl font-bold shadow-sm translate-x-1 duration-200" href="/memories">
            <span className="material-symbols-outlined">timeline</span>
            <span className="font-label-md text-label-md">Hành trình</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed/80 hover:bg-surface-accent/50 rounded-xl transition-all duration-200" href="/plans">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-label-md text-label-md">Future</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed/80 hover:bg-surface-accent/50 rounded-xl transition-all duration-200" href="/dates">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-md text-label-md">Dates</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-primary-fixed/80 hover:bg-surface-accent/50 rounded-xl transition-all duration-200" href="/secrets">
            <span className="material-symbols-outlined">lock</span>
            <span className="font-label-md text-label-md">Secrets</span>
          </a>
        </div>
        <div className="mt-auto flex items-center gap-3 p-2 bg-surface-container-low rounded-xl">
          <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">diversity_1</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate">Chúng mình</p>
            <p className="text-[10px] opacity-60">Couple Avatar</p>
          </div>
        </div>
      </nav>

      {/* Top AppBar (Mobile) */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-4 bg-background-main sticky top-0 z-50">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary-fixed italic">Duyên</h1>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-on-primary-fixed">notifications</span>
          <span className="material-symbols-outlined text-on-primary-fixed">account_circle</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="md:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-stack-lg pb-24 md:pb-8">
        {/* Header Section */}
        <header className="mb-stack-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-ink-primary">Hành trình tình yêu</h2>
              <p className="font-body-md text-body-md text-primary opacity-80 mt-1">Ghi dấu những bước chân ta cùng đi qua.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-surface-accent px-4 py-2 rounded-full soft-shadow">
              <span className="material-symbols-outlined text-ink-primary" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              <span className="font-label-md text-label-md text-ink-primary">{memories.length} Chuyến đi</span>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-2 mb-stack-md overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-label-md whitespace-nowrap transition-all ${
                activeFilter === f
                  ? "bg-ink-primary text-on-primary"
                  : "bg-surface-text-container text-ink-primary hover:bg-surface-container-high"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bento Grid / Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filtered.map((memory, i) => (
            <motion.article
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-surface rounded-xl overflow-hidden soft-shadow transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={memory.coverImage}
                  alt={memory.coverImageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x300/b2ccec/253558?text=K%E1%BB%B7+ni%E1%BB%87m";
                  }}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="font-label-sm text-label-sm text-primary">
                    {new Date(memory.date).toLocaleDateString("vi-VN", { month: "2-digit", year: "numeric" })}
                  </span>
                </div>
              </div>
              <div className="p-5 border-b border-outline-variant/10">
                <h3 className="font-headline-sm text-headline-sm text-ink-primary mb-2">{memory.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant italic line-clamp-2 leading-relaxed">
                  &quot;{memory.quote}&quot;
                </p>
              </div>
              <div className="p-4 bg-surface-container-low flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-fixed overflow-hidden">
                    <span className="material-symbols-outlined text-xs flex items-center justify-center h-full">person</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary-fixed overflow-hidden">
                    <span className="material-symbols-outlined text-xs flex items-center justify-center h-full">person_4</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-primary/40 group-hover:text-primary transition-colors">arrow_forward</span>
              </div>
            </motion.article>
          ))}

          {/* Add New Memory Card */}
          <button className="group relative min-h-[300px] bg-white/20 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center transition-all hover:bg-white/40 hover:border-primary/50 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-surface-accent flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-ink-primary text-3xl">add</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-ink-primary">Thêm kỷ niệm mới</span>
            <p className="font-body-sm text-body-sm text-primary mt-2 opacity-70">Ghi lại chương tiếp theo của chúng mình</p>
          </button>
        </section>

        {/* Progress Section */}
        <section className="mt-stack-lg bg-surface-text-container/80 backdrop-blur-md rounded-2xl p-6 border border-on-primary-fixed/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-secondary-container rounded-xl">
              <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-ink-primary">Tiến độ Hành trình</h4>
              <p className="font-label-sm text-label-sm text-on-surface-variant">Thành tựu cặp đôi tháng này</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">Khám phá 63 tỉnh thành</span>
                <span className="font-label-md text-label-md text-primary">12/63</span>
              </div>
              <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-surface-accent transition-all duration-1000" style={{ width: "19%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-label-md text-label-md text-primary">Kho ảnh kỷ niệm</span>
                <span className="font-label-md text-label-md text-primary">840/1000</span>
              </div>
              <div className="h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-surface-accent transition-all duration-1000" style={{ width: "84%" }} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <NavBar activeHref="/memories" />
    </div>
  );
};

export default MemoryJourneyOverview;
