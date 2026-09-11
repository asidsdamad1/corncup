"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ARCHIPELAGOS,
  COAST_PATH,
  MAP_VIEW,
  PIN_BASE_SCALE,
  PROVINCES,
  TRAVEL_IDEAS,
  coordFor,
  placeLabel,
  project,
  resolveProvince,
  smoothPath,
} from "@/lib/provinces";
import { toggleWishlist, useWishlist } from "@/lib/memoryStore";
import type { Memory } from "@/data/mockData";

interface VietnamMapProps {
  readonly memories: readonly Memory[];
}

interface Visit {
  readonly province: string;
  readonly place: string;
  readonly memory: Memory;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const FIT: Box = {
  x: MAP_VIEW.x,
  y: MAP_VIEW.y,
  w: MAP_VIEW.width,
  h: MAP_VIEW.height,
};
const MAX_ZOOM = 6;

/** Keep the view inside the map and never zoomed out past the full extent. */
function clamp(box: Box): Box {
  const w = Math.min(Math.max(box.w, MAP_VIEW.width / MAX_ZOOM), MAP_VIEW.width);
  const h = w * (MAP_VIEW.height / MAP_VIEW.width);
  return {
    w,
    h,
    // Clamped against the map's own origin. Flooring these at 0 instead
    // would snap the view past the top edge on the first zoom or drag,
    // and the northern labels above y=0 would vanish until reset.
    x: Math.min(Math.max(box.x, MAP_VIEW.x), MAP_VIEW.x + MAP_VIEW.width - w),
    y: Math.min(Math.max(box.y, MAP_VIEW.y), MAP_VIEW.y + MAP_VIEW.height - h),
  };
}

/**
 * One pin.
 *
 * `scale` is the inverse of the map zoom, so a pin stays the same size on
 * screen however far you zoom in — otherwise at 6x the pins would be the
 * size of provinces.
 */
function Pin({
  x,
  y,
  label,
  aria,
  idea,
  saved,
  selected,
  scale,
  onSelect,
}: {
  x: number;
  y: number;
  label: string;
  aria: string;
  idea?: boolean;
  saved?: boolean;
  selected: boolean;
  scale: number;
  onSelect: () => void;
}) {
  return (
    <g
      className={`map-pin${idea ? " map-pin-idea" : ""}${saved ? " map-pin-saved" : ""}`}
      transform={`translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale.toFixed(3)})`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={aria}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {/* Invisible, and larger than anything drawn: the pin got smaller but
          a fingertip did not, so the hit area is kept separate from the art.
          `fill: transparent` still receives pointer events; `fill: none`
          would not. */}
      <circle className="pin-hit" cx={0} cy={-15} r={22} />
      {/* The art is wrapped so focus can scale it. A CSS transform on the
          outer <g> would replace its translate/scale attribute and fling the
          pin to the origin; on an inner group it simply composes. */}
      <g className="pin-art">
        <path className="pin-tail" d="M -4.6 -10 L 0 1 L 4.6 -10 Z" />
        <circle className="pin-body" cx={0} cy={-15} r={5.5} />
      </g>
      <text className="pin-tag" x={0} y={-27} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/**
 * A hand-drawn map of Vietnam with a pin on every province the couple has
 * been to. Nothing is stored on a memory: places come from resolving the
 * existing `location` string against the province table in
 * `src/lib/provinces.ts`, so adding a province is one row there.
 */
export function VietnamMap({ memories }: VietnamMapProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<Box>(FIT);
  const wishlist = useWishlist();

  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchDist = useRef(0);
  const dragged = useRef(false);

  const zoom = MAP_VIEW.width / view.w;
  const atFit = Math.abs(zoom - 1) < 0.001;

  /* ---------- zoom + pan ---------- */

  const zoomAt = useCallback((factor: number, px: number, py: number) => {
    setView((v) => {
      const w = v.w / factor;
      const h = w * (MAP_VIEW.height / MAP_VIEW.width);
      // keep the point under the cursor fixed
      const rx = (px - v.x) / v.w;
      const ry = (py - v.y) / v.h;
      return clamp({ w, h, x: px - rx * w, y: py - ry * h });
    });
  }, []);

  /** Client pixel → SVG user units. */
  const toSvg = useCallback(
    (clientX: number, clientY: number) => {
      const el = svgRef.current;
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: view.x + ((clientX - r.left) / r.width) * view.w,
        y: view.y + ((clientY - r.top) / r.height) * view.h,
      };
    },
    [view]
  );

  // Wheel must be a non-passive listener or preventDefault is ignored and
  // the page scrolls instead of the map zooming.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = toSvg(e.clientX, e.clientY);
      zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, p.x, p.y);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [toSvg, zoomAt]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchDist.current = Math.hypot(a.x - b.x, a.y - b.y);
    }
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const next = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, next);

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDist.current > 0) {
        const mid = toSvg((a.x + b.x) / 2, (a.y + b.y) / 2);
        zoomAt(dist / pinchDist.current, mid.x, mid.y);
      }
      pinchDist.current = dist;
      dragged.current = true;
      return;
    }

    if (atFit) return; // at full extent there is nothing to pan to
    const el = svgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((next.x - prev.x) / r.width) * view.w;
    const dy = ((next.y - prev.y) / r.height) * view.h;
    if (Math.abs(next.x - prev.x) + Math.abs(next.y - prev.y) > 2) dragged.current = true;
    setView((v) => clamp({ ...v, x: v.x - dx, y: v.y - dy }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchDist.current = 0;
  };

  /** Ignore the click a drag leaves behind, or panning would select a pin. */
  const pick = (province: string) => () => {
    if (dragged.current) return;
    setSelected(province);
  };

  /* ---------- data ---------- */

  const { visits, unresolved } = useMemo(() => {
    const byProvince = new Map<string, Visit>();
    const missing: Memory[] = [];

    for (const memory of memories) {
      const { province } = resolveProvince(memory.location);
      if (!province || !PROVINCES[province]) {
        missing.push(memory);
        continue;
      }
      const existing = byProvince.get(province);
      if (!existing || new Date(memory.date) > new Date(existing.memory.date)) {
        byProvince.set(province, {
          province,
          place: placeLabel(memory.location) || province,
          memory,
        });
      }
    }
    return { visits: [...byProvince.values()], unresolved: missing };
  }, [memories]);

  const thread = useMemo(() => {
    const pts = [...visits]
      .sort((a, b) => new Date(a.memory.date).getTime() - new Date(b.memory.date).getTime())
      .map((v) => coordFor(v.province, v.memory.location))
      .filter((c): c is readonly [number, number] => c !== null)
      .map((c) => project(c))
      .map(([x, y]) => [x, y - 21] as const);
    return pts.length > 1 ? smoothPath(pts, false) : "";
  }, [visits]);

  /** Suggested places, plus anything saved to the wishlist. */
  const ideaPins = useMemo(() => {
    const map = new Map<string, { province: string; place: string }>();
    for (const i of TRAVEL_IDEAS) if (PROVINCES[i.province]) map.set(i.province, i);
    for (const p of wishlist) {
      if (!map.has(p) && PROVINCES[p]) map.set(p, { province: p, place: p });
    }
    return [...map.values()].filter((i) => !visits.some((v) => v.province === i.province));
  }, [wishlist, visits]);

  /** Island clusters, with a dashed ring sized to what they contain. */
  const archipelagos = useMemo(
    () =>
      ARCHIPELAGOS.map((a) => {
        const points = a.islands.map((c) => project(c));
        const xs = points.map((p) => p[0]);
        const ys = points.map((p) => p[1]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const pad = 26;
        return {
          name: a.name,
          points,
          cx: (minX + maxX) / 2,
          cy: (minY + maxY) / 2,
          rx: (maxX - minX) / 2 + pad,
          ry: (maxY - minY) / 2 + pad,
        };
      }),
    []
  );

  const active = visits.find((v) => v.province === selected);
  const activeIdea = ideaPins.find((i) => i.province === selected);
  const pinScale = PIN_BASE_SCALE / zoom;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
      <div className="map-sheet p-3 pt-4">
        {/* ---------- zoom controls ---------- */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => zoomAt(1.5, view.x + view.w / 2, view.y + view.h / 2)}
            disabled={zoom >= MAX_ZOOM - 0.01}
            className="btn btn-icon btn-sm"
            aria-label="Phóng to bản đồ"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
          <button
            type="button"
            onClick={() => zoomAt(1 / 1.5, view.x + view.w / 2, view.y + view.h / 2)}
            disabled={atFit}
            className="btn btn-icon btn-sm"
            aria-label="Thu nhỏ bản đồ"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button
            type="button"
            onClick={() => setView(FIT)}
            disabled={atFit}
            className="btn btn-icon btn-sm"
            aria-label="Về kích thước ban đầu"
            title="Về kích thước ban đầu"
          >
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
        </div>

        <svg
          ref={svgRef}
          viewBox={`${view.x.toFixed(2)} ${view.y.toFixed(2)} ${view.w.toFixed(2)} ${view.h.toFixed(2)}`}
          role="img"
          aria-label="Bản đồ Việt Nam với các tỉnh thành đã đến"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`relative mx-auto block h-auto max-h-[72vh] w-full max-w-[620px] ${
            atFit ? "" : "cursor-grab active:cursor-grabbing"
          }`}
          /* Let the page scroll normally until the map is actually zoomed in;
             only then does dragging belong to the map. */
          style={{ touchAction: atFit ? "pan-y" : "none" }}
        >
          <defs>
            {/* A little wobble so the coast reads as a pen line, not a vector path. */}
            <filter id="map-ink-wobble" x="-4%" y="-4%" width="108%" height="108%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.021"
                numOctaves={2}
                seed={7}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={3.4}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>

          <g filter="url(#map-ink-wobble)">
            <path className="map-coast" d={COAST_PATH} />
            {/* Phú Quốc sits offshore, so it is drawn as its own island. */}
            <ellipse
              className="map-coast"
              cx={98}
              cy={786}
              rx={13}
              ry={19}
              transform="rotate(-18 98 786)"
            />
          </g>

          {/* Hoàng Sa and Trường Sa where they actually are, not in a corner
              inset — so the map shows honestly that Hoàng Sa lies much
              closer in than Trường Sa. */}
          {archipelagos.map((a) => (
            <g key={a.name}>
              <ellipse
                cx={a.cx}
                cy={a.cy}
                rx={a.rx}
                ry={a.ry}
                fill="#e8f0fa66"
                stroke="var(--ink-20)"
                strokeWidth={1.8}
                strokeDasharray="7 6"
              />
              {a.points.map(([ix, iy], i) => (
                <circle
                  key={i}
                  cx={ix}
                  cy={iy}
                  r={i % 3 === 0 ? 3.4 : 2.4}
                  fill="var(--color-ink-primary)"
                />
              ))}
              <text
                x={a.cx}
                y={a.cy - a.ry - 8}
                textAnchor="middle"
                fontSize={20}
                fontWeight={600}
                fill="var(--color-ink-primary)"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                paintOrder="stroke"
                stroke="#e8f0fa"
                strokeWidth={5}
                strokeLinejoin="round"
              >
                {a.name}
              </text>
            </g>
          ))}

          {thread && <path className="map-thread" d={thread} />}

          {/* Ideas first so real pins always sit on top. */}
          {ideaPins.map((idea) => {
            const c = coordFor(idea.province);
            if (!c) return null;
            const [x, y] = project(c);
            const saved = wishlist.includes(idea.province);
            return (
              <Pin
                key={`idea-${idea.province}`}
                x={x}
                y={y}
                label={idea.place}
                aria={
                  saved
                    ? `Trong danh sách muốn đi: ${idea.place}, ${idea.province}`
                    : `Gợi ý: ${idea.place}, ${idea.province}`
                }
                idea
                saved={saved}
                scale={pinScale}
                selected={selected === idea.province}
                onSelect={pick(idea.province)}
              />
            );
          })}

          {visits.map((visit) => {
            const c = coordFor(visit.province, visit.memory.location);
            if (!c) return null;
            const [x, y] = project(c);
            return (
              <Pin
                key={visit.province}
                x={x}
                y={y}
                label={visit.place}
                aria={`${visit.memory.title} — ${visit.province}`}
                scale={pinScale}
                selected={selected === visit.province}
                onSelect={pick(visit.province)}
              />
            );
          })}
        </svg>

        <div className="font-label-sm text-label-sm relative mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-dashed border-[var(--ink-20)] pt-3 text-primary">
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full border-[2.2px] border-ink-primary bg-surface-accent" />
            Đã đến ({visits.length})
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-full border-[2.2px] border-dashed border-ink-primary bg-paper" />
            Gợi ý / muốn đi
          </span>
          <span className="ml-auto">
            {atFit ? "Cuộn hoặc bấm + để phóng to" : `Phóng ${zoom.toFixed(1)}× · kéo để di chuyển`}
          </span>
        </div>
      </div>

      {/* ---------- side column ---------- */}
      <div>
        <div className="card card-flat min-h-[140px] p-5">
          {active && (
            <>
              <span className="chip chip-accent mb-3">
                {new Date(active.memory.date).toLocaleDateString("vi-VN", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <h4 className="font-headline-sm text-headline-sm text-ink-primary">
                {active.memory.title}
              </h4>
              <p className="font-label-sm text-label-sm mt-1 text-primary">
                {active.memory.location} · {active.memory.photos.length} ảnh
              </p>
              <div className="ruled mt-3">
                <p className="italic text-ink-primary">&quot;{active.memory.quote}&quot;</p>
              </div>
              <Link
                href={`/memories/${active.memory.id}`}
                className="btn btn-sm mt-4 inline-flex"
              >
                Mở album
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </>
          )}

          {activeIdea && (
            <>
              <span className="chip chip-soft mb-3">Chưa đến bao giờ</span>
              <h4 className="font-headline-sm text-headline-sm text-ink-primary">
                {activeIdea.place}
              </h4>
              <p className="font-label-sm text-label-sm mt-1 text-primary">
                {activeIdea.province}
              </p>
              <p className="font-body-sm text-body-sm mt-3 text-primary">
                Khi nào đi rồi, thêm một kỷ niệm ở đây là ghim tự chuyển thành ghim đặc.
              </p>
              <button
                type="button"
                onClick={() => toggleWishlist(activeIdea.province)}
                aria-pressed={wishlist.includes(activeIdea.province)}
                className={`btn btn-sm mt-4 ${
                  wishlist.includes(activeIdea.province) ? "btn-accent" : ""
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: wishlist.includes(activeIdea.province)
                      ? "'FILL' 1"
                      : "'FILL' 0",
                  }}
                  suppressHydrationWarning
                >
                  bookmark
                </span>
                {wishlist.includes(activeIdea.province)
                  ? "Bỏ khỏi danh sách"
                  : "Thêm vào danh sách muốn đi"}
              </button>
            </>
          )}

          {!active && !activeIdea && (
            <div className="flex min-h-[110px] flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-3xl text-primary/40">
                touch_app
              </span>
              <p className="font-body-sm text-body-sm mt-1 text-primary">
                Bấm một ghim để xem kỷ niệm ở đó.
              </p>
            </div>
          )}
        </div>

        {/* ---------- the wishlist, somewhere you can actually see it ---------- */}
        <div className="sheet mt-4 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-ink-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
              suppressHydrationWarning
            >
              bookmark
            </span>
            <h4 className="font-label-md text-label-md text-ink-primary">Danh sách muốn đi</h4>
            <span className="chip chip-soft ml-auto">{wishlist.length}</span>
          </div>

          {wishlist.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {wishlist.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(p)}
                    className="chip chip-accent cursor-pointer"
                    aria-label={`Bỏ ${p} khỏi danh sách muốn đi`}
                    title={`Bỏ ${p} khỏi danh sách`}
                  >
                    {p}
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-body-sm text-body-sm text-primary">
              Chưa có nơi nào. Bấm một ghim nét đứt trên bản đồ rồi chọn{" "}
              <span className="text-ink-primary">Thêm vào danh sách muốn đi</span>.
            </p>
          )}
        </div>

        {/* A location we could not place must be visible, never silently dropped:
            an undercount is worse than an honest question. */}
        {unresolved.length > 0 && (
          <div className="card card-dashed mt-4 p-4">
            <span className="chip chip-soft mb-2">Chưa xếp được vào tỉnh nào</span>
            <ul className="font-body-sm text-body-sm space-y-1 text-primary">
              {unresolved.map((m) => (
                <li key={m.id}>
                  <span className="text-ink-primary">{m.title}</span>
                  {m.location ? ` — “${m.location}”` : " — chưa có địa điểm"}
                </li>
              ))}
            </ul>
            <p className="font-label-sm text-label-sm mt-2 text-primary">
              Những kỷ niệm này chưa được tính vào số tỉnh thành.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VietnamMap;
