"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { readImageSize, PHOTO_FALLBACK } from "@/lib/image";
import { memoryCategoryLabels, type Memory, type MemoryCategory } from "@/data/mockData";

interface CreateMemoryModalProps {
  readonly onClose: () => void;
  readonly onSuccess: (memory: Memory) => void;
}

interface LocalPhoto {
  readonly url: string;
  readonly width: number;
  readonly height: number;
}

export const CreateMemoryModal: React.FC<Readonly<CreateMemoryModalProps>> = ({
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("2026");
  const [category, setCategory] = useState<MemoryCategory>("travel");
  const [location, setLocation] = useState("");
  const [quote, setQuote] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [photosPreviews, setPhotosPreviews] = useState<LocalPhoto[]>([]);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);

  /* Object URLs rather than FileReader data URLs: they are created
     synchronously (so selection order is preserved), and they do not
     balloon a 3 MB photo into 4 MB of base64 held in React state. */
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handlePhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    /* Read every size first, then append in one go. Appending from inside
       each callback would order the photos by whichever decoded first —
       i.e. smallest file wins — not by the order they were picked. */
    const picked = await Promise.all(
      Array.from(files).map(async (file) => {
        const url = URL.createObjectURL(file);
        const { width, height } = await readImageSize(url);
        return { url, width, height };
      })
    );
    setPhotosPreviews((prev) => [...prev, ...picked]);
    // Let the same file be picked again after it has been removed.
    if (photosInputRef.current) photosInputRef.current.value = "";
  };

  const removePhoto = (i: number) => {
    setPhotosPreviews((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  /* Esc closes, and Tab is kept inside the dialog — without this the
     keyboard walks out of the modal and into the page behind it. */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>("input, textarea, button")?.focus();
  }, []);

  /* Release anything the user picked but never saved. The live values are
     read through a ref so this effect can depend on nothing and therefore
     run only on unmount — depending on the state itself would revoke the
     previous URLs every time a photo is added, blanking the previews. */
  const liveRef = useRef({ cover: coverPreview, photos: photosPreviews });
  useEffect(() => {
    liveRef.current = { cover: coverPreview, photos: photosPreviews };
  }, [coverPreview, photosPreviews]);

  useEffect(() => {
    return () => {
      if (submittedRef.current) return;
      const { cover, photos } = liveRef.current;
      if (cover) URL.revokeObjectURL(cover);
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dateStr = `${year}-${month.padStart(2, "0")}-15`;
    const stamp = Date.now();
    const newMemory: Memory = {
      id: `mem-${stamp}`,
      title: title.trim(),
      date: dateStr,
      /* Empty rather than "Việt Nam": that default matched no province, so
         every memory saved without a location landed in the unresolved
         list. An empty location is honestly blank instead of falsely set. */
      location: location.trim(),
      category,
      coverImage: coverPreview || PHOTO_FALLBACK,
      coverImageAlt: title.trim(),
      quote: quote.trim() || "Một kỷ niệm đẹp của chúng mình.",
      tags: [memoryCategoryLabels[category]],
      rating: 5,
      participants: ["Anh", "Em"],
      photos: photosPreviews.map((p, i) => ({
        // The timestamp keeps ids unique across several memories added in
        // one session — plain `photo-new-0` would collide.
        id: `photo-${stamp}-${i}`,
        url: p.url,
        alt: `Ảnh ${i + 1}`,
        width: p.width,
        height: p.height,
      })),
      moments: [],
    };

    // Stops the unmount cleanup from revoking URLs the new memory now owns.
    submittedRef.current = true;
    onSuccess(newMemory);
  };

  const categories: { key: MemoryCategory; label: string; icon: string }[] = [
    { key: "travel", label: "Du lịch", icon: "flight" },
    { key: "daily", label: "Hằng ngày", icon: "coffee" },
    { key: "romantic", label: "Lãng mạn", icon: "favorite" },
  ];

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-mem-title"
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
          {/* grab handle (mobile) */}
          <div className="flex justify-center pb-1 pt-3 md:hidden">
            <span className="h-1 w-10 rounded-full bg-[var(--ink-20)]" />
          </div>

          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
                <span className="material-symbols-outlined text-ink-primary">add_a_photo</span>
              </span>
              <h3
                id="create-mem-title"
                className="font-headline-sm text-headline-sm text-ink-primary"
              >
                Thêm kỷ niệm mới
              </h3>
            </div>
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="modal-body space-y-5 md:px-8">
            {/* Title */}
            <div>
              <label className="field-label" htmlFor="mem-title">
                Tên kỷ niệm
              </label>
              <input
                id="mem-title"
                className="field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Hà Giang 04/2026"
                required
              />
            </div>

            {/* Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label" htmlFor="mem-month">
                  Tháng
                </label>
                <select
                  id="mem-month"
                  className="field appearance-none"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  <option value="">Chọn</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="mem-year">
                  Năm
                </label>
                <input
                  id="mem-year"
                  type="number"
                  className="field"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <span className="field-label">Danh mục</span>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setCategory(cat.key)}
                    aria-pressed={category === cat.key}
                    className={`chip cursor-pointer px-4 py-2.5 transition-all ${
                      category === cat.key
                        ? "-rotate-2 bg-surface-accent shadow-[0_3px_0_var(--color-ink-primary)]"
                        : ""
                    }`}
                  >
                    <span className="material-symbols-outlined">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="field-label" htmlFor="mem-location">
                Địa điểm <span className="opacity-60">(để trống nếu chưa rõ)</span>
              </label>
              <div className="relative">
                <input
                  id="mem-location"
                  className="field pr-12"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VD: Hà Giang, Việt Nam"
                />
                <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/50">
                  location_on
                </span>
              </div>
            </div>

            {/* Quote */}
            <div>
              <label className="field-label" htmlFor="mem-quote">
                Câu quote
              </label>
              <textarea
                id="mem-quote"
                className="field resize-none"
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Viết một câu đáng nhớ cho chuyến đi này..."
              />
            </div>

            {/* Cover */}
            <div>
              <span className="field-label">Ảnh bìa</span>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
              {coverPreview ? (
                <div className="mat relative -rotate-[0.8deg]">
                  <div className="mat-inner h-40 overflow-hidden">
                    <img
                      src={coverPreview}
                      alt="Xem trước ảnh bìa"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(coverPreview);
                      setCoverPreview(null);
                      if (coverInputRef.current) coverInputRef.current.value = "";
                    }}
                    className="btn btn-icon absolute -right-3 -top-3 h-9 w-9"
                    aria-label="Bỏ ảnh bìa"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="card-dashed flex h-32 w-full flex-col items-center justify-center gap-2 transition-colors hover:border-ink-primary"
                >
                  <span className="material-symbols-outlined text-3xl text-primary">
                    add_photo_alternate
                  </span>
                  <span className="font-label-sm text-label-sm text-primary">Chọn ảnh bìa</span>
                </button>
              )}
            </div>

            {/* Photos */}
            <div>
              <span className="field-label">Kho ảnh</span>
              <input
                ref={photosInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotosUpload}
                className="hidden"
              />
              <div className="grid grid-cols-4 gap-3">
                {photosPreviews.map((photo, i) => (
                  <div
                    key={photo.url}
                    className={`mat relative ${i % 2 ? "rotate-[0.9deg]" : "-rotate-[1deg]"}`}
                  >
                    <div className="mat-inner aspect-square overflow-hidden">
                      <img
                        src={photo.url}
                        alt={`Ảnh ${i + 1}`}
                        width={photo.width}
                        height={photo.height}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="btn btn-icon absolute -right-2 -top-2 h-7 w-7"
                      aria-label={`Bỏ ảnh ${i + 1}`}
                    >
                      <span className="material-symbols-outlined text-[13px]">close</span>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => photosInputRef.current?.click()}
                  className="card-dashed flex aspect-square items-center justify-center transition-colors hover:border-ink-primary"
                  aria-label="Thêm ảnh"
                >
                  <span className="material-symbols-outlined text-xl text-primary">add</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 md:flex-row">
              <button type="button" onClick={onClose} className="btn flex-1 py-3.5">
                Hủy bỏ
              </button>
              <button type="submit" className="btn btn-accent flex-1 py-3.5">
                Lưu kỷ niệm
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Portal>
  );
};

export default CreateMemoryModal;
