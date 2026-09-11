"use client";

import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Escape closes, Tab stays inside, and focus starts on the first control.
 *
 * Without the Tab trap the keyboard walks straight out of a dialog and into
 * the page behind it, which is still visible but not meant to be reachable.
 *
 * Spread the result onto the dialog element:
 *   const { dialogRef, onKeyDown } = useModalKeys(onClose);
 *   <div ref={dialogRef} onKeyDown={onKeyDown}>
 */
export function useModalKeys(onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);

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
      const items = root.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
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
    dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, []);

  return { dialogRef, onKeyDown };
}
