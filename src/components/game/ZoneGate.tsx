"use client";

import type { SectionId } from "@/data/portfolio";
import { useGame } from "@/context/GameContext";
import { ZONE_QUESTS, ZONE_ORDER } from "@/data/quests";
import { ui } from "@/lib/ui";

export function ZoneGate({
  zoneId,
  children,
}: {
  zoneId: SectionId;
  children: React.ReactNode;
}) {
  const { isZoneUnlocked, isZoneComplete } = useGame();
  const unlocked = isZoneUnlocked(zoneId);

  if (unlocked) {
    return (
      <div className="relative">
        {isZoneComplete(zoneId) && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            ✓ Zone Cleared
          </div>
        )}
        {children}
      </div>
    );
  }

  const prevZone = ZONE_ORDER[ZONE_ORDER.indexOf(zoneId) - 1];
  const prevQuest = prevZone ? ZONE_QUESTS[prevZone] : null;

  return (
    <section id={zoneId} className="scroll-mt-28 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`${ui.card} flex flex-col items-center py-16 text-center`}>
          <span className="text-5xl">🔒</span>
          <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">Zone Locked</h2>
          <p className={`mt-2 max-w-md text-sm ${ui.muted}`}>
            Complete <strong className="text-indigo-600">{prevQuest?.title}</strong> to unlock
            this area.
          </p>
        </div>
      </div>
    </section>
  );
}
