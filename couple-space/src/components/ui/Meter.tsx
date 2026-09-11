"use client";

import { useEffect, useState } from "react";

/**
 * Progress meter, drawn as a slightly curved hand-ruled line rather
 * than a rectangular bar. See DESIGN.MD §4 "Progress meters".
 *
 * The fill animates by `stroke-dashoffset` from 100 (empty) to
 * 100 - value. `pathLength="100"` normalises the curve so that maths
 * holds regardless of the path's real length.
 *
 * At >= 95% the fill switches to Mint Signal — the one colour change
 * in the component, and the reward for nearly finishing.
 */

// Three near-identical curves, so a column of meters doesn't look stamped.
const CURVES = [
  "M3 9 C 62 4, 122 14, 237 8",
  "M3 8 C 60 13, 130 3, 237 9",
  "M3 9 C 70 5, 140 13, 237 8",
] as const;

interface MeterProps {
  /** 0–100. Values outside the range are clamped. */
  readonly value: number;
  /** Show the numeric percentage to the right of the curve. */
  readonly showValue?: boolean;
  /** Pick one of the three curves; defaults to the first. */
  readonly curve?: 0 | 1 | 2;
  readonly className?: string;
  /** Accessible name, e.g. the goal this meter belongs to. */
  readonly label?: string;
}

export const Meter: React.FC<MeterProps> = ({
  value,
  showValue = true,
  curve = 0,
  className = "",
  label,
}) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const done = pct >= 95;

  // Start empty, then draw on after mount so the transition is visible.
  // Rendering the final value on the server would skip the animation.
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const d = CURVES[curve];

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg
        viewBox="0 0 240 16"
        className="h-4 min-w-[90px] flex-1 overflow-visible"
        aria-hidden="true"
      >
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="var(--ink-20)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke={done ? "var(--color-mint)" : "var(--color-surface-accent)"}
          strokeWidth={5.4}
          strokeLinecap="round"
          strokeDasharray={100}
          strokeDashoffset={drawn ? 100 - pct : 100}
          style={{
            transition: "stroke-dashoffset .9s cubic-bezier(.2,.9,.25,1)",
          }}
        />
      </svg>

      {showValue && (
        <span
          className={`font-headline min-w-[4ch] text-right text-[0.95rem] font-bold tabular-nums ${
            done ? "text-mint" : "text-ink-primary"
          }`}
        >
          {pct}%
        </span>
      )}
    </div>
  );
};

export default Meter;
