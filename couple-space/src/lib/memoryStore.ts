"use client";

import { useSyncExternalStore } from "react";
import { memories as seedMemories } from "@/data/mockData";
import type { Memory, MemoryMoment, MemoryPhoto } from "@/data/mockData";

/**
 * A tiny shared store for memories.
 *
 * Why this exists: marking a memory as featured, adding photos and adding
 * moments all happen on the detail screen, but the overview has to see the
 * result. Component-local `useState` cannot do that — each route would hold
 * its own copy and the two would drift apart the moment you navigated.
 *
 * Still in memory only: a refresh resets to the seed data. Persistence is a
 * separate job (a Server Action writing through Prisma); this just stops the
 * UI from lying about what it has.
 */

interface State {
  readonly memories: readonly Memory[];
  /** Provinces saved as "somewhere we want to go". */
  readonly wishlist: readonly string[];
}

let state: State = { memories: seedMemories, wishlist: [] };

const listeners = new Set<() => void>();

function setState(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Must return a stable reference or useSyncExternalStore loops forever.
const getSnapshot = () => state;

export function useMemories(): readonly Memory[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot).memories;
}

export function useMemory(id: string): Memory | undefined {
  const list = useMemories();
  return list.find((m) => m.id === id);
}

export function useWishlist(): readonly string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot).wishlist;
}

/* ---------------- mutations ---------------- */

const replace = (id: string, fn: (m: Memory) => Memory) =>
  setState({
    ...state,
    memories: state.memories.map((m) => (m.id === id ? fn(m) : m)),
  });

export function addMemory(memory: Memory) {
  setState({ ...state, memories: [memory, ...state.memories] });
}

/**
 * Every add above has a matching remove below.
 *
 * Without them a mistyped album or a photo added to the wrong trip is stuck
 * there for good, and the screen slowly fills with rubbish nobody can clear.
 * These are hard deletes with no undo, so each one is behind a confirmation
 * in the UI (see ConfirmDialog).
 */
export function removeMemory(id: string) {
  setState({ ...state, memories: state.memories.filter((m) => m.id !== id) });
}

export function removePhoto(id: string, photoId: string) {
  replace(id, (m) => ({ ...m, photos: m.photos.filter((p) => p.id !== photoId) }));
}

export function removeMoment(id: string, momentId: string) {
  replace(id, (m) => ({ ...m, moments: m.moments.filter((x) => x.id !== momentId) }));
}

/** Featured is a deliberate mark, never inferred from a date or a score. */
export function toggleFeatured(id: string) {
  replace(id, (m) => ({ ...m, featured: !m.featured }));
}

export function addPhotos(id: string, photos: readonly MemoryPhoto[]) {
  replace(id, (m) => ({ ...m, photos: [...m.photos, ...photos] }));
}

export function addMoment(id: string, moment: MemoryMoment) {
  replace(id, (m) => ({
    ...m,
    // Keep the timeline in clock order rather than insertion order.
    moments: [...m.moments, moment].sort((a, b) => a.time.localeCompare(b.time)),
  }));
}

export function toggleWishlist(province: string) {
  const has = state.wishlist.includes(province);
  setState({
    ...state,
    wishlist: has
      ? state.wishlist.filter((p) => p !== province)
      : [...state.wishlist, province],
  });
}
