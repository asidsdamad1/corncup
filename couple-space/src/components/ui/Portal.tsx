"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  readonly children: React.ReactNode;
}

/**
 * Renders children directly into document.body via a React Portal,
 * bypassing any CSS stacking context created by ancestor elements.
 * Safe for Server-Side Rendering (SSR).
 */
export const Portal: React.FC<Readonly<PortalProps>> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    mountRef.current = document.createElement("div");
    const el = mountRef.current;
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

  if (!mounted || !mountRef.current) {
    return null;
  }

  return createPortal(children, mountRef.current);
};
