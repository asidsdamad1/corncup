import Link from "next/link";
import { navItems } from "@/data/mockData";

interface NavBarProps {
  readonly activeHref?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeHref = "/" }) => {
  return (
    <>
      {/* Side Navigation Bar (Desktop) */}
      <nav className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-background-main border-r border-on-primary-fixed/10 p-stack-md space-y-stack-md z-50">
        <div className="mb-stack-lg px-2 pt-4">
          <h1 className="font-headline-md text-headline-md text-on-primary-fixed">Duyên</h1>
          <p className="font-label-sm text-label-sm text-on-primary-fixed opacity-70">Digital Sanctuary</p>
        </div>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-surface-accent text-on-primary-fixed font-bold shadow-sm translate-x-1"
                    : "text-on-primary-fixed/80 hover:bg-surface-accent/50"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-md text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto flex items-center gap-3 p-2 bg-surface-container-low rounded-xl">
          <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">diversity_1</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-label-md text-label-md truncate">Chúng mình</p>
            <p className="text-[10px] opacity-60">Couple Avatar</p>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-background-main flex justify-around items-center py-3 px-4 z-50">
        {navItems.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-on-primary-fixed font-bold relative after:content-[''] after:block after:w-1 after:h-1 after:bg-surface-accent after:rounded-full after:mt-0.5" : "text-on-primary-fixed opacity-70"
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
