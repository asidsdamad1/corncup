"use client";

import { useState, useEffect } from "react";
import { secretNotes, featuredCapsule } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";

interface SecretBoxManagementProps { }

export const SecretBoxManagement: React.FC<Readonly<SecretBoxManagementProps>> = () => {
  const [search, setSearch] = useState("");
  const [countdown, setCountdown] = useState({
    days: featuredCapsule.countdownDays,
    hours: featuredCapsule.countdownHours,
    minutes: featuredCapsule.countdownMinutes,
    seconds: 0,
  });

  // Live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lockedNotes = secretNotes.filter((n) => n.isLocked);
  const unlockedNotes = secretNotes.filter(
    (n) => !n.isLocked && n.title.toLowerCase().includes(search.toLowerCase())
  );

  const hasNotes = secretNotes.length > 0;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">
      {/* Main Content */}
      <main className="md:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-10 pb-24 md:pb-10 w-[1200px]">

        {/* Header Actions */}
        <header className="flex justify-between items-center mb-stack-lg">
          <div>
            <h2 className="text-headline-md font-headline-md text-ink-primary">Secret Capsule Management</h2>
            <p className="text-body-sm font-body-sm text-primary">Gửi gắm những điều chưa nói cho tương lai của chúng ta.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="material-symbols-outlined p-2 text-primary hover:bg-white/30 rounded-full transition-colors"
              aria-label="Thông báo"
            >
              notifications
            </button>
            <button
              className="material-symbols-outlined p-2 text-primary hover:bg-white/30 rounded-full transition-colors"
              aria-label="Yêu thích"
            >
              favorite
            </button>
          </div>
        </header>

        {hasNotes ? (
          <>
            {/* ── Hero: Featured Locked Capsule ── */}
            <section
              className="bg-ink-primary rounded-[2rem] p-8 mb-stack-lg relative overflow-hidden"
              style={{ boxShadow: "0 4px 15px rgba(37,53,88,0.08)" }}
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-accent/10 blur-[100px] pointer-events-none" />

              <div className="flex lg:flex-row gap-12 items-center relative z-10">
                {/* Lock Icon side */}
                <div className="w-full lg:w-2/5 flex flex-col items-center">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-surface-accent/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700" />
                    <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 relative transition-transform duration-500 hover:scale-105">
                      <span
                        className="material-symbols-outlined text-surface-accent"
                        style={{ fontSize: "100px", fontVariationSettings: "'FILL' 1" }}
                      >
                        lock
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <span className="px-4 py-1.5 rounded-full bg-surface-accent/20 border border-surface-accent/30 text-surface-accent text-label-md font-label-md uppercase tracking-widest">
                      Đang khóa
                    </span>
                  </div>
                </div>

                {/* Info side */}
                <div className="w-full lg:w-3/5">
                  <h3 className="text-headline-lg font-headline-lg text-white mb-4">{featuredCapsule.title}</h3>
                  <p className="text-body-lg font-body-lg text-white mb-8 max-w-lg">
                    {featuredCapsule.description}
                  </p>

                  {/* Countdown */}
                  <div className="grid grid-cols-3 gap-4 mb-10 max-w-md">
                    {[
                      { label: "Ngày", value: pad(countdown.days) },
                      { label: "Giờ", value: pad(countdown.hours) },
                      { label: "Phút", value: pad(countdown.minutes) },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-white/10 rounded-2xl p-4 text-center border border-white/5"
                      >
                        <span className="block text-headline-md font-headline-md text-white tabular-nums">
                          {value}
                        </span>
                        <span className="text-label-sm font-label-sm text-white">{label}</span>
                      </div>
                    ))}
                  </div>

                  <button className="bg-surface-accent text-on-secondary-container px-8 py-4 rounded-xl font-headline-sm flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-surface-accent/20">
                    <span className="material-symbols-outlined">add_circle</span>
                    Gửi thêm bí mật
                  </button>
                </div>
              </div>
            </section>

            {/* ── Pending / Waiting to Unlock ── */}
            {lockedNotes.length > 0 && (
              <section className="mb-stack-lg">
                <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Đang chờ mở khóa
                </h3>
                <div
                  className="flex gap-4 overflow-x-auto pb-4"
                  style={{ scrollbarWidth: "none" }}
                >
                  {lockedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="min-w-[280px] bg-white/40 backdrop-blur-sm p-5 rounded-2xl border border-white/20 flex flex-col gap-3 cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                      style={{ boxShadow: "0 4px 15px rgba(37,53,88,0.08)" }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-xl">
                            {note.icon ?? "lock"}
                          </span>
                        </div>
                        <span className="text-label-sm font-label-sm text-primary bg-white/60 px-2 py-1 rounded-lg">
                          {note.unlockDate}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-body-md">{note.title}</h4>
                        <p className="text-body-sm text-primary/70 line-clamp-1">{note.previewText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── Search & Filter ── */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-4 mb-stack-md bg-white/10 p-4 rounded-2xl border border-white/20">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/80 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-surface-accent transition-all text-body-md placeholder:text-primary/40"
                  placeholder="Tìm kiếm kỷ niệm..."
                />
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="text-label-md font-label-md text-primary">Sắp xếp:</span>
                <select className="bg-white/80 border-none rounded-xl px-4 py-3 text-label-md font-label-md text-ink-primary focus:ring-2 focus:ring-surface-accent">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>A - Z</option>
                </select>
              </div>
            </section>

            {/* ── Unlocked Memories (Masonry Grid) ── */}
            <section className="mb-stack-lg">
              <h3 className="text-headline-sm font-headline-sm text-ink-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                Kỷ niệm đã mở
              </h3>
              <div className="masonry-grid">
                {unlockedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="masonry-item bg-surface-text-container rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                    style={{ boxShadow: "0 4px 15px rgba(37,53,88,0.08)" }}
                  >
                    {/* Cover image — tall variant for sn-6, standard h-48 for others */}
                    {note.coverImage && note.id === "sn-6" && (
                      <div className="h-64 w-full relative">
                        <img
                          src={note.coverImage}
                          alt={note.coverImageAlt ?? note.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-ink-primary/80 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <p className="text-label-sm font-label-sm text-white">{note.unlockDate}</p>
                        </div>
                      </div>
                    )}
                    {note.coverImage && note.id !== "sn-6" && (
                      <div className="h-48 w-full relative">
                        <img
                          src={note.coverImage}
                          alt={note.coverImageAlt ?? note.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <p className="text-label-sm font-label-sm text-ink-primary">{note.unlockDate}</p>
                        </div>
                      </div>
                    )}

                    {/* Text-only with icon badge */}
                    {note.isTextOnly && note.icon && (
                      <div className="p-6 pb-0">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-full bg-surface-accent flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-sm">{note.icon}</span>
                          </div>
                          <p className="text-label-sm font-label-sm text-primary/60">{note.unlockDate}</p>
                        </div>
                      </div>
                    )}

                    {/* Text-only without icon */}
                    {note.isTextOnly && !note.icon && (
                      <div className="p-6 pb-0">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="bg-surface-accent/20 p-2 rounded-lg">
                            <span className="material-symbols-outlined text-surface-accent">history_edu</span>
                          </div>
                          <p className="text-label-sm font-label-sm text-primary/60">{note.unlockDate}</p>
                        </div>
                      </div>
                    )}

                    {/* No image and no explicit icon (gradient placeholder) */}
                    {!note.coverImage && !note.isTextOnly && (
                      <div className="h-40 w-full bg-gradient-to-br from-surface-accent/20 to-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-primary/20">auto_stories</span>
                      </div>
                    )}

                    {/* Card body */}
                    <div className="p-6">
                      <h4 className="text-headline-sm font-headline-sm mb-2">{note.title}</h4>
                      <p className="text-body-sm text-primary/80 line-clamp-3">{note.previewText}</p>

                      {note.tags && note.tags.length > 0 && (
                        <div className="mt-6 flex gap-2 flex-wrap">
                          {note.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-primary/5 text-primary text-[10px] px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {note.coverImage && !note.id.includes("sn-6") && (
                        <div className="mt-4 flex items-center gap-2 text-surface-accent">
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          <span className="text-label-sm font-label-sm">Xem chi tiết</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Empty State */
          <section className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-primary text-6xl opacity-40">auto_stories</span>
            </div>
            <h3 className="text-headline-md font-headline-md text-ink-primary mb-3">Chưa có điều bí mật nào</h3>
            <p className="text-body-lg font-body-lg text-on-primary-container max-w-md mx-auto mb-10">
              Hãy bắt đầu viết xuống những tâm tư, lời nhắn nhủ hay những kỷ niệm sắp tới để gửi cho nhau trong tương lai.
            </p>
            <button className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-xl font-label-md shadow-lg hover:scale-105 transition-transform">
              Tạo hộp thư đầu tiên
            </button>
          </section>
        )}
      </main>

      {/* Synchronized Sidebar */}
      <NavBar activeHref="/secrets" />

      {/* Masonry CSS + custom styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .masonry-grid {
            column-count: 1;
            column-gap: 1.5rem;
          }
          @media (min-width: 768px) { .masonry-grid { column-count: 2; } }
          @media (min-width: 1024px) { .masonry-grid { column-count: 3; } }
          .masonry-item {
            break-inside: avoid;
            margin-bottom: 1.5rem;
          }
        `
      }} />
    </div>
  );
};

export default SecretBoxManagement;
