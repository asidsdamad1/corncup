import Link from "next/link";
import { navItems } from "@/data/mockData";

interface NavBarProps {
  readonly activeHref?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeHref = "/" }) => {
  return (
    <>
      {/* Side Navigation Bar (Desktop) */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[rgba(255,255,255,0.2)] backdrop-blur-xl border-r border-white/40 shadow-[4px_0_32px_rgba(37,53,88,0.05)] rounded-r-[2.5rem] hidden lg:flex flex-col py-10 px-5 z-50 transition-all">
        <div className="mb-12 px-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-ink-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-ink-primary leading-tight">Duyên</h1>
            <p className="font-label-sm text-[10px] uppercase tracking-wider text-ink-primary/60">Digital Sanctuary</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col space-y-3">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-surface-accent text-ink-primary font-bold shadow-sm scale-100"
                    : "text-ink-primary/70 hover:bg-surface-accent/30 hover:text-ink-primary hover:scale-[1.02]"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button className="mt-auto bg-ink-primary text-white py-4 px-4 rounded-2xl font-label-md text-label-md hover:opacity-90 hover:-translate-y-1 transition-all shadow-lg shadow-ink-primary/20 flex items-center justify-center space-x-2">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Add New Memory</span>
        </button>
      </aside>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-background-main flex justify-around items-center py-3 px-4 z-50 border-t border-ink-primary/5">
        {navItems.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-ink-primary font-bold relative after:content-[''] after:block after:w-1.5 after:h-1.5 after:bg-surface-accent after:rounded-full after:mt-0.5" : "text-on-primary-fixed opacity-70"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
              <span className="font-label-sm text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default NavBar;
