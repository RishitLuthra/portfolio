"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { ZONE_QUESTS } from "@/data/quests";
import { ui } from "@/lib/ui";

export function QuestHUD() {
  const {
    level,
    levelTitle,
    xp,
    progressPercent,
    activeZone,
    isObjectiveDone,
    toasts,
    dismissToast,
    soundEnabled,
    toggleSound,
    showLevelUp,
    dismissLevelUp,
  } = useGame();

  const quest = ZONE_QUESTS[activeZone];
  const doneCount = quest.objectives.filter((o) => isObjectiveDone(o.id)).length;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className={ui.label}>Campaign Progress</p>
              <p className="truncate text-sm font-medium text-slate-800">
                {doneCount}/{quest.objectives.length} · {quest.title}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm font-bold tabular-nums text-indigo-600">
                {progressPercent}%
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="text-xs text-slate-500 hover:text-slate-800"
                aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: "spring", stiffness: 90 }}
            />
          </div>
        </div>
      </header>

      <motion.div
        className="fixed right-4 top-20 z-50 rounded-2xl border border-indigo-100 bg-white px-4 py-3 shadow-soft"
        initial={false}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">
          Level {level}
        </p>
        <p className="font-display text-sm font-bold text-slate-900">{levelTitle}</p>
        <p className="text-xs tabular-nums text-cyan-600">XP: {xp}</p>
      </motion.div>

      <div className="fixed right-4 top-48 z-50 flex max-w-xs flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              onClick={() => dismissToast(t.id)}
              className="cursor-pointer rounded-xl border border-indigo-100 bg-white px-4 py-2 shadow-soft"
            >
              <p className="text-sm font-semibold text-indigo-600">{t.title}</p>
              {t.subtitle && <p className="text-xs text-slate-500">{t.subtitle}</p>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissLevelUp}
          >
            <motion.div
              className="rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white p-8 text-center shadow-glow"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-4xl">⬆️</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-slate-900">Level Up!</h3>
              <p className="text-indigo-600">Level {level} · {levelTitle}</p>
              <button type="button" onClick={dismissLevelUp} className={`mt-4 ${ui.btnPrimary}`}>
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
