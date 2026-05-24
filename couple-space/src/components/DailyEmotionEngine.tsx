"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabState = "FOR_ME" | "FOR_YOU" | "FOR_US";

type EmotionType = "HAPPY" | "SAD" | "ANGRY" | "EXCITED" | "CALM";

const emotions: { type: EmotionType; label: string; emoji: string }[] = [
  { type: "HAPPY", label: "Happy", emoji: "😊" },
  { type: "EXCITED", label: "Excited", emoji: "🤩" },
  { type: "CALM", label: "Calm", emoji: "😌" },
  { type: "SAD", label: "Sad", emoji: "😔" },
  { type: "ANGRY", label: "Angry", emoji: "😠" },
];

export default function DailyEmotionEngine() {
  const [activeTab, setActiveTab] = useState<TabState>("FOR_ME");
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!selectedEmotion) return;
    // In a real app, this would call a server action
    console.log("Saving emotion:", { activeTab, selectedEmotion, note });
    alert("Emotion saved!");
    setNote("");
    setSelectedEmotion(null);
  };

  return (
    <div className="bg-container rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-primary text-2xl font-bold mb-4 text-center">Daily Emotion Engine</h2>
      
      {/* Tabs */}
      <div className="flex bg-main rounded-xl p-1 mb-6 relative">
        {(["FOR_ME", "FOR_YOU", "FOR_US"] as TabState[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold relative z-10 transition-colors ${
              activeTab === tab ? "text-primary" : "text-primary/70 hover:text-primary"
            }`}
          >
            {tab === "FOR_ME" ? "For Me" : tab === "FOR_YOU" ? "For You" : "For Us"}
            {activeTab === tab && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-accent rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Emotion Selection */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-primary font-medium mb-3 text-center">
            How are you feeling {activeTab === "FOR_ME" ? "today" : activeTab === "FOR_YOU" ? "towards them" : "about us"}?
          </p>
          
          <div className="flex justify-between mb-6">
            {emotions.map((emo) => (
              <button
                key={emo.type}
                onClick={() => setSelectedEmotion(emo.type)}
                className={`text-4xl transition-transform hover:scale-110 ${
                  selectedEmotion === emo.type ? "scale-125 drop-shadow-md" : "opacity-60 grayscale"
                }`}
              >
                {emo.emoji}
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a little note..."
            className="w-full bg-main text-primary placeholder-primary/50 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-accent resize-none h-24"
          />

          <button
            onClick={handleSave}
            disabled={!selectedEmotion}
            className="w-full bg-accent text-primary font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/80 transition-colors"
          >
            Save Emotion
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
