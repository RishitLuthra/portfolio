"use client";

import { motion } from "framer-motion";
import type { SectionId } from "@/data/portfolio";
import { useGame } from "@/context/GameContext";
import { ui } from "@/lib/ui";

export function IntelCard({
  zoneId,
  objectiveId,
  emoji,
  title,
  desc,
}: {
  zoneId: SectionId;
  objectiveId: string;
  emoji: string;
  title: string;
  desc: string;
}) {
  const { completeObjective, isObjectiveDone } = useGame();
  const done = isObjectiveDone(objectiveId);

  return (
    <motion.button
      type="button"
      onClick={() => !done && completeObjective(objectiveId, zoneId)}
      whileHover={{ y: -2 }}
      className={`${ui.card} w-full p-6 text-left transition ${
        done ? "border-emerald-300 bg-emerald-50" : "hover:border-indigo-300"
      }`}
    >
      <span className="text-3xl">{emoji}</span>
      <h3 className="mt-3 font-display font-bold text-slate-900">{title}</h3>
      <p className={`mt-2 text-sm ${ui.muted}`}>{desc}</p>
      <p className="mt-3 text-xs font-semibold text-indigo-600">
        {done ? "✓ Intel unlocked" : "Click to inspect →"}
      </p>
    </motion.button>
  );
}
