"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { readImageSize } from "@/lib/image";
import type { MemoryPhoto } from "@/data/mockData";
import { useModalKeys } from "@/lib/useModalKeys";

interface AddPhotosModalProps {
  readonly memoryTitle: string;
  readonly onClose: () => void;
  readonly onAdd: (photos: MemoryPhoto[]) => void;
}

interface Picked {
  readonly url: string;
  readonly width: number;
  readonly height: number;
  caption: string;
}

/** Add photos to an album that already exists. */
export function AddPhotosModal({ memoryTitle, onClose, onAdd }: AddPhotosModalProps) {
  const [picked, setPicked] = useState<Picked[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { dialogRef, onKeyDown } = useModalKeys(onClose);
  const submittedRef = useRef(false);

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    // Sizes are read up front, then appended in one go, so the photos keep
    // the order they were chosen in rather than the order they decoded.
    const next = await Promise.all(
      Array.from(files).map(async (file) => {
        const url = URL.createObjectURL(file);
        const { width, height } = await readImageSize(url);
        return { url, width, height, caption: "" };
      })
    );
    setPicked((prev) => [...prev, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (i: number) =>
    setPicked((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });

  const liveRef = useRef(picked);
  useEffect(() => {
    liveRef.current = picked;
  }, [picked]);
  useEffect(
    () => () => {
      if (!submittedRef.current) liveRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    },
    []
  );

  const submit = useCallback(() => {
    if (picked.length === 0) return;
    const stamp = Date.now();
    submittedRef.current = true;
    onAdd(
      picked.map((p, i) => ({
        id: `photo-${stamp}-${i}`,
        url: p.url,
        alt: p.caption.trim() || `Ảnh trong ${memoryTitle}`,
        caption: p.caption.trim() || undefined,
        width: p.width,
        height: p.height,
      }))
    );
  }, [picked, memoryTitle, onAdd]);

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-photos-title"
      >
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-default"
          onClick={onClose}
          aria-label="Đóng"
          tabIndex={-1}
        />

        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="modal custom-scrollbar md:max-w-xl"
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="flex justify-center pb-1 pt-3 md:hidden">
            <span className="h-1 w-10 rounded-full bg-[var(--ink-20)]" />
          </div>

          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
                <span className="material-symbols-outlined text-ink-primary">add_a_photo</span>
              </span>
              <div className="min-w-0">
                <h3
                  id="add-photos-title"
                  className="font-headline-sm text-headline-sm text-ink-primary"
                >
                  Thêm ảnh
                </h3>
                <p className="font-label-sm text-label-sm truncate text-primary">{memoryTitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="modal-body space-y-5 md:px-8">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePick}
              className="hidden"
            />

            {picked.length === 0 ? (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="card-dashed flex h-44 w-full flex-col items-center justify-center gap-2 transition-colors hover:border-ink-primary"
              >
                <span className="material-symbols-outlined text-4xl text-primary">
                  add_photo_alternate
                </span>
                <span className="font-label-md text-label-md text-primary">Chọn ảnh từ máy</span>
                <span className="font-body-sm text-body-sm text-primary/70">
                  Chọn được nhiều tấm một lúc
                </span>
              </button>
            ) : (
              <div className="space-y-3">
                {picked.map((p, i) => (
                  <div key={p.url} className="flex items-start gap-3">
                    <div className={`mat flex-none ${i % 2 ? "rotate-[0.9deg]" : "-rotate-[1deg]"}`}>
                      <div className="mat-inner h-20 w-20 overflow-hidden">
                        <img
                          src={p.url}
                          alt=""
                          width={p.width}
                          height={p.height}
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <label className="field-label" htmlFor={`cap-${i}`}>
                        Chú thích <span className="opacity-60">(tuỳ chọn)</span>
                      </label>
                      <input
                        id={`cap-${i}`}
                        className="field"
                        value={p.caption}
                        placeholder="VD: Bình minh trên đèo"
                        onChange={(e) =>
                          setPicked((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, caption: e.target.value } : x
                            )
                          )
                        }
                      />
                      <p className="font-label-sm text-label-sm mt-1 text-primary/70">
                        {p.width} × {p.height}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="btn btn-icon btn-sm flex-none"
                      aria-label={`Bỏ ảnh ${i + 1}`}
                    >
                      <span className="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="card-dashed flex w-full items-center justify-center gap-2 py-3 transition-colors hover:border-ink-primary"
                >
                  <span className="material-symbols-outlined text-primary">add</span>
                  <span className="font-label-sm text-label-sm text-primary">Chọn thêm</span>
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2 md:flex-row">
              <button type="button" onClick={onClose} className="btn flex-1 py-3.5">
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={picked.length === 0}
                className="btn btn-accent flex-1 py-3.5"
              >
                Thêm {picked.length > 0 ? `${picked.length} ảnh` : "ảnh"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default AddPhotosModal;
