"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecretLockedNoteProps {
  noteContent: string;
  expectedPasscode: string;
}

export default function SecretLockedNote({ noteContent, expectedPasscode }: SecretLockedNoteProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (passcode === expectedPasscode) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPasscode("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="bg-container rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto mt-8 border-2 border-accent">
      <h2 className="text-primary text-xl font-bold mb-4 flex items-center gap-2">
        <span>🔒</span> Secret Locked Note
      </h2>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-4"
          >
            <p className="text-primary/80 text-sm">
              This note is locked. Enter the passcode to reveal unexpressed thoughts.
            </p>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className={`w-full bg-main text-primary placeholder-primary/50 rounded-xl p-3 focus:outline-none focus:ring-2 ${
                error ? "focus:ring-red-500 border-red-500 border" : "focus:ring-accent"
              }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">Incorrect passcode</p>}
            <button
              onClick={handleUnlock}
              className="w-full bg-primary text-main font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Unlock Note
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-main p-4 rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 text-6xl opacity-10">✨</div>
            <p className="text-primary whitespace-pre-wrap relative z-10 font-serif italic text-lg leading-relaxed">
              "{noteContent}"
            </p>
            <button
              onClick={() => setIsUnlocked(false)}
              className="text-xs text-primary/60 hover:text-primary mt-4 underline relative z-10"
            >
              Lock again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
