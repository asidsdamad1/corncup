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

export const SecretBoxManagement: React.FC<Readonly<SecretBoxManagementProps>> = ({
  onUnlockSuccess,
}) => {
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

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) return prev;
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
      previewText:
        "Gửi em, khi em đọc được những dòng này, có lẽ chúng ta đã cùng nhau đi qua thêm một chặng đường dài...",
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

  const pageHeader = (
    <header className="mb-stack-lg flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="font-headline text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary -rotate-2">
          Duyên · Secret Locked Notes
        </p>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-ink-primary -rotate-[0.6deg]">
          Hộp bí mật
        </h2>
        <p className="font-body-md text-body-md mt-2 max-w-[52ch] text-primary">
          Gửi gắm những điều chưa nói cho tương lai của chúng ta.
        </p>
      </div>
      <div className="flex flex-none items-center gap-2">
        <button className="btn btn-icon" aria-label="Thông báo">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="btn btn-icon" aria-label="Yêu thích">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
    </header>
  );

  if (!mounted) {
    return (
      <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
        <div className="min-h-screen flex-1 px-margin-mobile py-10 pb-32 md:px-margin-desktop lg:ml-64 lg:pb-10">
          {pageHeader}
        </div>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen overflow-x-hidden font-body-md text-ink-primary">
      {/* NOTE: offset is lg:ml-64 to match NavBar's `lg:flex` sidebar.
          It was md:ml-64 before, which shifted content at md with no
          sidebar actually present. */}
      <main className="min-h-screen flex-1 px-margin-mobile py-10 pb-32 md:px-margin-desktop lg:ml-64 lg:pb-10">
        {pageHeader}

        {hasNotes ? (
          <>
            {/* ── Hero: Featured Locked Capsule ── */}
            <section className="card card-ink card-flat mb-stack-lg p-8">
              <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-12">
                {/* Lock */}
                <div className="flex w-full flex-col items-center md:w-2/5">
                  <button
                    onClick={() => setIsPasswordPopupOpen(true)}
                    className="group relative"
                    aria-label="Mở khóa hộp bí mật"
                  >
                    <span
                      className={`flex h-48 w-48 items-center justify-center rounded-full border-[2.6px] transition-all duration-500 hover:scale-105 md:h-64 md:w-64 ${
                        isCountdownDone
                          ? "border-mint bg-mint/15"
                          : "border-surface-accent bg-paper/10"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isCountdownDone ? (
                          <motion.span
                            key="unlocked"
                            initial={{ scale: 0, rotate: -180, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="material-symbols-outlined text-mint"
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
                    </span>
                  </button>

                  <div className="mt-8 text-center">
                    <AnimatePresence mode="wait">
                      {isCountdownDone ? (
                        <motion.span
                          key="badge-open"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="chip border-mint bg-mint/20 text-paper"
                        >
                          Đã mở khóa ✨
                        </motion.span>
                      ) : (
                        <motion.span
                          key="badge-locked"
                          exit={{ opacity: 0, y: -8 }}
                          className="chip chip-accent"
                        >
                          Đang khóa
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Info */}
                <div className="w-full md:w-3/5">
                  <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4 text-paper -rotate-[0.6deg]">
                    {featuredCapsule.title}
                  </h3>
                  <p className="font-body-lg text-body-lg mb-8 max-w-lg text-primary-fixed">
                    {featuredCapsule.description}
                  </p>

                  {/* Countdown — each unit is a stamped tile */}
                  <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-3 md:justify-start">
                    {[
                      { label: "Ngày", value: pad(countdown.days) },
                      { label: "Giờ", value: pad(countdown.hours) },
                      { label: "Phút", value: pad(countdown.minutes) },
                      { label: "Giây", value: pad(countdown.seconds) },
                    ].map(({ label, value }, idx) => (
                      <div key={label} className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <div
                          className={`min-w-[52px] rounded-[var(--radius-wobble-sm)] border-[2.2px] px-3 py-2 text-center transition-colors duration-300 sm:min-w-[72px] sm:px-5 sm:py-3 ${
                            isCountdownDone
                              ? "border-mint bg-mint/15"
                              : "border-paper/40 bg-paper/10"
                          } ${idx % 2 ? "rotate-[1deg]" : "-rotate-[1.2deg]"}`}
                        >
                          <span
                            className={`font-headline block text-lg font-bold leading-tight tabular-nums sm:text-2xl ${
                              isCountdownDone ? "text-mint" : "text-paper"
                            }`}
                          >
                            {value}
                          </span>
                          <span
                            className={`font-headline text-[0.54rem] font-semibold uppercase tracking-[0.2em] ${
                              isCountdownDone ? "text-mint/80" : "text-primary-fixed"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                        {idx < 3 && (
                          <span
                            className={`font-headline text-lg font-bold sm:text-xl ${
                              isCountdownDone ? "text-mint/50" : "text-paper/40"
                            }`}
                          >
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsCreatePopupOpen(true)}
                    className="btn btn-accent w-full px-8 py-4 md:w-auto"
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
                <h3 className="font-headline-sm text-headline-sm mb-4 flex items-center gap-2 text-ink-primary">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  Đang chờ mở khóa
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
                  {lockedNotes.map((note, i) => (
                    <button
                      key={note.id}
                      onClick={() => setEditingLockedNote(note)}
                      className={`card flex min-w-[280px] flex-col gap-3 p-5 text-left transition-transform duration-300 hover:-translate-y-1 ${
                        i % 2 ? "card-tilt-r" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-background-main">
                          <span className="material-symbols-outlined text-xl text-ink-primary">
                            {note.icon ?? "lock"}
                          </span>
                        </span>
                        <span className="chip chip-soft">{note.unlockDate}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-headline-sm text-headline-sm text-ink-primary">
                          {note.title}
                        </h4>
                        <p className="font-body-sm text-body-sm line-clamp-1 text-primary">
                          {note.previewText}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* ── Search & Sort ── */}
            <section className="sheet mb-stack-md flex flex-col items-center justify-between gap-4 p-4 md:flex-row">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  search
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="field pl-12"
                  placeholder="Tìm kiếm kỷ niệm..."
                  aria-label="Tìm kiếm kỷ niệm"
                />
              </div>
              <div className="flex items-center gap-3 self-end md:self-auto">
                <span className="font-label-md text-label-md text-primary">Sắp xếp:</span>
                <select className="field w-auto" aria-label="Sắp xếp">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                  <option>A - Z</option>
                </select>
              </div>
            </section>

            {/* ── Unlocked Memories (Masonry) ── */}
            <section className="mb-stack-lg">
              <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2 text-ink-primary">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                Kỷ niệm đã mở
              </h3>

              <div className="masonry-grid">
                {unlockedNotes.map((note, i) => (
                  <button
                    key={note.id}
                    onClick={() => setSelectedNote(note)}
                    className={`masonry-item card block w-full overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 ${
                      i % 2 ? "card-tilt-r" : ""
                    }`}
                  >
                    {/* Cover */}
                    {note.coverImage && (
                      <div className="relative w-full">
                        <img
                          src={note.coverImage}
                          alt={note.coverImageAlt ?? note.title}
                          className={`w-full object-cover ${
                            note.id === "sn-6" ? "h-64" : "h-48"
                          }`}
                        />
                        <span
                          className={`chip absolute ${
                            note.id === "sn-6" ? "bottom-4 right-4" : "left-4 top-4"
                          }`}
                        >
                          {note.unlockDate}
                        </span>
                      </div>
                    )}

                    {/* Text-only header */}
                    {note.isTextOnly && (
                      <div className="flex items-center justify-between gap-3 px-6 pt-6">
                        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[var(--radius-wobble-sm)] border-[2.2px] border-ink-primary bg-surface-accent">
                          <span className="material-symbols-outlined text-base text-ink-primary">
                            {note.icon ?? "history_edu"}
                          </span>
                        </span>
                        <span className="chip chip-soft">{note.unlockDate}</span>
                      </div>
                    )}

                    {/* Placeholder */}
                    {!note.coverImage && !note.isTextOnly && (
                      <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-surface-accent/40 to-background-main/40">
                        <span className="material-symbols-outlined text-6xl text-primary/40">
                          auto_stories
                        </span>
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-6">
                      <h4 className="font-headline-sm text-headline-sm mb-2 text-ink-primary">
                        {note.title}
                      </h4>
                      <div className="ruled">
                        <p className="line-clamp-3 text-ink-primary">{note.previewText}</p>
                      </div>

                      {note.tags && note.tags.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <span key={tag} className="chip chip-blue">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {note.coverImage && !note.id.includes("sn-6") && (
                        <>
                          <hr className="rule my-4" />
                          <span className="font-label-sm text-label-sm flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-base">visibility</span>
                            Xem chi tiết
                          </span>
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* ── Empty State ── */
          <section className="flex flex-col items-center justify-center py-20 text-center">
            <div className="card-dashed mb-8 flex h-48 w-48 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-6xl text-primary/50">
                auto_stories
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md mb-3 text-ink-primary -rotate-[0.5deg]">
              Chưa có điều bí mật nào
            </h3>
            <p className="font-body-lg text-body-lg mx-auto mb-10 max-w-md text-primary">
              Hãy bắt đầu viết xuống những tâm tư, lời nhắn nhủ hay những kỷ niệm sắp tới để gửi cho
              nhau trong tương lai.
            </p>
            <button onClick={() => setIsCreatePopupOpen(true)} className="btn btn-accent px-10 py-4">
              <span className="material-symbols-outlined">add_circle</span>
              Tạo hộp thư đầu tiên
            </button>
          </section>
        )}
      </main>

      <NavBar activeHref="/secrets" />

      {/* ---------- Overlays ---------- */}
      <AnimatePresence>
        {isCreatePopupOpen && (
          <CreateSecretBoxPopup
            onClose={() => setIsCreatePopupOpen(false)}
            onSuccess={(data) => {
              setIsCreatePopupOpen(false);
              const parts = data.unlockDate ? data.unlockDate.split("-") : [];
              const formattedDate =
                parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : "Hôm nay";
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
      </AnimatePresence>

      <AnimatePresence>
        {isPasswordPopupOpen && (
          <SecretBoxPasswordPopup
            noteTitle={featuredCapsule.title}
            onClose={() => setIsPasswordPopupOpen(false)}
            onSuccess={() => {
              setIsPasswordPopupOpen(false);
              setIsUnlockSuccessOpen(true);
              onUnlockSuccess?.();
            }}
          />
        )}
      </AnimatePresence>

      {isUnlockSuccessOpen && (
        <Portal>
          <div className="fixed inset-0 z-[200] overflow-y-auto bg-background-main">
            <SecretBoxUnlockSuccess onBack={handleUnlockSave} />
          </div>
        </Portal>
      )}

      <AnimatePresence>
        {selectedNote && (
          <SecretBoxDetailModal note={selectedNote} onClose={() => setSelectedNote(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingLockedNote && (
          <LockedNoteEditPopup
            note={editingLockedNote}
            onClose={() => setEditingLockedNote(null)}
            onSend={(updatedData) => {
              setLocalNotes((prev) =>
                prev.map((n) =>
                  n.id === editingLockedNote.id
                    ? {
                        ...n,
                        title: updatedData.title,
                        previewText: updatedData.content,
                        category: updatedData.category,
                      }
                    : n
                )
              );
              setEditingLockedNote(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretBoxManagement;
