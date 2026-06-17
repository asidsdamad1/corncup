"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { secretNotes, featuredCapsule } from "@/data/mockData";
import NavBar from "@/components/ui/NavBar";
import { Portal } from "@/components/ui/Portal";
import { SecretBoxPasswordPopup } from "./SecretBoxPasswordPopup";
import { SecretBoxUnlockSuccess } from "./SecretBoxUnlockSuccess";
import { CreateSecretBoxPopup } from "./CreateSecretBoxPopup";
import { SecretBoxDetailModal } from "./SecretBoxDetailModal";
import { LockedNoteEditPopup } from "./LockedNoteEditPopup";

interface SecretBoxManagementProps {
  readonly onUnlockSuccess?: () => void;
}

export const SecretBoxManagement: React.FC<Readonly<SecretBoxManagementProps>> = ({ onUnlockSuccess }) => {
  const [mounted, setMounted] = useState(false);
  const [localNotes, setLocalNotes] = useState(secretNotes);
  const [search, setSearch] = useState("");
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isUnlockSuccessOpen, setIsUnlockSuccessOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<(typeof localNotes)[0] | null>(null);
  const [editingLockedNote, setEditingLockedNote] = useState<(typeof localNotes)[0] | null>(null);
  const [countdown, setCountdown] = useState({
    days: featuredCapsule.countdownDays,
    hours: featuredCapsule.countdownHours,
    minutes: featuredCapsule.countdownMinutes,
    seconds: 0,
  });

  const isCountdownDone =
    countdown.days === 0 &&
    countdown.hours === 0 &&
    countdown.minutes === 0 &&
    countdown.seconds === 0;

  // Live countdown
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        // Stop at zero
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          return prev;
        }
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

  const lockedNotes = localNotes.filter((n) => n.isLocked);
  const unlockedNotes = localNotes.filter(
    (n) => !n.isLocked && n.title.toLowerCase().includes(search.toLowerCase())
  );

  const hasNotes = localNotes.length > 0;

  const handleUnlockSave = () => {
    setIsUnlockSuccessOpen(false);
    const newUnlockedNote = {
      id: `sn-new-${Date.now()}`,
      title: "Những điều anh chưa nói (Vừa mở)",
      previewText: "Gửi em, khi em đọc được những dòng này, có lẽ chúng ta đã cùng nhau đi qua thêm một chặng đường dài...",
      unlockDate: "Hôm nay",
      isLocked: false,
      icon: "sentiment_very_satisfied" as const,
      tags: ["Mới mở khóa", "Kỷ niệm"],
      progressPercent: 100,
      category: "Personal" as const,
    };
    setLocalNotes((prev) => [newUnlockedNote, ...prev]);
    setSelectedNote(newUnlockedNote);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">
        <div className="md:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-10 pb-24 md:pb-10 flex-1">
          <header className="flex justify-between items-center mb-stack-lg">
            <div>
              <h2 className="text-headline-md font-headline-md text-ink-primary">Secret Capsule Management</h2>
              <p className="text-body-sm font-body-sm text-primary">Gửi gắm những điều chưa nói cho tương lai của chúng ta.</p>
            </div>
          </header>
        </div>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-background-main font-body-md text-ink-primary overflow-x-hidden">
      {/* Main Content */}
      <main className="md:ml-64 min-h-screen px-margin-mobile md:px-margin-desktop py-10 pb-24 md:pb-10 flex-1">

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
              <div className="absolute top-0 right-0 w-full h-1/3 md:w-1/3 md:h-full bg-surface-accent/10 blur-[100px] pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative">
                {/* Lock Icon side */}
                <div className="w-full md:w-2/5 flex flex-col items-center">
                  <div
                    onClick={() => setIsPasswordPopupOpen(true)}
                    className="relative group cursor-pointer">
                    <div className={`absolute inset-0 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 ${isCountdownDone ? "bg-emerald-400/30" : "bg-surface-accent/20"}`} />
                    <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center backdrop-blur-md border relative transition-all duration-500 hover:scale-105 ${isCountdownDone ? "bg-emerald-500/10 border-emerald-400/30" : "bg-white/5 border-white/10"}`}>
                      <AnimatePresence mode="wait">
                        {isCountdownDone ? (
                          <motion.span
                            key="unlocked"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="material-symbols-outlined text-emerald-400"
                            style={{ fontSize: "100px", fontVariationSettings: "'FILL' 1" }}
                            suppressHydrationWarning
                          >
                            lock_open
                          </motion.span>
                        ) : (
                          <motion.span
                            key="locked"
                            exit={{ scale: 0, rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="material-symbols-outlined text-surface-accent"
                            style={{ fontSize: "100px", fontVariationSettings: "'FILL' 1" }}
                            suppressHydrationWarning
                          >
                            lock
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <AnimatePresence mode="wait">
                      {isCountdownDone ? (
                        <motion.span
                          key="badge-open"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="inline-block px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-label-md font-label-md uppercase tracking-widest"
                        >
                          Đã mở khóa ✨
                        </motion.span>
                      ) : (
                        <motion.span
                          key="badge-locked"
                          exit={{ opacity: 0, y: -8 }}
                          className="inline-block px-4 py-1.5 rounded-full bg-surface-accent/20 border border-surface-accent/30 text-surface-accent text-label-md font-label-md uppercase tracking-widest"
                        >
                          Đang khóa
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Info side */}
                <div className="w-full md:w-3/5">
                  <h3 className="text-headline-lg font-headline-lg text-white mb-4">{featuredCapsule.title}</h3>
                  <p className="text-body-lg font-body-lg text-white mb-8 max-w-lg">
                    {featuredCapsule.description}
                  </p>

                  {/* Countdown */}
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-10 flex-wrap sm:flex-nowrap">
                    {[
                      { label: "Ngày", value: pad(countdown.days) },
                      { label: "Giờ", value: pad(countdown.hours) },
                      { label: "Phút", value: pad(countdown.minutes) },
                      { label: "Giây", value: pad(countdown.seconds) },
                    ].map(({ label, value }, idx) => (
                      <div key={label} className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div
                          className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-5 sm:py-3 text-center border transition-colors duration-300 min-w-[52px] sm:min-w-[72px] ${isCountdownDone
                            ? "bg-emerald-500/15 border-emerald-400/20"
                            : "bg-white/10 border-white/5"
                            }`}
                        >
                          <span className={`block text-lg sm:text-headline-md font-headline-md tabular-nums leading-tight transition-colors duration-300 ${isCountdownDone ? "text-emerald-300" : "text-white"
                            }`}>
                            {value}
                          </span>
                          <span className={`text-[10px] sm:text-label-sm font-label-sm transition-colors duration-300 ${isCountdownDone ? "text-emerald-300/70" : "text-white"
                            }`}>
                            {label}
                          </span>
                        </div>
                        {idx < 3 && (
                          <span className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${isCountdownDone ? "text-emerald-400/50" : "text-white/30"
                            }`}>:</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCreatePopupOpen(true)}
                    className="w-full md:w-auto justify-center bg-surface-accent text-on-secondary-container px-8 py-4 rounded-xl font-headline-sm flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-surface-accent/20"
                  >
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
                  className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
                  style={{ scrollbarWidth: "none" }}
                >
                  {lockedNotes.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => setEditingLockedNote(note)}
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
                    onClick={() => setSelectedNote(note)}
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

      {isCreatePopupOpen && (
        <CreateSecretBoxPopup
          onClose={() => setIsCreatePopupOpen(false)}
          onSuccess={(data) => {
            setIsCreatePopupOpen(false);
            const parts = data.unlockDate ? data.unlockDate.split("-") : [];
            const formattedDate = parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : "Hôm nay";
            const newNote = {
              id: `sn-new-${Date.now()}`,
              title: data.title,
              previewText: data.content,
              unlockDate: formattedDate,
              isLocked: true,
              icon: "lock_clock",
              tags: ["Mới", "Đang khóa"],
              progressPercent: 20,
              category: "Tình cảm",
            };
            setLocalNotes([newNote, ...localNotes]);
          }}
        />
      )}

      {isPasswordPopupOpen && (
        <Portal>
          <SecretBoxPasswordPopup
            noteTitle={featuredCapsule.title}
            onClose={() => setIsPasswordPopupOpen(false)}
            onSuccess={() => {
              setIsPasswordPopupOpen(false);
              setIsUnlockSuccessOpen(true);
              if (onUnlockSuccess) {
                onUnlockSuccess();
              }
            }}
          />
        </Portal>
      )}

      {isUnlockSuccessOpen && (
        <Portal>
          <div className="fixed inset-0 z-[200]">
            <SecretBoxUnlockSuccess onBack={handleUnlockSave} />
          </div>
        </Portal>
      )}

      {selectedNote && (
        <SecretBoxDetailModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}

      {editingLockedNote && (
        <LockedNoteEditPopup
          note={editingLockedNote}
          onClose={() => setEditingLockedNote(null)}
          onSend={(updatedData) => {
            setLocalNotes((prev) =>
              prev.map((n) =>
                n.id === editingLockedNote.id
                  ? { ...n, title: updatedData.title, previewText: updatedData.content, category: updatedData.category }
                  : n
              )
            );
            setEditingLockedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default SecretBoxManagement;
