"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";
import type { MemoryMoment } from "@/data/mockData";

interface AddMomentModalProps {
  readonly memoryTitle: string;
  readonly onClose: () => void;
  readonly onAdd: (moment: MemoryMoment) => void;
}

/** Icons offered for a moment, in the order they tend to happen in a day. */
const ICONS: ReadonlyArray<{ icon: string; label: string }> = [
  { icon: "wb_twilight", label: "Bình minh" },
  { icon: "coffee", label: "Ăn uống" },
  { icon: "hiking", label: "Đi chơi" },
  { icon: "photo_camera", label: "Chụp ảnh" },
  { icon: "favorite", label: "Lãng mạn" },
  { icon: "nightlight", label: "Buổi tối" },
];

export function AddMomentModal({ memoryTitle, onClose, onAdd }: AddMomentModalProps) {
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState(ICONS[0].icon);
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  const canSave = time.trim() !== "" && content.trim() !== "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onAdd({
      id: `moment-${Date.now()}`,
      time: time.trim(),
      content: content.trim(),
      icon,
    });
  };

  return (
    <Portal>
      <div
        className="overlay z-[200] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-moment-title"
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
          className="modal custom-scrollbar md:max-w-lg"
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="flex justify-center pb-1 pt-3 md:hidden">
            <span className="h-1 w-10 rounded-full bg-[var(--ink-20)]" />
          </div>

          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
                <span className="material-symbols-outlined text-ink-primary">edit_note</span>
              </span>
              <div className="min-w-0">
                <h3
                  id="add-moment-title"
                  className="font-headline-sm text-headline-sm text-ink-primary"
                >
                  Thêm khoảnh khắc
                </h3>
                <p className="font-label-sm text-label-sm truncate text-primary">{memoryTitle}</p>
              </div>
            </div>
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={submit} className="modal-body space-y-5 md:px-8">
            <div>
              <label className="field-label" htmlFor="moment-time">
                Lúc mấy giờ
              </label>
              <input
                id="moment-time"
                type="time"
                className="field"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="moment-content">
                Chuyện gì đã xảy ra
              </label>
              <textarea
                id="moment-content"
                className="field resize-none"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="VD: Dừng xe giữa đèo, gió lạnh mà tay ai cũng ấm."
                required
              />
            </div>

            <div>
              <span className="field-label">Biểu tượng</span>
              <div className="flex flex-wrap gap-3">
                {ICONS.map((opt) => (
                  <button
                    key={opt.icon}
                    type="button"
                    onClick={() => setIcon(opt.icon)}
                    aria-pressed={icon === opt.icon}
                    className={`chip cursor-pointer px-4 py-2.5 transition-all ${
                      icon === opt.icon
                        ? "-rotate-2 bg-surface-accent shadow-[0_3px_0_var(--color-ink-primary)]"
                        : ""
                    }`}
                  >
                    <span className="material-symbols-outlined">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 md:flex-row">
              <button type="button" onClick={onClose} className="btn flex-1 py-3.5">
                Hủy bỏ
              </button>
              <button type="submit" disabled={!canSave} className="btn btn-accent flex-1 py-3.5">
                Lưu khoảnh khắc
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Portal>
  );
}

export default AddMomentModal;
