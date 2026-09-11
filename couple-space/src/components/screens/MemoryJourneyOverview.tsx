"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";
import Meter from "@/components/ui/Meter";
import VietnamMap from "@/components/ui/VietnamMap";
import { CreateMemoryModal } from "./CreateMemoryModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { onImageError } from "@/lib/image";
import { addMemory, removeMemory, toggleFeatured, useMemories } from "@/lib/memoryStore";
import type { Memory } from "@/data/mockData";
import { PROVINCE_TARGET, REGION_LABEL, regionOf, resolveProvince } from "@/lib/provinces";
import type { RegionKey } from "@/lib/provinces";

const monthYear = (d: string) =>
  new Date(d).toLocaleDateString("vi-VN", { month: "2-digit", year: "numeric" });

/** Albums shown before "Xem thêm" takes over. */
const PAGE_SIZE = 3;

export const MemoryJourneyOverview: React.FC = () => {
  const memories = useMemories();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Memory | null>(null);

  const sortedMemories = useMemo(
    () => [...memories].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [memories]
  );

  /* "Nổi bật" is whatever the couple marked, not the newest two. */
  const featuredMemories = sortedMemories.filter((m) => m.featured);
  const restMemories = sortedMemories.filter((m) => !m.featured);
  const visibleMemories = showAll ? restMemories : restMemories.slice(0, PAGE_SIZE);

  const totalPhotos = memories.reduce((sum, m) => sum + m.photos.length, 0);
  const tripCount = memories.filter((m) => m.category === "travel").length;

  /** Provinces reached, derived from each memory's own `location`. */
  const { provinces, byRegion } = useMemo(() => {
    const found = new Set<string>();
    for (const m of memories) {
      const { province } = resolveProvince(m.location);
      if (province) found.add(province);
    }
    const buckets: Record<RegionKey, string[]> = { bac: [], trung: [], nam: [] };
    for (const p of found) {
      const r = regionOf(p);
      if (r) buckets[r].push(p);
    }
    return { provinces: [...found], byRegion: buckets };
  }, [memories]);

  const provincePct = Math.min((provinces.length / PROVINCE_TARGET) * 100, 100);

  return (
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary selection:bg-surface-accent/30">
      <main className="min-h-screen px-margin-mobile py-stack-lg pb-32 md:px-margin-desktop lg:ml-64">
        {/* ---------- Header ---------- */}
        <header className="mb-stack-lg">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="font-headline text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary -rotate-2">
                Duyên · Memory Timeline
              </p>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-ink-primary -rotate-[0.6deg]">
                Hành trình Kỷ niệm
              </h2>
              <p className="font-body-md text-body-md mt-2 max-w-[52ch] text-primary">
                Nơi lưu giữ những khoảnh khắc đẹp nhất của đôi mình.
              </p>
            </div>
            <span className="chip chip-accent flex-none">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
                suppressHydrationWarning
              >
                explore
              </span>
              {tripCount} Chuyến đi · {memories.length} Kỷ niệm
            </span>
          </div>
        </header>

        {/* ---------- Featured ---------- */}
        <section className="mb-12">
          <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-ink-primary">
            <span
              className="material-symbols-outlined text-surface-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
              suppressHydrationWarning
            >
              stars
            </span>
            Kỷ niệm nổi bật
          </h3>

          {featuredMemories.length > 0 ? (
            <div className="-mx-margin-mobile flex snap-x flex-row gap-6 overflow-x-auto px-margin-mobile pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
              {featuredMemories.map((memory, i) => (
                <motion.article
                  key={`feat-${memory.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i, 4) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative aspect-[4/3] min-w-[65vw] flex-none snap-center overflow-hidden rounded-3xl border-[2.2px] border-ink-primary shadow-soft md:w-[280px] md:min-w-[280px] ${
                    i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
                  }`}
                >
                  <Link href={`/memories/${memory.id}`} className="block h-full w-full">
                    <img
                      alt={memory.coverImageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={memory.coverImage}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      onError={onImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/90 via-ink-primary/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-5">
                      <span className="chip chip-accent mb-3">{monthYear(memory.date)}</span>
                      <h4 className="font-headline-md text-headline-md mb-1 text-paper">
                        {memory.title}
                      </h4>
                      <p className="font-body-sm text-body-sm line-clamp-1 italic text-paper/80">
                        &quot;{memory.quote}&quot;
                      </p>
                    </div>
                  </Link>

                  {/* The badge that was missing: says it is featured, and
                      un-marks it without leaving the page. */}
                  <button
                    type="button"
                    onClick={() => toggleFeatured(memory.id)}
                    className="absolute left-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-[2.2px] border-ink-primary bg-surface-accent shadow-[0_3px_0_var(--color-ink-primary)] transition-transform hover:-translate-y-0.5"
                    aria-label={`Bỏ đánh dấu nổi bật: ${memory.title}`}
                    title="Bỏ đánh dấu nổi bật"
                  >
                    <span
                      className="material-symbols-outlined text-[18px] text-ink-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      suppressHydrationWarning
                    >
                      star
                    </span>
                  </button>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="card card-dashed flex flex-col items-center gap-2 p-8 text-center">
              <span className="material-symbols-outlined text-3xl text-primary/50">star</span>
              <p className="font-body-sm text-body-sm text-primary">
                Chưa đánh dấu kỷ niệm nào là nổi bật. Mở một album rồi bấm ngôi sao ở góc trên
                bên phải.
              </p>
            </div>
          )}
        </section>

        {/* ---------- Map ---------- */}
        <section className="mb-12">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">
                Bản đồ hành trình
              </h3>
              <p className="font-body-sm text-body-sm mt-1 max-w-[46ch] text-primary">
                Suy ra từ địa điểm của từng kỷ niệm — không phải nhập tay.
              </p>
            </div>
            <span className="chip chip-soft flex-none self-start sm:self-auto">
              {provinces.length}/{PROVINCE_TARGET} tỉnh thành
            </span>
          </div>

          <VietnamMap memories={memories} />

          <div className="sheet mt-6 p-6">
            <div className="font-label-md text-label-md mb-3 flex justify-between text-ink-primary">
              <span>Đã đặt chân tới</span>
              <span>
                {provinces.length}/{PROVINCE_TARGET}
              </span>
            </div>
            <Meter value={provincePct} showValue={false} label="Số tỉnh thành đã đến" />

            <hr className="rule my-6" />

            <div className="grid gap-5 sm:grid-cols-3">
              {(Object.keys(byRegion) as RegionKey[]).map((key) => (
                <div key={key}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-headline-sm text-ink-primary">
                      {byRegion[key].length}
                    </span>
                    <span className="font-label-sm text-label-sm text-primary">
                      {REGION_LABEL[key]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {byRegion[key].length > 0 ? (
                      byRegion[key].map((p) => (
                        <span key={p} className="chip chip-blue">
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="font-body-sm text-body-sm text-primary/70">
                        chưa có kỷ niệm nào
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Remaining albums ---------- */}
        {restMemories.length > 0 && (
          <section>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="font-headline-sm text-headline-sm text-ink-primary">
                {featuredMemories.length > 0 ? "Các album khác" : "Tất cả Album"}
              </h3>
              {restMemories.length > PAGE_SIZE && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="font-label-md text-label-md flex items-center gap-1 text-primary transition-colors hover:text-ink-primary"
                >
                  {showAll ? "Thu gọn" : `Xem thêm (${restMemories.length - PAGE_SIZE})`}
                  <span
                    className={`material-symbols-outlined text-sm transition-transform ${
                      showAll ? "rotate-90" : ""
                    }`}
                  >
                    keyboard_arrow_right
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {visibleMemories.map((memory, index) => (
                <div key={memory.id} className="group relative">
                  <Link href={`/memories/${memory.id}`} className="block h-full">
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1 + (index % 6) * 0.05,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`mat flex h-full flex-col transition-transform duration-300 group-hover:-translate-y-1.5 ${
                        index % 2 ? "rotate-[0.8deg]" : "-rotate-[0.9deg]"
                      }`}
                    >
                      <div className="mat-inner aspect-[4/3] overflow-hidden">
                        <img
                          alt={memory.coverImageAlt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={memory.coverImage}
                          loading="lazy"
                          decoding="async"
                          onError={onImageError}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between gap-2 pt-3">
                        <div>
                          <h4 className="font-label-md text-label-md text-ink-primary">
                            {memory.title}
                          </h4>
                          <p className="font-headline mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-primary">
                            {monthYear(memory.date)} • {memory.photos.length} ảnh
                          </p>
                        </div>
                        {/* rating was stored on every memory and never shown */}
                        <div
                          className="flex items-center gap-0.5"
                          role="img"
                          aria-label={`Đánh giá ${memory.rating} trên 5`}
                        >
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`material-symbols-outlined text-[13px] ${
                                i < memory.rating ? "text-ink-primary" : "text-ink-primary/25"
                              }`}
                              style={{
                                fontVariationSettings: i < memory.rating ? "'FILL' 1" : "'FILL' 0",
                              }}
                              suppressHydrationWarning
                            >
                              star
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  </Link>

                  {/* Always visible, not hover-only: on a phone there is no
                      hover, and this is the screen where a mistyped album
                      shows up. The confirmation is what makes it safe. */}
                  <button
                    type="button"
                    onClick={() => setPendingDelete(memory)}
                    className="absolute right-1.5 top-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.2px] border-ink-primary bg-paper shadow-[0_2px_0_var(--color-ink-primary)] transition-transform hover:-translate-y-0.5"
                    aria-label={`Xoá kỷ niệm: ${memory.title}`}
                    title="Xoá kỷ niệm này"
                  >
                    <span className="material-symbols-outlined text-[17px] text-ink-primary">
                      delete
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------- Journey Progress ---------- */}
        <section className="sheet relative mb-12 mt-24 p-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
              <span
                className="material-symbols-outlined text-ink-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
                suppressHydrationWarning
              >
                favorite
              </span>
            </span>
            <div className="min-w-0">
              <h4 className="font-headline-sm text-headline-sm text-ink-primary">
                Tiến độ Hành trình
              </h4>
              <p className="font-label-sm text-label-sm text-primary">
                Cùng nhau viết tiếp câu chuyện tình yêu
              </p>
            </div>
          </div>

          <hr className="rule mb-6" />

          {/* The province meter lives with the map above; repeating it here
              would be the same number twice on one screen. */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="font-label-md text-label-md mb-3 flex justify-between text-ink-primary">
                <span>Kho ảnh kỷ niệm</span>
                <span>{totalPhotos}/1000</span>
              </div>
              <Meter
                value={Math.min((totalPhotos / 1000) * 100, 100)}
                showValue={false}
                label="Kho ảnh kỷ niệm"
              />
            </div>
            <div>
              <div className="font-label-md text-label-md mb-3 flex justify-between text-ink-primary">
                <span>Khoảnh khắc đã ghi lại</span>
                <span>{memories.reduce((s, m) => s + m.moments.length, 0)}</span>
              </div>
              <Meter
                value={Math.min(
                  (memories.reduce((s, m) => s + m.moments.length, 0) / 100) * 100,
                  100
                )}
                showValue={false}
                curve={1}
                label="Khoảnh khắc đã ghi lại"
              />
            </div>
          </div>
        </section>
      </main>

      <NavBar activeHref="/memories" />

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="btn btn-accent fixed bottom-28 right-6 z-40 h-14 w-14 rounded-full p-0 md:bottom-8 md:right-8"
        aria-label="Thêm kỷ niệm mới"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateMemoryModal
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={(newMemory) => {
              addMemory(newMemory);
              setIsCreateModalOpen(false);
            }}
          />
        )}
        {pendingDelete && (
          <ConfirmDialog
            title="Xoá cả kỷ niệm này?"
            subject={pendingDelete.title}
            body={`Cả ${pendingDelete.photos.length} ảnh và ${pendingDelete.moments.length} khoảnh khắc trong album sẽ mất theo.`}
            confirmLabel="Xoá kỷ niệm"
            onConfirm={() => {
              removeMemory(pendingDelete.id);
              setPendingDelete(null);
            }}
            onClose={() => setPendingDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryJourneyOverview;
