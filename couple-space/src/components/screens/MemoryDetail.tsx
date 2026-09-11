"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { memoryCategoryLabels } from "@/data/mockData";
import type { MemoryMoment } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";
import PhotoGrid from "@/components/ui/PhotoGrid";
import { AddPhotosModal } from "./AddPhotosModal";
import { AddMomentModal } from "./AddMomentModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { onImageError } from "@/lib/image";
import { resolveProvince } from "@/lib/provinces";
import {
  addMoment,
  addPhotos,
  removeMemory,
  removeMoment,
  removePhoto,
  toggleFeatured,
  useMemory,
} from "@/lib/memoryStore";

interface MemoryDetailProps {
  readonly memoryId?: string;
}

const CATEGORY_ICON = { travel: "flight", daily: "coffee", romantic: "favorite" } as const;

export const MemoryDetail: React.FC<MemoryDetailProps> = ({ memoryId = "1" }) => {
  const memory = useMemory(memoryId);
  const router = useRouter();
  const [photosOpen, setPhotosOpen] = useState(false);
  const [momentOpen, setMomentOpen] = useState(false);
  const [confirmMemory, setConfirmMemory] = useState(false);
  const [pendingMoment, setPendingMoment] = useState<MemoryMoment | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* An unknown id used to fall through to `memories[0]`, so a bad link
     quietly showed a different couple's trip as if it were the right one.
     Showing nothing is the honest answer. */
  if (!memory) {
    /* We deleted it a moment ago and the route is already on its way out;
       the card below would flash a false error on the way. */
    if (deleting) return null;

    return (
      <div className="min-h-screen font-body-md text-ink-primary">
        <main className="flex min-h-screen flex-col items-center justify-center px-margin-mobile pb-32 text-center lg:ml-64">
          <div className="card card-flat max-w-md p-10">
            <span className="material-symbols-outlined text-5xl text-primary/50">
              search_off
            </span>
            <h1 className="font-headline-md text-headline-md mt-3 text-ink-primary">
              Không tìm thấy kỷ niệm này
            </h1>
            <p className="font-body-md text-body-md mt-2 text-primary">
              Kỷ niệm với mã <span className="text-ink-primary">{memoryId}</span> không tồn tại,
              hoặc đã bị xoá.
            </p>
            <Link href="/memories" className="btn btn-accent mt-6 inline-flex">
              <span className="material-symbols-outlined">arrow_back</span>
              Về Hành trình Kỷ niệm
            </Link>
          </div>
        </main>
        <NavBar activeHref="/memories" />
      </div>
    );
  }

  const { province } = resolveProvince(memory.location);

  return (
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
      {/* ---------- Hero ---------- */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src={memory.coverImage}
          alt={memory.coverImageAlt}
          className="h-full w-full object-cover"
          /* The hero is the largest-contentful paint — never lazy. */
          fetchPriority="high"
          decoding="async"
          onError={onImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-primary/20 via-transparent to-ink-primary/80" />

        <button
          onClick={() => window.history.back()}
          className="btn btn-icon absolute left-6 top-6 z-10 lg:left-[calc(16rem+1.5rem)]"
          aria-label="Quay lại"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="absolute right-6 top-6 z-10 flex items-center gap-2">
          {/* Marking a memory as one of "ours" is a deliberate act, so the
              control lives on the memory itself. */}
          <button
            onClick={() => toggleFeatured(memory.id)}
            aria-pressed={Boolean(memory.featured)}
            className={`btn btn-icon ${
              memory.featured ? "bg-surface-accent" : ""
            }`}
            aria-label={memory.featured ? "Bỏ đánh dấu nổi bật" : "Đánh dấu là kỷ niệm nổi bật"}
            title={memory.featured ? "Bỏ đánh dấu nổi bật" : "Đánh dấu là kỷ niệm nổi bật"}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: memory.featured ? "'FILL' 1" : "'FILL' 0" }}
              suppressHydrationWarning
            >
              star
            </span>
          </button>

          {/* Deleting the whole album belongs here rather than on a grid
              tile: this is the screen that shows you everything that goes
              with it. */}
          <button
            type="button"
            onClick={() => setConfirmMemory(true)}
            className="btn btn-icon"
            aria-label={`Xoá kỷ niệm: ${memory.title}`}
            title="Xoá kỷ niệm này"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:pl-[calc(16rem+2.5rem)]">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="chip">
              <span className="material-symbols-outlined text-[14px]">
                {CATEGORY_ICON[memory.category]}
              </span>
              {memoryCategoryLabels[memory.category]}
            </span>
            {memory.featured && (
              <span className="chip chip-accent">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  suppressHydrationWarning
                >
                  star
                </span>
                Nổi bật
              </span>
            )}
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-2 text-paper -rotate-[0.6deg]">
            {memory.title}
          </h1>
          <div className="font-body-sm text-body-sm flex flex-wrap items-center gap-3 text-paper/80">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {new Date(memory.date).toLocaleDateString("vi-VN", {
                month: "long",
                year: "numeric",
              })}
            </span>
            {memory.location && (
              <>
                <span className="h-1 w-1 rounded-full bg-paper/50" />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span>
                  {memory.location}
                  {province && province !== memory.location && (
                    <span className="opacity-70">· {province}</span>
                  )}
                </span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Main ---------- */}
      <main className="relative z-10 -mt-4 px-margin-mobile pb-32 md:px-margin-desktop md:pb-10 lg:ml-64">
        {/* Quote */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card card-accent card-flat mb-stack-lg p-6 md:p-8"
        >
          <span className="material-symbols-outlined mb-2 text-3xl text-ink-primary/40">
            format_quote
          </span>
          <div className="ruled">
            <p className="italic text-ink-primary">&quot;{memory.quote}&quot;</p>
          </div>

          <hr className="rule my-5" />

          {/* rating and tags were stored on every memory but never shown */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              className="flex items-center gap-1"
              role="img"
              aria-label={`Đánh giá ${memory.rating} trên 5`}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[19px] ${
                    i < memory.rating ? "text-ink-primary" : "text-ink-primary/25"
                  }`}
                  style={{ fontVariationSettings: i < memory.rating ? "'FILL' 1" : "'FILL' 0" }}
                  suppressHydrationWarning
                >
                  star
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {memory.tags.map((tag) => (
                <span key={tag} className="chip chip-soft">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Photo gallery — justified rows, nothing cropped */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-stack-lg"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="font-headline-sm text-headline-sm text-ink-primary">Kho ảnh</h2>
            {memory.photos.length > 0 && (
              <>
                <span className="chip chip-soft">{memory.photos.length} ảnh</span>
                <button
                  onClick={() => setPhotosOpen(true)}
                  className="btn btn-sm ml-auto"
                  type="button"
                >
                  <span className="material-symbols-outlined">add_a_photo</span>
                  Thêm ảnh
                </button>
              </>
            )}
          </div>

          {memory.photos.length > 0 ? (
            <PhotoGrid
              photos={memory.photos}
              onDelete={(photoId) => removePhoto(memory.id, photoId)}
            />
          ) : (
            /* An album with no photos is the moment to invite one, not a
               section that quietly disappears. */
            <div className="card card-dashed flex flex-col items-center justify-center gap-3 p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-primary/50">
                add_photo_alternate
              </span>
              <div>
                <p className="font-label-md text-label-md text-ink-primary">
                  Chưa có tấm ảnh nào ở đây
                </p>
                <p className="font-body-sm text-body-sm mt-1 text-primary">
                  Thêm vài tấm để kỷ niệm này có hình hài.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPhotosOpen(true)}
                className="btn btn-accent btn-sm mt-1"
              >
                <span className="material-symbols-outlined">add_a_photo</span>
                Thêm ảnh đầu tiên
              </button>
            </div>
          )}
        </motion.section>

        {/* Moments Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-stack-lg"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h2 className="font-headline-sm text-headline-sm text-ink-primary">Khoảnh khắc</h2>
            {memory.moments.length > 0 && (
              <span className="chip chip-soft">{memory.moments.length} khoảnh khắc</span>
            )}
            <button onClick={() => setMomentOpen(true)} className="btn btn-sm ml-auto" type="button">
              <span className="material-symbols-outlined">edit_note</span>
              Thêm khoảnh khắc
            </button>
          </div>

          {memory.moments.length > 0 ? (
            /* dashed spine, offset to sit behind the icon dots */
            <div className="relative [&::before]:absolute [&::before]:bottom-3 [&::before]:left-5 [&::before]:top-3 [&::before]:w-0.5 [&::before]:bg-[repeating-linear-gradient(to_bottom,var(--ink-20)_0_7px,transparent_7px_14px)] [&::before]:content-['']">
              <div className="space-y-1">
                {memory.moments.map((moment, i) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + Math.min(i, 6) * 0.1, duration: 0.4 }}
                    className="relative flex gap-4 py-3"
                  >
                    <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-[2.2px] border-ink-primary bg-surface-accent shadow-[0_0_0_4px_var(--color-background-main)]">
                      <span
                        className="material-symbols-outlined text-[18px] text-ink-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        suppressHydrationWarning
                      >
                        {moment.icon}
                      </span>
                    </span>

                    <div className={`card flex-1 p-4 ${i % 2 ? "card-tilt-r" : ""}`}>
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <span className="chip chip-soft">{moment.time}</span>
                        <button
                          type="button"
                          onClick={() => setPendingMoment(moment)}
                          className="btn btn-icon btn-sm"
                          aria-label={`Xoá khoảnh khắc lúc ${moment.time}`}
                          title="Xoá khoảnh khắc"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <p className="font-body-md text-body-md leading-relaxed text-ink-primary">
                        {moment.content}
                      </p>
                      {moment.photo && (
                        <div className="mat mt-3">
                          <div className="mat-inner h-32 overflow-hidden">
                            <img
                              src={moment.photo}
                              alt=""
                              loading="lazy"
                              decoding="async"
                              onError={onImageError}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card card-dashed flex flex-col items-center justify-center gap-3 p-10 text-center">
              <span className="material-symbols-outlined text-4xl text-primary/50">schedule</span>
              <p className="font-body-sm text-body-sm text-primary">
                Chưa ghi lại khoảnh khắc nào của ngày hôm đó.
              </p>
            </div>
          )}
        </motion.section>
      </main>

      <NavBar activeHref="/memories" />

      <AnimatePresence>
        {photosOpen && (
          <AddPhotosModal
            memoryTitle={memory.title}
            onClose={() => setPhotosOpen(false)}
            onAdd={(photos) => {
              addPhotos(memory.id, photos);
              setPhotosOpen(false);
            }}
          />
        )}
        {momentOpen && (
          <AddMomentModal
            memoryTitle={memory.title}
            onClose={() => setMomentOpen(false)}
            onAdd={(moment) => {
              addMoment(memory.id, moment);
              setMomentOpen(false);
            }}
          />
        )}
        {confirmMemory && (
          <ConfirmDialog
            title="Xoá cả kỷ niệm này?"
            subject={memory.title}
            body={`Cả ${memory.photos.length} ảnh và ${memory.moments.length} khoảnh khắc trong album sẽ mất theo.`}
            confirmLabel="Xoá kỷ niệm"
            onConfirm={() => {
              setDeleting(true);
              removeMemory(memory.id);
              router.push("/memories");
            }}
            onClose={() => setConfirmMemory(false)}
          />
        )}
        {pendingMoment && (
          <ConfirmDialog
            title="Xoá khoảnh khắc này?"
            subject={`${pendingMoment.time} — ${pendingMoment.content}`}
            body="Khoảnh khắc sẽ bị gỡ khỏi dòng thời gian của kỷ niệm này."
            confirmLabel="Xoá khoảnh khắc"
            onConfirm={() => {
              removeMoment(memory.id, pendingMoment.id);
              setPendingMoment(null);
            }}
            onClose={() => setPendingMoment(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryDetail;
