"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  readonly children: React.ReactNode;
}

/**
 * Renders children directly into document.body via a React Portal,
 * bypassing any CSS stacking context created by ancestor elements
 * (e.g. Framer Motion transforms, filters, will-change).
 * Also locks body scroll while mounted.
 */
export const Portal: React.FC<Readonly<PortalProps>> = ({ children }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  if (!mountRef.current) {
    mountRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = mountRef.current!;
    document.body.appendChild(el);

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.removeChild(el);
      // Restore body scroll
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return createPortal(children, mountRef.current);
};
