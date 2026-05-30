"use client";

import type { SectionId } from "@/data/portfolio";
import { useGame } from "@/context/GameContext";
import { ZONE_QUESTS } from "@/data/quests";
import { ui } from "@/lib/ui";

export function QuestPanel({
  zoneId,
  className = "",
}: {
  zoneId: SectionId;
  className?: string;
}) {
  const { isObjectiveDone, isZoneComplete } = useGame();
  const quest = ZONE_QUESTS[zoneId];

  if (isZoneComplete(zoneId)) {
    return (
      <div
        className={`rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 ${className}`}
      >
        <p className="text-sm font-semibold text-emerald-800">✓ {quest.title} — Complete</p>
        <p className="text-xs text-emerald-600">+{quest.xpReward} XP earned · Next zone unlocked</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-5 py-4 ${className}`}
    >
      <p className={ui.label}>Active Quest</p>
      <h3 className="font-display text-lg font-bold text-slate-900">{quest.title}</h3>
      <p className={`mt-1 text-sm ${ui.muted}`}>{quest.story}</p>
      <ul className="mt-4 space-y-2">
        {quest.objectives.map((o) => (
          <li
            key={o.id}
            className={`flex items-start gap-2 text-sm ${
              isObjectiveDone(o.id) ? "text-emerald-700" : "text-slate-600"
            }`}
          >
            <span className="mt-0.5 font-bold">{isObjectiveDone(o.id) ? "✓" : "○"}</span>
            <span>
              {o.label}
              {o.hint && !isObjectiveDone(o.id) && (
                <span className="block text-xs text-slate-400">Hint: {o.hint}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
