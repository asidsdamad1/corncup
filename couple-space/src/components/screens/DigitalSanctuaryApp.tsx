"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { navItems } from "@/data/mockData";

// Mobile-first Digital Sanctuary App screen (390px design)
interface DigitalSanctuaryAppProps {
  readonly userName?: string;
}

export const DigitalSanctuaryApp: React.FC<DigitalSanctuaryAppProps> = ({
  userName = "Duyên",
}) => {
  return (
    <div className="min-h-screen bg-background-main max-w-[390px] mx-auto">
      {/* Status bar area */}
      <div className="h-10 bg-background-main" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-label-sm text-on-surface-variant">Chào buổi sáng 🌸</p>
            <h1 className="font-headline text-headline-lg-mobile text-ink-primary">{userName}</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-accent flex items-center justify-center">
            <span className="text-xl">👩</span>
          </div>
        </div>
      </motion.header>

      {/* Quick stats */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Kỷ niệm", value: "3", icon: "photo_album" },
            { label: "Hộp bí mật", value: "2", icon: "lock" },
            { label: "Hẹn hò", value: "1", icon: "favorite" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface-text-container rounded-[20px] p-3 text-center">
              <span className="material-symbols-outlined text-ink-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <p className="font-headline text-headline-sm text-ink-primary mt-1">{stat.value}</p>
              <p className="text-label-sm text-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Today's emotion */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-ink-primary rounded-[24px] p-5 text-white"
        >
          <p className="text-label-md mb-2 opacity-80">Hôm nay em cảm thấy...</p>
          <div className="flex gap-3">
            {["😊", "🥰", "😌", "🤩", "😔"].map((emoji) => (
              <button key={emoji} className="text-3xl hover:scale-125 transition-transform active:scale-110">{emoji}</button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Latest memory */}
      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-text-container rounded-[24px] overflow-hidden"
        >
          <div className="relative h-40">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmGZOIJuXayxaoC_cqksAufZucXAxKfjrb9dHF7o8_7uyqWp8IciWXR9_0xXW4agqWo7lYMfkTrvgQJJPLx9tlO6Hy1jN2sYIUDO-OMEobSCZelWyh3dovCIAtxiVjGWwGys3xobFJOuAET-jgLEQXz_wXZqM8jSA-5Vc1fq32oBGanOwDfolHsraiPEkULsaAvTC-Fl1UQfWoYINxx_cWqiz-Eh4-8NHqdCE0lnjj0TN4wqDIbWF8ylzGC334tfCwjt3rrZ5wryY"
              alt="Hà Giang"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/390x160/b2ccec/253558?text=Kỷ+niệm"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/60 to-transparent" />
            <span className="absolute bottom-3 left-3 bg-surface-accent text-ink-primary text-label-sm px-2 py-0.5 rounded-md">Kỷ niệm</span>
          </div>
          <div className="p-4">
            <p className="text-body-md italic text-ink-primary">"Giữa mây ngàn Hà Giang..."</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-surface-text-container/95 backdrop-blur border-t border-outline-variant">
        <div className="flex justify-around p-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-ink-primary text-xl">{item.icon}</span>
              <span className="text-[10px] text-on-surface-variant">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      <div className="h-24" />
    </div>
  );
};

export default DigitalSanctuaryApp;
