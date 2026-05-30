"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { GAME_STATS } from "@/data/portfolio";
import { ui } from "@/lib/ui";

export function GameStats() {
  const { completeObjective, isObjectiveDone } = useGame();
  const scanned = isObjectiveDone("about-scan");

  return (
    <motion.button
      type="button"
      onClick={() => !scanned && completeObjective("about-scan", "about")}
      whileHover={{ scale: 1.01 }}
      className={`w-full text-left ${ui.card} p-4 transition ${
        scanned ? "ring-2 ring-emerald-300" : "cursor-pointer hover:border-indigo-300"
      }`}
    >
      <p className="text-xs font-semibold text-indigo-600">
        {scanned ? "✓ Stats scanned" : "▶ Tap to scan player stats"}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {GAME_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center"
          >
            <span className="text-lg">{stat.icon}</span>
            <p className="mt-1 font-display text-base font-bold text-slate-900">{stat.value}</p>
            <p className="text-[9px] font-medium uppercase tracking-wide text-slate-500">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.button>
  );
}
