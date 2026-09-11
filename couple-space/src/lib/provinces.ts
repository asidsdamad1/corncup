/**
 * Turning a free-text `location` into a province, and a province into a
 * point on the map.
 *
 * ─────────────────────────────────────────────────────────────────────
 * HOW TO ADD A PROVINCE OR A PLACE
 *
 *   A province  → add one row to PROVINCES below: name, lat, lng, region.
 *                 That is all. The pin, the region tally and the
 *                 resolver all read from that one table.
 *
 *   A town that is not its province capital (Mộc Châu, Sa Pa, Hội An…)
 *               → add a row to PLACE_COORD so the pin lands on the town
 *                 rather than the provincial capital, and a row to ALIAS
 *                 so "Mộc Châu" resolves to Sơn La.
 *
 * All 63 provinces of the pre-2025 arrangement are already listed, so in
 * practice you only ever add places, not provinces. (63, not 64 — the
 * 64-province figure predates 2008, when Hà Tây was merged into Hà Nội.)
 *
 * Coordinates are the provincial capital, to roughly 0.01° — plenty for a
 * sketched map, not survey data. Correct any that look wrong; the check in
 * `npm run check:map` will tell you if a pin falls in the sea.
 * ─────────────────────────────────────────────────────────────────────
 */

export type RegionKey = "bac" | "trung" | "nam";

export interface ProvinceInfo {
  readonly lat: number;
  readonly lng: number;
  readonly region: RegionKey;
}

/** Every province, in one table. Add a row and it appears on the map. */
export const PROVINCES: Record<string, ProvinceInfo> = {
  // ── Miền Bắc — Tây Bắc ──
  "Lai Châu": { lat: 22.4, lng: 103.47, region: "bac" },
  "Điện Biên": { lat: 21.39, lng: 103.02, region: "bac" },
  "Sơn La": { lat: 21.33, lng: 103.91, region: "bac" },
  "Hoà Bình": { lat: 20.81, lng: 105.34, region: "bac" },
  "Lào Cai": { lat: 22.48, lng: 103.97, region: "bac" },
  "Yên Bái": { lat: 21.72, lng: 104.9, region: "bac" },

  // ── Miền Bắc — Đông Bắc ──
  "Hà Giang": { lat: 22.82, lng: 104.98, region: "bac" },
  "Cao Bằng": { lat: 22.67, lng: 106.25, region: "bac" },
  "Bắc Kạn": { lat: 22.15, lng: 105.83, region: "bac" },
  "Lạng Sơn": { lat: 21.85, lng: 106.76, region: "bac" },
  "Tuyên Quang": { lat: 21.82, lng: 105.21, region: "bac" },
  "Thái Nguyên": { lat: 21.59, lng: 105.84, region: "bac" },
  "Phú Thọ": { lat: 21.32, lng: 105.4, region: "bac" },
  "Bắc Giang": { lat: 21.27, lng: 106.19, region: "bac" },
  "Quảng Ninh": { lat: 21.01, lng: 107.29, region: "bac" },

  // ── Miền Bắc — Đồng bằng sông Hồng ──
  "Hà Nội": { lat: 21.03, lng: 105.85, region: "bac" },
  "Vĩnh Phúc": { lat: 21.31, lng: 105.6, region: "bac" },
  "Bắc Ninh": { lat: 21.19, lng: 106.08, region: "bac" },
  "Hải Dương": { lat: 20.94, lng: 106.33, region: "bac" },
  "Hải Phòng": { lat: 20.86, lng: 106.68, region: "bac" },
  "Hưng Yên": { lat: 20.65, lng: 106.05, region: "bac" },
  "Thái Bình": { lat: 20.45, lng: 106.34, region: "bac" },
  "Hà Nam": { lat: 20.54, lng: 105.92, region: "bac" },
  "Nam Định": { lat: 20.42, lng: 106.17, region: "bac" },
  "Ninh Bình": { lat: 20.25, lng: 105.97, region: "bac" },

  // ── Miền Trung — Bắc Trung Bộ ──
  "Thanh Hoá": { lat: 19.81, lng: 105.78, region: "trung" },
  "Nghệ An": { lat: 18.67, lng: 105.68, region: "trung" },
  "Hà Tĩnh": { lat: 18.34, lng: 105.9, region: "trung" },
  "Quảng Bình": { lat: 17.47, lng: 106.62, region: "trung" },
  "Quảng Trị": { lat: 16.75, lng: 107.19, region: "trung" },
  "Thừa Thiên Huế": { lat: 16.46, lng: 107.58, region: "trung" },

  // ── Miền Trung — Nam Trung Bộ ──
  "Đà Nẵng": { lat: 16.05, lng: 108.2, region: "trung" },
  "Quảng Nam": { lat: 15.57, lng: 108.47, region: "trung" },
  "Quảng Ngãi": { lat: 15.12, lng: 108.8, region: "trung" },
  "Bình Định": { lat: 13.78, lng: 109.22, region: "trung" },
  "Phú Yên": { lat: 13.09, lng: 109.3, region: "trung" },
  "Khánh Hoà": { lat: 12.24, lng: 109.19, region: "trung" },
  "Ninh Thuận": { lat: 11.56, lng: 108.99, region: "trung" },
  "Bình Thuận": { lat: 10.93, lng: 108.1, region: "trung" },

  // ── Miền Trung — Tây Nguyên ──
  "Kon Tum": { lat: 14.35, lng: 108.0, region: "trung" },
  "Gia Lai": { lat: 13.98, lng: 108.0, region: "trung" },
  "Đắk Lắk": { lat: 12.67, lng: 108.05, region: "trung" },
  "Đắk Nông": { lat: 12.0, lng: 107.69, region: "trung" },
  "Lâm Đồng": { lat: 11.94, lng: 108.44, region: "trung" },

  // ── Miền Nam — Đông Nam Bộ ──
  "Bình Phước": { lat: 11.75, lng: 106.72, region: "nam" },
  "Tây Ninh": { lat: 11.31, lng: 106.1, region: "nam" },
  "Bình Dương": { lat: 11.0, lng: 106.65, region: "nam" },
  "Đồng Nai": { lat: 10.95, lng: 106.82, region: "nam" },
  "Bà Rịa - Vũng Tàu": { lat: 10.5, lng: 107.17, region: "nam" },
  "TP. Hồ Chí Minh": { lat: 10.78, lng: 106.7, region: "nam" },

  // ── Miền Nam — Đồng bằng sông Cửu Long ──
  "Long An": { lat: 10.54, lng: 106.41, region: "nam" },
  "Tiền Giang": { lat: 10.36, lng: 106.36, region: "nam" },
  "Bến Tre": { lat: 10.24, lng: 106.38, region: "nam" },
  "Trà Vinh": { lat: 9.94, lng: 106.34, region: "nam" },
  "Vĩnh Long": { lat: 10.25, lng: 105.97, region: "nam" },
  "Đồng Tháp": { lat: 10.46, lng: 105.63, region: "nam" },
  "An Giang": { lat: 10.39, lng: 105.44, region: "nam" },
  "Kiên Giang": { lat: 10.01, lng: 105.08, region: "nam" },
  "Cần Thơ": { lat: 10.03, lng: 105.78, region: "nam" },
  "Hậu Giang": { lat: 9.78, lng: 105.64, region: "nam" },
  "Sóc Trăng": { lat: 9.6, lng: 105.97, region: "nam" },
  "Bạc Liêu": { lat: 9.29, lng: 105.72, region: "nam" },
  "Cà Mau": { lat: 9.18, lng: 105.15, region: "nam" },
};

/**
 * Towns that are not their province capital. A pin lands here instead, so
 * "Mộc Châu" is drawn where Mộc Châu is, not 100km away in Sơn La city.
 */
export const PLACE_COORD: Record<string, { lat: number; lng: number }> = {
  "mộc châu": { lat: 20.84, lng: 104.63 },
  "hội an": { lat: 15.88, lng: 108.33 },
  "đà lạt": { lat: 11.94, lng: 108.44 },
  "sa pa": { lat: 22.34, lng: 103.84 },
  sapa: { lat: 22.34, lng: 103.84 },
  "cát bà": { lat: 20.8, lng: 107.05 },
  "phong nha": { lat: 17.59, lng: 106.28 },
  "phú quốc": { lat: 10.22, lng: 103.96 },
  "nha trang": { lat: 12.24, lng: 109.19 },
  "tràng an": { lat: 20.25, lng: 105.9 },
  "hạ long": { lat: 20.95, lng: 107.08 },
  "sài gòn": { lat: 10.78, lng: 106.7 },
  // a memory out at the islands pins on the islands, not on the mainland
  "hoàng sa": { lat: 16.53, lng: 111.6 },
  "trường sa": { lat: 8.64, lng: 111.92 },
};

/** Colloquial names, district and town names → the province they belong to. */
const ALIAS: Record<string, string> = {
  "sài gòn": "TP. Hồ Chí Minh",
  "sai gon": "TP. Hồ Chí Minh",
  "tp.hcm": "TP. Hồ Chí Minh",
  tphcm: "TP. Hồ Chí Minh",
  "hồ chí minh": "TP. Hồ Chí Minh",
  "hội an": "Quảng Nam",
  "đà lạt": "Lâm Đồng",
  "mộc châu": "Sơn La",
  "cát bà": "Hải Phòng",
  "sa pa": "Lào Cai",
  sapa: "Lào Cai",
  "phong nha": "Quảng Bình",
  "phú quốc": "Kiên Giang",
  "nha trang": "Khánh Hoà",
  huế: "Thừa Thiên Huế",
  "tràng an": "Ninh Bình",
  "hạ long": "Quảng Ninh",
  "vũng tàu": "Bà Rịa - Vũng Tàu",
  "buôn ma thuột": "Đắk Lắk",
  pleiku: "Gia Lai",
  "quy nhơn": "Bình Định",
  "phan thiết": "Bình Thuận",
  "mũi né": "Bình Thuận",
  "mỹ tho": "Tiền Giang",
  "châu đốc": "An Giang",
  "rạch giá": "Kiên Giang",
  vinh: "Nghệ An",
  "đồng hới": "Quảng Bình",
  "tam đảo": "Vĩnh Phúc",
  "hà tây": "Hà Nội",
  // districts, not provinces — they resolve to the province they belong to
  "hoàng sa": "Đà Nẵng",
  "trường sa": "Khánh Hoà",
};

export const REGION_LABEL: Record<RegionKey, string> = {
  bac: "Miền Bắc",
  trung: "Miền Trung & Tây Nguyên",
  nam: "Miền Nam",
};

/**
 * How many provincial units count as "all of Vietnam".
 *
 * The table above is the pre-2025 arrangement of 63. Vietnam reorganised to
 * 34 units around July 2025; confirm against the official decree before
 * treating either number as settled.
 */
export const PROVINCE_TARGET = 63;

export interface Resolution {
  readonly province: string | null;
  /** Why it matched — surfaced in the UI so a bad match is visible, not silent. */
  readonly rule: string;
}

/**
 * Resolve a `location` string to a province.
 *
 * Segments are read right-to-left because the province is conventionally
 * last ("Hội An, Quảng Nam"). Returning `null` is a real outcome: the UI
 * must ask rather than quietly drop the memory from the count.
 */
export function resolveProvince(raw: string): Resolution {
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/^(việt nam|vietnam|vn)$/i.test(s));

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (PROVINCES[part]) return { province: part, rule: "khớp thẳng tên tỉnh" };
    const alias = ALIAS[part.toLowerCase()];
    if (alias) return { province: alias, rule: `tên gọi khác của ${alias}` };
  }
  return { province: null, rule: "chưa nhận diện được" };
}

/** The short place label for a pin: "Mộc Châu" out of "Mộc Châu, Sơn La". */
export function placeLabel(location: string): string {
  return location.split(",")[0].trim();
}

/**
 * Where to draw the pin: the exact town when we know it, otherwise the
 * provincial capital.
 */
export function coordFor(
  province: string,
  location?: string
): readonly [number, number] | null {
  if (location) {
    const place = PLACE_COORD[placeLabel(location).toLowerCase()];
    if (place) return [place.lat, place.lng];
  }
  const p = PROVINCES[province];
  return p ? [p.lat, p.lng] : null;
}

export const regionOf = (province: string): RegionKey | undefined =>
  PROVINCES[province]?.region;

/* ---------------------------------------------------------------
   Map projection + coastline.

   Linear lat/lng → SVG units. The coastline anchors below were placed
   using this same projection from the real coordinates of well-known
   landmarks, which is why pins never land in the sea.
   --------------------------------------------------------------- */

/**
 * The drawing surface.
 *
 * Wide enough to hold Hoàng Sa and Trường Sa **at their true positions**
 * rather than in the usual corner inset: lng 102→118°E, lat 5.93→23.5°N.
 * That is why the mainland occupies only the left half — the East Sea
 * really is that big, and putting the archipelagos in a box would have
 * hidden how far apart they are.
 */
/**
 * The drawn extent of the map, as an SVG viewBox.
 *
 * The origin is NOT (0, 0): a pin's label is drawn above the pin, so the
 * northernmost labels sit at negative y - Ha Giang's reaches -27.3. The
 * extent starts at -50 to give them room. Anything that constrains the
 * view must use this origin rather than assuming zero, or those three
 * northern labels get cropped.
 */
export const MAP_VIEW = { x: 0, y: -50, width: 800, height: 1040 } as const;

/**
 * Pin and label sizing.
 *
 * Pins were drawn for a 400-unit-wide map, so on an 800-unit map they would
 * render at half size; this puts them back. Combined with `1 / zoom` it
 * keeps a pin the same size on screen at any zoom level.
 *
 * The pin *body* stays full size because it is the touch target; the label
 * was the thing crowding the map, so `.pin-tag` carries the reduction on
 * its own font-size instead.
 */
export const PIN_BASE_SCALE = MAP_VIEW.width / 400;

const LNG_ORIGIN = 102.0;
const LNG_SCALE = 50;
const LAT_ORIGIN = 23.5;
const LAT_SCALE = 59.2;

export function project(coord: readonly [number, number]): [number, number] {
  const [lat, lng] = coord;
  return [(lng - LNG_ORIGIN) * LNG_SCALE, (LAT_ORIGIN - lat) * LAT_SCALE];
}

/**
 * Anchor points of the coastline, clockwise from the north-west.
 *
 * These were first placed on the coordinates of landmark cities, which put
 * the line exactly through the likes of Quy Nhơn, Nha Trang and Phan Thiết
 * — so those provincial capitals sat *on* the boundary rather than inside
 * it. Each coastal anchor is now offset a little seaward, which both keeps
 * every pin on land and stops a coastal city being drawn half in the water.
 */
const COAST: ReadonlyArray<readonly [number, number]> = [
  [20, 62], [90, 58], [140, 25], [178, 52], [212, 47], [250, 78], [298, 117],
  [270, 148], [257, 163], [225, 190], [200, 219], [195, 284], [208, 320],
  [237, 357], [283, 417], [316, 441], [325, 455], [352, 510], [369, 576],
  [367, 666], [356, 702], [313, 748], [258, 782], [223, 806], [188, 848],
  [145, 882], [128, 843], [148, 802], [124, 777], [160, 752], [197, 726],
  [245, 686], [275, 669], [275, 527], [265, 479], [260, 432], [230, 403],
  [195, 355], [160, 302], [115, 243], [130, 196], [95, 154], [30, 112],
];

/** Catmull-Rom → cubic Bézier, so a list of points reads as a drawn line. */
export function smoothPath(
  pts: ReadonlyArray<readonly [number, number]>,
  closed: boolean
): string {
  if (pts.length < 2) return "";
  const p = closed
    ? [pts[pts.length - 1], ...pts, pts[0], pts[1]]
    : [pts[0], ...pts, pts[pts.length - 1]];

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d +=
      ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)},` +
      ` ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
      ` ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return d + (closed ? " Z" : "");
}

export const COAST_PATH = smoothPath(COAST, true);
export const COAST_POINTS = COAST;

/**
 * The two archipelagos, drawn where they actually are.
 *
 * Administratively these are districts, not provinces, so they are **not**
 * rows in PROVINCES — adding them would silently turn 63 into 65. They are
 * reached through ALIAS instead:
 *
 *   Huyện đảo Hoàng Sa  →  thành phố Đà Nẵng
 *   Huyện Trường Sa     →  tỉnh Khánh Hoà
 *
 * Placing them by real coordinates also reproduces the real geometry: from
 * the central coast out to Hoàng Sa is roughly two thirds of the run from
 * the south-central coast out to Trường Sa (~320 km against ~500 km), so
 * Hoàng Sa sits noticeably closer in than Trường Sa does.
 */
export interface Archipelago {
  /** Kept short: the map has little room, and the ring says it is a group. */
  readonly name: string;
  /** [lat, lng] of individual islands and reefs. */
  readonly islands: ReadonlyArray<readonly [number, number]>;
}

export const ARCHIPELAGOS: readonly Archipelago[] = [
  {
    name: "Hoàng Sa",
    islands: [
      [17.09, 111.51], // Đá Bắc
      [16.83, 112.34], // Đảo Phú Lâm
      [16.67, 112.73], // Đảo Linh Côn
      [16.53, 111.6], // Đảo Hoàng Sa
      [15.78, 111.2], // Đảo Tri Tôn
    ],
  },
  {
    name: "Trường Sa",
    islands: [
      [11.43, 114.33], // Song Tử Tây
      [10.92, 114.08], // Đá Subi
      [10.37, 114.36], // Đảo Ba Bình
      [10.18, 114.37], // Đảo Nam Yết
      [9.9, 115.54], // Đá Vành Khăn
      [9.88, 114.33], // Đảo Sinh Tồn
      [9.72, 115.86], // Bãi Cỏ Mây
      [9.55, 112.89], // Đá Chữ Thập
      [8.64, 111.92], // Đảo Trường Sa
      [8.17, 113.3], // Bãi Thuyền Chài
      [7.88, 112.92], // Đảo An Bang
    ],
  },
];

/** Places worth going next — drawn as hollow pins. */
export const TRAVEL_IDEAS: ReadonlyArray<{ province: string; place: string }> = [
  { province: "Lào Cai", place: "Sa Pa" },
  { province: "Ninh Bình", place: "Tràng An" },
  { province: "Quảng Bình", place: "Phong Nha" },
  { province: "Thừa Thiên Huế", place: "Huế" },
  { province: "Khánh Hoà", place: "Nha Trang" },
  { province: "Kiên Giang", place: "Phú Quốc" },
];
