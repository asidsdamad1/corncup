"use client";

import { motion } from "framer-motion";
import NavBar from "@/components/ui/NavBar";
import Card from "@/components/ui/Card";
import { memories } from "@/data/mockData";

interface MemoryJourneyDetailProps {
  readonly memoryId?: string;
}

export const MemoryJourneyDetail: React.FC<MemoryJourneyDetailProps> = ({ memoryId = "1" }) => {
  const memory = memories.find((m) => m.id === memoryId) ?? memories[0];

  const timelineEvents = [
    { time: "06:00", label: "Xuất phát từ Hà Nội", icon: "directions_car" },
    { time: "12:30", label: "Đến Đồng Văn", icon: "location_on" },
    { time: "15:00", label: "Khám phá Cột cờ Lũng Cú", icon: "flag" },
    { time: "19:00", label: "Ăn tối tại nhà hàng địa phương", icon: "restaurant" },
    { time: "21:00", label: "Ngắm sao trời cao nguyên đá", icon: "nights_stay" },
  ];

  return (
    <div className="min-h-screen bg-background-main">
      <main className="lg:ml-64 pb-24 max-w-3xl mx-auto">
        {/* Hero */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={memory.coverImage}
            alt={memory.coverImageAlt}
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400/b2ccec/253558?text=Kỷ+niệm"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-main" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-ink-primary/20" />
          <button
            onClick={() => history.back()}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-surface-text-container/80 backdrop-blur flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-ink-primary">arrow_back</span>
          </button>
        </div>

        <div className="p-margin-mobile lg:p-margin-desktop -mt-12 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {memory.tags.map((tag) => (
              <span key={tag} className="bg-surface-accent text-ink-primary text-label-sm px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <h1 className="font-headline text-headline-lg text-ink-primary mb-1">{memory.title}</h1>
          <p className="text-body-md text-on-surface-variant flex items-center gap-2 mb-stack-md">
            <span className="material-symbols-outlined text-sm">location_on</span>
            {memory.location} · {new Date(memory.date).toLocaleDateString("vi-VN")}
          </p>

          {/* Quote */}
          <Card className="p-stack-md mb-stack-md">
            <p className="text-body-lg italic text-ink-primary">"{memory.quote}"</p>
          </Card>

          {/* Timeline */}
          <Card className="p-stack-md mb-stack-md">
            <h2 className="font-headline text-headline-sm text-ink-primary mb-4">Lịch trình ngày</h2>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-outline-variant" />
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 mb-4 relative"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-accent flex items-center justify-center flex-shrink-0 relative z-10">
                    <span className="material-symbols-outlined text-ink-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{event.icon}</span>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-label-sm text-on-surface-variant">{event.time}</p>
                    <p className="text-body-md text-ink-primary">{event.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Photo gallery */}
          <Card className="p-stack-md">
            <h2 className="font-headline text-headline-sm text-ink-primary mb-3">Ảnh kỷ niệm</h2>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-background-main overflow-hidden flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline-variant text-2xl">image</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
      <NavBar activeHref="/memories" />
    </div>
  );
};

export default MemoryJourneyDetail;
