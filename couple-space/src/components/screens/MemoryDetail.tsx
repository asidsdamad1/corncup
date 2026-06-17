"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memories, memoryCategoryLabels } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";
import { Portal } from "@/components/ui/Portal";

interface MemoryDetailProps {
  readonly memoryId?: string;
}

export const MemoryDetail: React.FC<MemoryDetailProps> = ({ memoryId = "1" }) => {
  const memory = memories.find((m) => m.id === memoryId) ?? memories[0];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : memory.photos.length - 1));
  }, [lightboxIndex, memory.photos.length]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < memory.photos.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, memory.photos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goPrev, goNext]);

  // Touch swipe state for lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev();
      else goNext();
    }
    setTouchStart(null);
  };

  if (!memory) {
    return (
      <div className="min-h-screen bg-background-main flex items-center justify-center">
        <p className="text-body-md text-on-surface-variant">Không tìm thấy kỷ niệm này.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src={memory.coverImage}
          alt={memory.coverImageAlt}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/800x400/b2ccec/253558?text=Kỷ+niệm";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-primary/20 via-transparent to-ink-primary/80" />

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-6 left-6 lg:left-[calc(16rem+1.5rem)] w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors z-10"
        >
          <span className="material-symbols-outlined text-white">arrow_back</span>
        </button>

        {/* Hero info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:pl-[calc(16rem+2.5rem)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-label-sm font-label-sm mb-3">
            <span className="material-symbols-outlined text-[14px]">
              {memory.category === "travel" ? "flight" : memory.category === "daily" ? "coffee" : "favorite"}
            </span>
            {memoryCategoryLabels[memory.category]}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-white mb-2">
            {memory.title}
          </h1>
          <div className="flex items-center gap-3 text-white/70 text-body-sm font-body-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {new Date(memory.date).toLocaleDateString("vi-VN", {
                month: "long",
                year: "numeric",
              })}
            </span>
            {memory.location && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  {memory.location}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="lg:ml-64 px-margin-mobile md:px-margin-desktop pb-32 md:pb-10 -mt-4 relative z-10">
        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface-accent rounded-[1.5rem] p-6 md:p-8 mb-stack-lg shadow-soft relative overflow-hidden"
        >
          <div className="absolute -top-3 -left-3 opacity-10">
            <span className="material-symbols-outlined text-[80px]">format_quote</span>
          </div>
          <p className="text-body-lg font-body-lg text-ink-primary italic text-center leading-relaxed relative z-10">
            &quot;{memory.quote}&quot;
          </p>
          <div className="flex justify-center mt-4">
            <span
              className="material-symbols-outlined text-ink-primary/30"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
        </motion.section>

        {/* Photo Gallery */}
        {memory.photos.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-stack-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-headline-sm text-headline-sm text-ink-primary">Kho ảnh</h2>
              <span className="px-3 py-1 bg-surface-accent/50 rounded-full text-label-sm font-label-sm text-ink-primary">
                {memory.photos.length} ảnh
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {memory.photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={mounted ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x300/b2ccec/253558?text=Ảnh";
                    }}
                  />
                  <div className="absolute inset-0 bg-ink-primary/0 group-hover:bg-ink-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      zoom_in
                    </span>
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-primary/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-label-sm font-label-sm">{photo.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Moments Timeline */}
        {memory.moments.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-stack-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-headline-sm text-headline-sm text-ink-primary">Kỷ niệm</h2>
              <span className="px-3 py-1 bg-surface-accent/50 rounded-full text-label-sm font-label-sm text-ink-primary">
                {memory.moments.length} khoảnh khắc
              </span>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-outline-variant/30" />

              <div className="space-y-1">
                {memory.moments.map((moment, i) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={mounted ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                    className="flex gap-4 relative py-3"
                  >
                    {/* Timeline dot */}
                    <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center flex-shrink-0 relative z-10 shadow-card">
                      <span
                        className="material-symbols-outlined text-ink-primary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {moment.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-surface-text-container rounded-2xl p-4 shadow-card">
                      <p className="text-label-sm font-label-sm text-on-surface-variant mb-1">
                        {moment.time}
                      </p>
                      <p className="text-body-md text-ink-primary leading-relaxed">
                        {moment.content}
                      </p>
                      {moment.photo && (
                        <div className="mt-3 rounded-xl overflow-hidden h-32">
                          <img
                            src={moment.photo}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-accent text-ink-primary rounded-2xl font-label-md hover:scale-[1.02] active:scale-95 transition-all shadow-soft">
            <span className="material-symbols-outlined">add_a_photo</span>
            Thêm ảnh
          </button>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-ink-primary text-white rounded-2xl font-label-md hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-ink-primary/20">
            <span className="material-symbols-outlined">edit_note</span>
            Thêm kỷ niệm
          </button>
        </div>
      </main>

      {/* NavBar */}
      <NavBar activeHref="/memories" />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && memory.photos[lightboxIndex] && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-ink-primary/95 flex items-center justify-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>

              {/* Index */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm z-10">
                <span className="text-white text-label-md font-label-md">
                  {lightboxIndex + 1} / {memory.photos.length}
                </span>
              </div>

              {/* Nav Arrows */}
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10 hidden md:flex"
              >
                <span className="material-symbols-outlined text-white">chevron_left</span>
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-10 hidden md:flex"
              >
                <span className="material-symbols-outlined text-white">chevron_right</span>
              </button>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={memory.photos[lightboxIndex].url}
                  alt={memory.photos[lightboxIndex].alt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x600/253558/ffffff?text=Ảnh";
                  }}
                />
              </AnimatePresence>

              {/* Caption */}
              {memory.photos[lightboxIndex].caption && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <p className="text-white text-body-sm font-body-sm">
                    {memory.photos[lightboxIndex].caption}
                  </p>
                </div>
              )}
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryDetail;
