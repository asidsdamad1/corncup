"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { memories as defaultMemories } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";
import { CreateMemoryModal } from "./CreateMemoryModal";

export const MemoryJourneyOverview: React.FC = () => {
  const [localMemories, setLocalMemories] = useState(defaultMemories);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort memories by date descending
  const sortedMemories = [...localMemories].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Take top 2 for featured
  const featuredMemories = sortedMemories.slice(0, 2);
  // Rest for all albums
  const allMemories = sortedMemories; // In the design "Tất cả Album" shows all

  const totalPhotos = localMemories.reduce((sum, m) => sum + m.photos.length, 0);

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden selection:bg-surface-accent/30">
      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-stack-lg pb-32">
        {/* Header Section */}
        <header className="mb-stack-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg md:text-4xl text-ink-primary tracking-tight">
                Hành trình Kỷ niệm
              </h2>
              <p className="font-body-md text-body-md text-ink-primary opacity-70 mt-1">
                Nơi lưu giữ những khoảnh khắc đẹp nhất của đôi mình.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-surface-accent/40 backdrop-blur-sm border border-surface-accent px-4 py-2 rounded-full shadow-soft">
              <span
                className="material-symbols-outlined text-ink-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                explore
              </span>
              <span className="font-label-md text-label-md text-ink-primary">
                {localMemories.length} Chuyến đi
              </span>
            </div>
          </div>
        </header>

        {/* Featured Memories Section */}
        <section className="mb-12">
          <h3 className="font-headline-sm text-headline-sm text-ink-primary mb-6 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-surface-accent"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            Kỷ niệm nổi bật
          </h3>
          <div
            className="flex flex-row gap-6 overflow-x-auto pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 snap-x"
            style={{ scrollbarWidth: "none" }}
          >
            {featuredMemories.map((memory, i) => (
              <Link key={`feat-${memory.id}`} href={`/memories/${memory.id}`} className="block group">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-[65vw] md:min-w-[280px] md:w-[280px] aspect-[4/3] relative rounded-3xl overflow-hidden shadow-soft snap-center"
                >
                  <img
                    alt={memory.coverImageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={memory.coverImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/800x500/b2ccec/253558?text=Kỷ+niệm";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/90 via-ink-primary/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="font-label-sm text-label-sm bg-surface-accent text-ink-primary px-3 py-1 rounded-full mb-3 inline-block">
                      {new Date(memory.date).toLocaleDateString("vi-VN", {
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    <h4 className="font-headline-md text-white mb-2">{memory.title}</h4>
                    <p className="font-body-sm text-white/80 italic line-clamp-1">
                      &quot;{memory.quote}&quot;
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </section>

        {/* Artistic Grid Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-ink-primary">
              Tất cả Album
            </h3>
            <button className="text-ink-primary/60 hover:text-ink-primary transition-colors flex items-center gap-1 font-label-md">
              Xem thêm{" "}
              <span className="material-symbols-outlined text-sm">
                keyboard_arrow_right
              </span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence>
              {allMemories.map((memory, index) => {
                const isImageHeavy = index % 3 === 2; // Every 3rd item uses the overlay layout
                return (
                  <Link key={memory.id} href={`/memories/${memory.id}`} className="block group">
                    <motion.article
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        delay: 0.1 + (index % 6) * 0.05,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative bg-white/40 rounded-2xl overflow-hidden shadow-soft transition-all duration-300 hover:-translate-y-2 aspect-[3/4] md:aspect-square lg:aspect-[4/5]"
                    >
                      {isImageHeavy ? (
                        <div className="h-full relative overflow-hidden">
                          <img
                            alt={memory.coverImageAlt}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={memory.coverImage}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/400x500/b2ccec/253558?text=Ảnh";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-ink-primary/80 to-transparent">
                            <h4 className="font-label-md text-white">{memory.title}</h4>
                            <p className="text-[10px] text-white/70 mt-0.5">
                              {new Date(memory.date).toLocaleDateString("vi-VN", {
                                month: "2-digit",
                                year: "numeric",
                              })}{" "}
                              • {memory.photos.length} ảnh
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col">
                          <div className="h-[70%] overflow-hidden">
                            <img
                              alt={memory.coverImageAlt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              src={memory.coverImage}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://via.placeholder.com/400x350/b2ccec/253558?text=Ảnh";
                              }}
                            />
                          </div>
                          <div className="flex-1 p-4 bg-white/60 backdrop-blur-sm flex flex-col justify-between">
                            <div>
                              <h4 className="font-label-md text-ink-primary">
                                {memory.title}
                              </h4>
                              <p className="text-[10px] text-ink-primary/60 mt-0.5">
                                {new Date(memory.date).toLocaleDateString("vi-VN", {
                                  month: "2-digit",
                                  year: "numeric",
                                })}{" "}
                                • {memory.photos.length} ảnh
                              </p>
                            </div>
                            <p className="text-xs italic text-ink-primary/80 line-clamp-1">
                              &quot;{memory.quote}&quot;
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.article>
                  </Link>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* Emotional Journey Progress */}
        <section className="mt-32 mb-12 bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-soft relative">
          {/* Decorative Divider */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-1 bg-surface-accent/50 rounded-full"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-surface-accent rounded-2xl">
              <span
                className="material-symbols-outlined text-ink-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-ink-primary">
                Tiến độ Hành trình
              </h4>
              <p className="font-label-sm text-label-sm text-ink-primary/60">
                Cùng nhau viết tiếp câu chuyện tình yêu
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-label-md text-label-md text-ink-primary">
                  Khám phá 63 tỉnh thành
                </span>
                <span className="font-label-md text-label-md text-ink-primary">12/63</span>
              </div>
              <div className="h-4 bg-ink-primary/10 rounded-full overflow-hidden p-1">
                <motion.div
                  className="h-full bg-surface-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={mounted ? { width: "19%" } : { width: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <span className="font-label-md text-label-md text-ink-primary">
                  Kho ảnh kỷ niệm
                </span>
                <span className="font-label-md text-label-md text-ink-primary">
                  {totalPhotos}/1000
                </span>
              </div>
              <div className="h-4 bg-ink-primary/10 rounded-full overflow-hidden p-1">
                <motion.div
                  className="h-full bg-surface-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    mounted
                      ? { width: `${Math.min((totalPhotos / 1000) * 100, 100)}%` }
                      : { width: 0 }
                  }
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared NavBar */}
      <NavBar activeHref="/memories" />

      {/* FAB — Add Memory */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 md:right-8 w-14 h-14 bg-surface-accent text-ink-primary rounded-full shadow-lg shadow-ink-primary/20 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-40 border-4 border-background-main"
        aria-label="Thêm kỷ niệm mới"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Create Memory Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateMemoryModal
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={(newMemory) => {
              setLocalMemories((prev) => [newMemory, ...prev]);
              setIsCreateModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryJourneyOverview;
