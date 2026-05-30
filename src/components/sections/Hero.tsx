"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { BADGES } from "@/data/portfolio";
import { WorldMap } from "@/components/game/WorldMap";
import { QuestPanel } from "@/components/game/QuestPanel";
import { ui } from "@/lib/ui";

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  const { unlockBadge, unlockedBadges, activeZone } = useGame();

  const onAvatarDoubleClick = () => {
    const dev = BADGES.find((b) => b.id === "developer-mode");
    if (dev && !unlockedBadges.has(dev.id)) {
      unlockBadge(dev.id, dev.title);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-canvas pt-[5.5rem] pb-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div>
            <motion.p {...fadeUp} className={ui.label}>
              Interactive Career RPG
            </motion.p>
            <motion.h1
              {...fadeUp}
              className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              Rishit{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Luthra
              </span>
            </motion.h1>
            <motion.p {...fadeUp} className={`mt-2 max-w-lg text-sm sm:text-base ${ui.muted}`}>
              Insurance BA & AI Developer · Complete quests to unlock zones — not just scroll
            </motion.p>

            <motion.div
              {...fadeUp}
              className="mt-6 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onDoubleClick={onAvatarDoubleClick}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-soft ring-4 ring-indigo-100 sm:h-28 sm:w-28"
                title="Double-click for a secret"
              >
                <Image
                  src="/avatar.png"
                  alt="Rishit Luthra"
                  fill
                  className="object-cover"
                  priority
                  sizes="112px"
                />
              </button>
              <div className="flex flex-wrap gap-3">
                <a href="#about-play" className={ui.btnPrimary}>
                  Start Quest 1
                </a>
                <a href="/resume.pdf" download className={ui.btnSecondary}>
                  Resume (finale unlock)
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="lg:sticky lg:top-28">
            <QuestPanel zoneId={activeZone} />
          </motion.div>
        </div>

        <motion.div {...fadeUp} className="mt-8">
          <WorldMap />
        </motion.div>
      </div>
    </section>
  );
}
