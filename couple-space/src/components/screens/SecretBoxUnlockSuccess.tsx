"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/ui/NavBar";

interface SecretBoxUnlockSuccessProps {
  readonly onBack?: () => void;
}

export const SecretBoxUnlockSuccess: React.FC<SecretBoxUnlockSuccessProps> = ({ onBack }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col bg-background-main/95 backdrop-blur-md group/design-root overflow-x-hidden overflow-y-auto selection:bg-surface-accent selection:text-ink-primary">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-4 md:px-20 lg:px-40">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-col md:flex-row gap-6 h-full mt-10 md:mt-0">


              {/* Main Content Area */}
              <main className="flex-1 flex flex-col gap-6">
                {/* Top App Bar */}
                <header className="flex items-center justify-between whitespace-nowrap bg-white/80 backdrop-blur-md rounded-xl px-6 py-4 shadow-sm border border-white/20">
                  <div className="flex items-center gap-4 text-ink-primary">
                    <button onClick={onBack} className="text-primary hover:bg-surface-accent p-2 rounded-full transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="size-6 text-primary">
                      <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <h2 className="text-ink-primary text-lg font-bold leading-tight tracking-tight">Hộp thư bí mật</h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-surface-text-container text-ink-primary transition-colors hover:bg-surface-accent">
                      <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-surface-text-container text-ink-primary transition-colors hover:bg-surface-accent">
                      <span className="material-symbols-outlined">account_circle</span>
                    </button>
                  </div>
                </header>

                {/* Section Headers */}
                <div className="flex flex-col gap-1 px-2">
                  <h1 className="text-ink-primary text-3xl font-bold tracking-tight">Mở khóa thành công</h1>
                  <p className="text-on-primary-container text-sm font-medium">Những điều chưa nói, nay đã được hé lộ</p>
                </div>

                {/* Content Card */}
                <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-white/40">
                  {/* Hero Image */}
                  <div
                    className="w-full h-64 bg-center bg-no-repeat bg-cover relative"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB_LYSljqnhT2XTv0YCVaG3a6CwNbfV-XT3Sw3cCWCeZw2wJLpDwPOHMF-rkO_L4gFMB5bzUowTlphGlTWdiy4w5d-JNm565HLI5V2DVMHmltZRgYnY0_aRSDETcz-rLDJ36aBGNOMwFMHQS3gccl1Ed9v3pjk5nBKZsxxH716YEj-5xxT5XxrkMKNZdzSNI4_PdjFUELXeoMMnnDfbAvIYJ2ApwqNsDEEWIl1MbU3kVgzfcmbtNSX9EWCP6dI5EacE2cnc4qo4J-U")',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold">Những điều anh chưa nói</h3>
                        <p className="text-sm opacity-90 flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs">calendar_today</span>
                          Ngày khóa: 14 Tháng 2, 2023 • Ngày mở: Hôm nay
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-surface-accent px-3 py-1 rounded-full text-ink-primary text-xs font-bold shadow-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">lock_open</span>
                      Đã giải mã
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-8 flex flex-col gap-6 bg-white">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-ink-primary opacity-60">
                        <span className="material-symbols-outlined text-lg">edit_note</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Bản ghi cảm xúc</span>
                      </div>
                      <div className="p-6 text-ink-primary text-lg md:text-xl font-body-md italic rounded-lg bg-surface-text-container/50 border-l-4 border-surface-accent leading-relaxed">
                        Gửi em, khi em đọc được những dòng này, có lẽ chúng ta đã cùng nhau đi qua thêm một chặng đường dài. Anh viết những dòng này vào một buổi chiều mưa của năm ngoái, lúc em đang say giấc nồng.
                        <br />
                        <br />
                        Anh muốn nói rằng mỗi khoảnh khắc bên em đều là một món quà vô giá mà cuộc đời đã dành tặng anh. Có những lúc anh vụng về chẳng thể diễn tả hết bằng lời, nên anh gửi gắm vào đây - một &quot;Hộp bí mật&quot; chờ ngày em tự tay mở ra.
                        <br />
                        <br />
                        Cảm ơn em đã kiên nhẫn, đã yêu thương và đã là bến đỗ bình yên nhất của anh. Anh yêu em nhiều hơn những gì anh có thể nói.
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-container">
                      <div className="flex items-center gap-2 bg-surface-accent/20 px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-ink-primary text-sm">sentiment_very_satisfied</span>
                        <span className="text-ink-primary text-xs font-bold">Xúc động</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-accent/20 px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-ink-primary text-sm">church</span>
                        <span className="text-ink-primary text-xs font-bold">Kỷ niệm Đà Lạt</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="bg-surface-text-container p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-ink-primary text-white rounded-lg font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-ink-primary/20">
                        <span className="material-symbols-outlined text-lg">auto_awesome</span>
                        Lưu vào Hành trình
                      </button>
                      <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink-primary text-ink-primary rounded-lg font-bold text-sm transition-colors hover:bg-ink-primary/5 active:scale-95">
                        <span className="material-symbols-outlined text-lg">share</span>
                        Chia sẻ
                      </button>
                    </div>
                    <button onClick={onBack} className="flex items-center gap-2 text-primary hover:text-ink-primary font-medium text-sm py-2 px-4 transition-colors">
                      <span className="material-symbols-outlined text-lg">lock_reset</span>
                      Khóa lại vào hộp
                    </button>
                  </div>
                </div>

                {/* Footer Meta */}
                <footer className="flex justify-center py-4">
                  <p className="text-ink-primary/40 text-xs font-medium">Digital Sanctuary © 2024 • Private &amp; Encrypted</p>
                </footer>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti unlock transition overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-ink-primary z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
              animate={{ scale: 1.2, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.2
              }}
              className="text-surface-accent mb-4"
            >
              <span className="material-symbols-outlined text-8xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock_open</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white text-2xl font-bold tracking-widest"
            >
              BÍ MẬT ĐÃ MỞ
            </motion.h2>

            {/* Simulated Confetti / Sparks */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0.5],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400 - 100
                }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                className="absolute w-3 h-3 rounded-full bg-surface-accent"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecretBoxUnlockSuccess;
