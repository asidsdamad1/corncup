"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { memoryCategoryLabels, type Memory, type MemoryCategory } from "@/data/mockData";

interface CreateMemoryModalProps {
  readonly onClose: () => void;
  readonly onSuccess: (memory: Memory) => void;
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
  const [photosPreviews, setPhotosPreviews] = useState<string[]>([]);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setPhotosPreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dateStr = `${year}-${month.padStart(2, "0")}-15`;
    const newMemory: Memory = {
      id: `mem-${Date.now()}`,
      title: title.trim(),
      date: dateStr,
      location: location.trim() || "Việt Nam",
      category,
      coverImage:
        coverPreview ||
        "https://via.placeholder.com/400x300/b2ccec/253558?text=Kỷ+niệm",
      coverImageAlt: title.trim(),
      quote: quote.trim() || "Một kỷ niệm đẹp của chúng mình.",
      tags: [memoryCategoryLabels[category]],
      rating: 5,
      participants: ["Anh", "Em"],
      photos: photosPreviews.map((url, i) => ({
        id: `photo-new-${i}`,
        url,
        alt: `Ảnh ${i + 1}`,
      })),
      moments: [],
    };

    onSuccess(newMemory);
  };

  const categories: { key: MemoryCategory; label: string; icon: string }[] = [
    { key: "travel", label: "Du lịch", icon: "flight" },
    { key: "daily", label: "Hằng ngày", icon: "coffee" },
    { key: "romantic", label: "Lãng mạn", icon: "favorite" },
  ];

  return (
    <Portal>
      <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="relative w-full md:max-w-xl bg-surface-text-container rounded-t-[2.5rem] md:rounded-[2.5rem] max-h-[90vh] overflow-y-auto custom-scrollbar"
        >
          {/* Handle bar (mobile) */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-outline-variant rounded-full" />
          </div>

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center">
                  <span className="material-symbols-outlined text-ink-primary">add_a_photo</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-ink-primary">
                  Thêm kỷ niệm mới
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="mem-title">
                  Tên kỷ niệm
                </label>
                <input
                  id="mem-title"
                  className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-5 py-3.5 font-body-md transition-all focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Hà Giang 04/2026"
                  required
                />
              </div>

              {/* Date (Month + Year) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="mem-month">
                    Tháng
                  </label>
                  <select
                    id="mem-month"
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-5 py-3.5 font-body-md focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40 appearance-none"
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
                <div className="space-y-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="mem-year">
                    Năm
                  </label>
                  <input
                    id="mem-year"
                    type="number"
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-5 py-3.5 font-body-md focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    min="2020"
                    max="2030"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Danh mục
                </label>
                <div className="flex gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCategory(cat.key)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-label-md font-label-md transition-all ${
                        category === cat.key
                          ? "bg-ink-primary text-on-primary shadow-soft"
                          : "bg-surface-container-lowest border border-ink-primary/10 text-ink-primary hover:bg-surface-container-high"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="mem-location">
                  Địa điểm <span className="opacity-50">(tuỳ chọn)</span>
                </label>
                <div className="relative">
                  <input
                    id="mem-location"
                    className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-5 py-3.5 font-body-md focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="VD: Hà Giang, Việt Nam"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">
                    location_on
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="mem-quote">
                  Câu quote
                </label>
                <textarea
                  id="mem-quote"
                  className="w-full bg-surface-container-lowest border border-ink-primary/10 rounded-2xl px-5 py-3.5 font-body-md focus:outline-none focus:border-surface-accent focus:ring-2 focus:ring-surface-accent/40 resize-none"
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Viết một câu đáng nhớ cho chuyến đi này..."
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Ảnh bìa
                </label>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
                {coverPreview ? (
                  <div className="relative rounded-2xl overflow-hidden h-40">
                    <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setCoverPreview(null); if (coverInputRef.current) coverInputRef.current.value = ""; }}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-ink-primary/60 text-white flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => coverInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed border-primary/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-3xl text-primary/40">add_photo_alternate</span>
                    <span className="font-label-sm text-label-sm text-primary/60">Chọn ảnh bìa</span>
                  </button>
                )}
              </div>

              {/* Photos Upload */}
              <div className="space-y-1.5">
                <label className="font-label-md text-label-md text-on-surface-variant">
                  Kho ảnh
                </label>
                <input
                  ref={photosInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosUpload}
                  className="hidden"
                />
                <div className="grid grid-cols-4 gap-2">
                  {photosPreviews.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotosPreviews((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-ink-primary/60 text-white flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-[12px]">close</span>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => photosInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl text-primary/40">add</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 rounded-2xl font-label-md text-ink-primary border border-ink-primary/10 hover:bg-surface-container-high transition-colors text-center"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 rounded-2xl font-label-md text-ink-primary bg-surface-accent hover:opacity-90 active:scale-95 transition-all shadow-md shadow-surface-accent/20 text-center"
                >
                  Lưu kỷ niệm
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
};

export default CreateMemoryModal;
