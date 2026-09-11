import type { SyntheticEvent } from "react";

/**
 * Shared image helpers.
 *
 * The fallback lives in /public, not on a third-party placeholder service:
 * an error image that itself needs the network is no fallback at all.
 */
export const PHOTO_FALLBACK = "/photo-fallback.svg";

/**
 * Swap in the local fallback, but only once.
 *
 * Assigning `src` always restarts the image load, even when the value is
 * unchanged — so an unguarded handler whose fallback also fails will spin
 * error → assign → error forever. The data-attribute latch breaks that.
 */
export function onImageError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "1";
  img.src = PHOTO_FALLBACK;
}

/** Aspect ratio for layout, falling back to 3:2 when a photo has no stored size. */
export const DEFAULT_ASPECT = 1.5;

export function aspectOf(p: { width?: number; height?: number }): number {
  if (!p.width || !p.height) return DEFAULT_ASPECT;
  return p.width / p.height;
}

/** Read a File's real pixel dimensions so layout can be computed without measuring the DOM. */
export function readImageSize(
  objectUrl: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    // A file we cannot decode still gets a usable ratio rather than breaking the row maths.
    img.onerror = () => resolve({ width: 1200, height: 800 });
    img.src = objectUrl;
  });
}
