"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { ZONE_ORDER, ZONE_QUESTS } from "@/data/quests";
import { ui } from "@/lib/ui";

const ZONE_META: Record<string, { emoji: string; short: string }> = {
  about: { emoji: "👤", short: "Origin" },
  experience: { emoji: "🗺️", short: "Journey" },
  projects: { emoji: "🎯", short: "Missions" },
  research: { emoji: "🔬", short: "Lab" },
  leadership: { emoji: "👑", short: "Command" },
  contact: { emoji: "📡", short: "Signal" },
};

export function WorldMap() {
  const { isZoneUnlocked, isZoneComplete, activeZone } = useGame();

  const scrollTo = (id: string) => {
    const target = id === "about" ? "about-play" : id;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`${ui.card} p-6`}>
      <p className={ui.label}>Career World Map</p>
      <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
        Choose your next zone
      </h2>
      <p className={`mt-1 text-sm ${ui.muted}`}>
        Complete each zone&apos;s quest to unlock the next. Locked zones stay hidden until earned.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-0">
        {ZONE_ORDER.map((zoneId, i) => {
          const unlocked = isZoneUnlocked(zoneId);
          const complete = isZoneComplete(zoneId);
          const active = activeZone === zoneId && !complete;
          const meta = ZONE_META[zoneId];

          return (
            <div key={zoneId} className="flex items-center">
              <motion.button
                type="button"
                disabled={!unlocked}
                onClick={() => unlocked && scrollTo(zoneId)}
                whileHover={unlocked ? { scale: 1.05, y: -2 } : {}}
                whileTap={unlocked ? { scale: 0.98 } : {}}
                className={`relative flex w-24 flex-col items-center rounded-2xl border-2 px-3 py-4 text-center transition md:w-28 ${
                  !unlocked
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 opacity-60"
                    : complete
                      ? "border-emerald-300 bg-emerald-50 shadow-sm"
                      : active
                        ? "border-indigo-400 bg-indigo-50 shadow-glow"
                        : "border-slate-200 bg-white shadow-sm hover:border-indigo-300"
                }`}
              >
                {!unlocked && (
                  <span className="absolute -right-1 -top-1 text-lg">🔒</span>
                )}
                {complete && (
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                    ✓
                  </span>
                )}
                <span className="text-2xl">{unlocked ? meta.emoji : "❓"}</span>
                <span className="mt-1 text-xs font-semibold text-slate-800">{meta.short}</span>
                {active && (
                  <span className="mt-1 animate-pulse text-[10px] font-medium text-indigo-600">
                    ACTIVE
                  </span>
                )}
              </motion.button>
              {i < ZONE_ORDER.length - 1 && (
                <div
                  className={`mx-1 hidden h-0.5 w-6 md:block md:w-10 ${
                    isZoneComplete(zoneId) ? "bg-emerald-400" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <p className={`mt-6 text-center text-xs ${ui.muted}`}>
        Current quest:{" "}
        <strong className="text-indigo-600">{ZONE_QUESTS[activeZone].title}</strong>
      </p>
    </div>
  );
}
