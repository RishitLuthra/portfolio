"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { BADGES } from "@/data/portfolio";
import { ui } from "@/lib/ui";

export function TrophyCabinet() {
  const { unlockedBadges } = useGame();

  return (
    <div className={`${ui.glass} p-6`}>
      <h3 className="font-display text-lg font-bold text-slate-900">Trophy Cabinet</h3>
      <p className={`mt-1 text-sm ${ui.muted}`}>Badges earned by completing quests</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {BADGES.filter((b) => {
          if (b.id === "developer-mode" && !unlockedBadges.has(b.id)) return false;
          if (b.id === "recruiter-champion" && !unlockedBadges.has(b.id)) return false;
          return true;
        }).map((badge, i) => {
          const unlocked = unlockedBadges.has(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-xl border p-4 text-center ${
                unlocked
                  ? "border-indigo-200 bg-indigo-50/80 shadow-sm"
                  : "border-slate-100 bg-slate-50 opacity-50 grayscale"
              }`}
            >
              <span className="text-2xl">{unlocked ? badge.emoji : "🔒"}</span>
              <p className="mt-2 text-xs font-semibold text-slate-800">
                {unlocked ? badge.title : "???"}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
