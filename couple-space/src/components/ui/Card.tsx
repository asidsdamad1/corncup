/**
 * Two distinct surfaces — see DESIGN.MD §4 "Cards and sheets".
 *
 *  Sheet — the page's own paper. Warm, generously rounded, lifted,
 *          no border, no rotation. Use for a section container.
 *  Card  — something *placed on* the paper. Ink outline, wobble
 *          radius, half a degree of rotation. Use for discrete items.
 *
 * Most existing call sites of the old single `Card` want `Sheet`.
 */

interface SurfaceProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export const Sheet: React.FC<SurfaceProps> = ({ children, className = "" }) => (
  <div className={`sheet ${className}`}>{children}</div>
);

interface CardProps extends SurfaceProps {
  /** Tilt the other way. Alternate down a list so it never looks mechanical. */
  readonly tilt?: "left" | "right" | "none";
  /** Surface variant. `dashed` is the empty state. */
  readonly variant?: "paper" | "accent" | "wash" | "ink" | "dashed";
}

const TILT = { left: "", right: "card-tilt-r", none: "card-flat" } as const;

const VARIANT = {
  paper: "card",
  accent: "card card-accent",
  wash: "card card-wash",
  ink: "card card-ink",
  dashed: "card-dashed",
} as const;

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  tilt = "left",
  variant = "paper",
}) => (
  <div className={`${VARIANT[variant]} ${TILT[tilt]} ${className}`}>{children}</div>
);

export default Card;
