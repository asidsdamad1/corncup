"use client";

import { motion } from "framer-motion";
import { Portal } from "@/components/ui/Portal";
import { useModalKeys } from "@/lib/useModalKeys";

interface ConfirmDialogProps {
  readonly title: string;
  /** The thing being deleted, named. "Xoá album?" alone is not enough. */
  readonly subject: string;
  readonly body: string;
  readonly confirmLabel: string;
  readonly onConfirm: () => void;
  readonly onClose: () => void;
}

/**
 * The gate in front of anything that cannot be undone.
 *
 * Deletes here are final — nothing is persisted, so there is no history to
 * restore from and no bin to fish things out of. The dialog therefore names
 * the exact item and says what will go with it.
 *
 * It carries no red. The palette reserves crimson for validation failures
 * (DESIGN.MD § Colour), so weight and wording do the work instead: a solid
 * ink confirm button against an outlined cancel.
 *
 * z-[400] deliberately: this sits above the photo lightbox at z-[300], which
 * is the one place a delete can be triggered from inside another overlay.
 */
export function ConfirmDialog({
  title,
  subject,
  body,
  confirmLabel,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const { dialogRef, onKeyDown } = useModalKeys(onClose);

  return (
    <Portal>
      <div
        className="overlay z-[400] items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-body"
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
          className="modal md:max-w-md"
          ref={dialogRef}
          onKeyDown={onKeyDown}
        >
          <div className="flex justify-center pb-1 pt-3 md:hidden">
            <span className="h-1 w-10 rounded-full bg-[var(--ink-20)]" />
          </div>

          <div className="modal-head md:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="-rotate-3 flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-paper">
                <span className="material-symbols-outlined text-ink-primary">delete</span>
              </span>
              <div className="min-w-0">
                <h3 id="confirm-title" className="font-headline-sm text-headline-sm text-ink-primary">
                  {title}
                </h3>
                <p className="font-label-sm text-label-sm truncate text-primary">{subject}</p>
              </div>
            </div>
            {/* First focusable in the dialog, so the keyboard lands on a way
                out rather than on the button that destroys something. */}
            <button onClick={onClose} className="btn btn-icon btn-sm" aria-label="Đóng">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="modal-body md:px-8">
            <p id="confirm-body" className="font-body-md text-body-md text-ink-primary">
              {body}
            </p>
            <p className="font-body-sm text-body-sm mt-2 text-primary">
              Thao tác này không thể hoàn tác.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <button type="button" onClick={onClose} className="btn flex-1 py-3.5">
                Giữ lại
              </button>
              <button type="button" onClick={onConfirm} className="btn btn-ink flex-1 py-3.5">
                <span className="material-symbols-outlined">delete</span>
                {confirmLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}

export default ConfirmDialog;
