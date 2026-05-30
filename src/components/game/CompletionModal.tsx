"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { ui } from "@/lib/ui";

export function CompletionModal() {
  const { showCompletionModal, dismissCompletion } = useGame();

  if (!showCompletionModal) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={dismissCompletion}
    >
      <motion.div
        className="max-w-md rounded-2xl border-2 border-amber-200 bg-white p-8 text-center shadow-glow"
        initial={{ scale: 0.9, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-5xl">🏆</p>
        <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
          Campaign Complete!
        </h2>
        <p className={`mt-2 ${ui.muted}`}>
          You cleared all 6 zones, defeated the boss, and mastered Rishit&apos;s journey.
        </p>
        <a href="/resume.pdf" download="Rishit_Luthra_Resume.pdf" className={`mt-6 inline-block ${ui.btnPrimary}`}>
          📄 Download Resume
        </a>
        <button
          type="button"
          onClick={dismissCompletion}
          className="mt-4 block w-full text-sm text-slate-400 hover:text-slate-600"
        >
          Keep exploring
        </button>
      </motion.div>
    </motion.div>
  );
}
