"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { onImageError, aspectOf } from "@/lib/image";
import type { MemoryPhoto } from "@/data/mockData";

interface PhotoGridProps {
  readonly photos: readonly MemoryPhoto[];
  /** Target row height. Rows end up near this, never exactly — that is the point. */
  readonly rowHeight?: number;
  /**
   * Remove one photo by id. Omit it and the delete control is not rendered
   * at all, so a read-only gallery stays read-only.
   */
  readonly onDelete?: (photoId: string) => void;
}

/**
 * Photos in justified rows, plus the lightbox that opens from them.
 *
 * The layout is pure CSS (see `.jr` in globals.css): no measuring, no
 * ResizeObserver, and it renders correctly on the server. Every photo
 * keeps its own proportions — a square grid would crop the sky off a
 * landscape and the feet off a portrait.
 */
export function PhotoGrid({ photos, rowHeight = 210, onDelete }: PhotoGridProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    setConfirming(false);
    // Send focus back where it came from, or the keyboard user is stranded.
    openerRef.current?.focus();
  }, []);

  const goPrev = useCallback(() => {
    setLoaded(false);
    setIndex((p) => (p === null ? p : p > 0 ? p - 1 : photos.length - 1));
  }, [photos.length]);

  const goNext = useCallback(() => {
    setLoaded(false);
    setIndex((p) => (p === null ? p : p < photos.length - 1 ? p + 1 : 0));
  }, [photos.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (confirming) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, goPrev, goNext, confirming]);

  // Warm the neighbours so paging does not stare at an empty frame.
  useEffect(() => {
    if (index === null) return;
    [index - 1, index + 1].forEach((i) => {
      const p = photos[(i + photos.length) % photos.length];
      if (p) {
        const img = new Image();
        img.src = p.url;
      }
    });
  }, [index, photos]);

  /**
   * Delete the photo on screen, then decide what to look at next.
   *
   * Holding the index still shows the photo that shuffled up into this
   * slot, which is what you want when clearing several in a row. The two
   * edge cases are the last photo in the album (nothing left to show, so
   * close) and the last photo in the list (no slot above, so step back).
   */
  const deleteCurrent = () => {
    if (index === null || !onDelete) return;
    const remaining = photos.length - 1;
    onDelete(photos[index].id);
    setConfirming(false);
    if (remaining === 0) {
      close();
      return;
    }
    setLoaded(false);
    setIndex((p) => Math.min(p ?? 0, remaining - 1));
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 60) (dx > 0 ? goPrev : goNext)();
    setTouchStart(null);
  };

  if (photos.length === 0) return null;

  const current = index === null ? null : photos[index];

  return (
    <>
      <div
        className="jr"
        style={{ ["--jr-h" as string]: `${rowHeight}px`, ["--jr-gap" as string]: "0.75rem" }}
      >
        {photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i, 8) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ ["--ar" as string]: aspectOf(photo).toFixed(4) }}
            onClick={(e) => {
              openerRef.current = e.currentTarget;
              setLoaded(false);
              setIndex(i);
            }}
            aria-label={`Xem ảnh: ${photo.alt}`}
            className={`mat group block cursor-zoom-in text-left transition-transform duration-300 hover:-translate-y-1.5 ${
              i % 2 ? "rotate-[0.5deg]" : "-rotate-[0.6deg]"
            }`}
          >
            <div className="mat-inner jr-frame">
              <img
                src={photo.url}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
                onError={onImageError}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink-primary/0 transition-colors duration-300 group-hover:bg-ink-primary/20">
                <span className="material-symbols-outlined text-3xl text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  zoom_in
                </span>
              </span>
            </div>
            {photo.caption && (
              <p className="font-label-sm text-label-sm mt-2 truncate text-primary">
                {photo.caption}
              </p>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={current.alt}
              className="fixed inset-0 z-[300] flex items-center justify-center bg-ink-primary/95"
              onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
              onTouchEnd={onTouchEnd}
            >
              <button
                onClick={close}
                className="btn btn-icon absolute right-6 top-6 z-10"
                aria-label="Đóng"
                autoFocus
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {onDelete && (
                <button
                  onClick={() => setConfirming(true)}
                  className="btn btn-icon absolute right-20 top-6 z-10"
                  aria-label={`Xoá ảnh: ${current.alt}`}
                  title="Xoá ảnh này"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )}

              <div className="absolute left-1/2 top-6 z-10 -translate-x-1/2">
                <span className="chip">
                  {(index ?? 0) + 1} / {photos.length}
                </span>
              </div>

              {photos.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="btn btn-icon absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
                    aria-label="Ảnh trước"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={goNext}
                    className="btn btn-icon absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
                    aria-label="Ảnh sau"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.22 }}
                  /* The mat hugs the photo instead of the photo filling the
                     mat — otherwise a portrait shot sits in a landscape box
                     with the mount's gradient showing as bars beside it. */
                  className="mat relative -rotate-[0.6deg]"
                  style={{ maxWidth: "88vw", maxHeight: "80vh" }}
                >
                  {!loaded && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined animate-spin text-2xl text-primary">
                        progress_activity
                      </span>
                    </span>
                  )}
                  <img
                    src={current.url}
                    alt={current.alt}
                    width={current.width}
                    height={current.height}
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={(e) => {
                      setLoaded(true);
                      onImageError(e);
                    }}
                    className="mat-inner block h-auto w-auto"
                    style={{ maxWidth: "86vw", maxHeight: "76vh" }}
                  />
                </motion.div>
              </AnimatePresence>

              {current.caption && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4">
                  <span className="chip">{current.caption}</span>
                </div>
              )}
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirming && current && (
          <ConfirmDialog
            title="Xoá tấm ảnh này?"
            subject={current.caption || current.alt}
            body="Ảnh sẽ bị gỡ khỏi kho ảnh của kỷ niệm này."
            confirmLabel="Xoá ảnh"
            onConfirm={deleteCurrent}
            onClose={() => setConfirming(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default PhotoGrid;
