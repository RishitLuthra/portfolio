"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { MISSIONS } from "@/data/portfolio";
import { MatchMiniGame } from "@/components/game/MatchMiniGame";
import { burstConfetti } from "@/lib/confetti";
import { ui } from "@/lib/ui";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-500">
      {"★".repeat(count)}
      <span className="text-slate-200">{"★".repeat(5 - count)}</span>
    </span>
  );
}

export function ProjectArena() {
  const { briefMission, missionBriefings } = useGame();
  const [openId, setOpenId] = useState<string | null>(null);

  const openMission = (id: string) => {
    setOpenId(id);
    briefMission(id);
    burstConfetti();
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        {MISSIONS.map((m, i) => {
          const briefed = missionBriefings.has(m.id);
          return (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`${ui.card} ${ui.cardHover} p-5`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Mission {m.number}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-bold text-slate-900">
                    {m.title}
                  </h4>
                </div>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                  {m.status}
                </span>
              </div>
              <div className={`mt-3 flex flex-wrap gap-2 text-xs ${ui.muted}`}>
                <span>
                  Difficulty: <Stars count={m.difficulty} />
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5">{m.category}</span>
              </div>
              <button
                type="button"
                onClick={() => openMission(m.id)}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:underline"
              >
                {briefed ? "✓ Briefing complete" : "▶ Start mission briefing"}
              </button>
              <AnimatePresence>
                {openId === m.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 border-t border-slate-100 pt-4"
                  >
                    <p className="text-sm text-slate-600">{m.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
      <MatchMiniGame />
    </div>
  );
}
