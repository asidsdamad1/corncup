import Link from "next/link";
import { navItems } from "@/data/mockData";

/**
 * Navigation. Layout is unchanged from before: a fixed 256px sidebar
 * on lg+ and a bottom bar on mobile. Only the surface treatment moved
 * to the craft style — the frosted-glass rail became paper with an ink
 * edge, and the mobile strip became a floating dock (DESIGN.MD §4).
 */

interface NavBarProps {
  readonly activeHref?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeHref = "/" }) => {
  return (
    <>
      {/* ---------- Sidebar (desktop) ----------
          Original treatment kept: translucent over the Soft Cornflower
          ground, white hairline edge, rounded right corner, soft shadow.
          (The old `bg-[rgba(255, 255, 255, 0.2)]` never compiled because
          of the stray spaces, so this rail has always rendered as the
          page colour itself — that is preserved here deliberately.) */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col rounded-r-[2.5rem] border-r border-white/40 px-5 py-10 shadow-[4px_0_32px_rgba(37,53,88,0.05)] backdrop-blur-xl transition-all lg:flex">
        <div className="mb-12 flex items-center gap-3 px-1">
          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent -rotate-3">
            <span
              className="material-symbols-outlined text-ink-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
              suppressHydrationWarning
            >
              favorite
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="font-headline-md text-headline-md leading-tight text-ink-primary -rotate-[0.6deg]">
              Duyên
            </h1>
            <p className="font-headline text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-primary">
              Digital Sanctuary
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                  isActive
                    ? "rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent font-semibold text-ink-primary shadow-[0_2px_0_var(--color-ink-primary)]"
                    : "rounded-2xl text-primary hover:bg-surface-accent/30 hover:text-ink-primary"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  suppressHydrationWarning
                >
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* dashed rule keeps the pen language going into the footer */}
        <hr className="rule my-5" />

        <Link href="/memories" className="btn btn-ink w-full">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Thêm kỷ niệm</span>
        </Link>
      </aside>

      {/* ---------- Floating dock (mobile) ---------- */}
      <nav
        aria-label="Điều hướng chính"
        className="dock fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-24px)] -translate-x-1/2 gap-0.5 overflow-x-auto px-2 py-1.5 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {navItems.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-none flex-col items-center gap-px rounded-2xl px-2.5 py-1.5 transition-colors ${
                isActive ? "bg-surface-accent text-ink-primary" : "text-primary"
              }`}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                suppressHydrationWarning
              >
                {item.icon}
              </span>
              <span className="font-headline text-[0.6rem] font-semibold leading-tight tracking-[0.04em]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavBar;
