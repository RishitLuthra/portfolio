"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { MATCH_PAIRS } from "@/data/quests";
import { ui } from "@/lib/ui";

type Card = { id: string; text: string; pairId: string; kind: "tech" | "project" };

function buildDeck(): Card[] {
  const cards: Card[] = [];
  MATCH_PAIRS.forEach((p) => {
    cards.push({ id: `${p.id}-t`, text: p.tech, pairId: p.id, kind: "tech" });
    cards.push({ id: `${p.id}-p`, text: p.project, pairId: p.id, kind: "project" });
  });
  return cards.sort(() => Math.random() - 0.5);
}

export function MatchMiniGame() {
  const { completeObjective, isObjectiveDone, unlockBadge, unlockedBadges } = useGame();
  const done = isObjectiveDone("proj-match");
  const [deck] = useState(buildDeck);
  const [selected, setSelected] = useState<Card | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState(false);

  const onCard = (card: Card) => {
    if (done || matched.has(card.id)) return;
    if (!selected) {
      setSelected(card);
      return;
    }
    if (selected.id === card.id) {
      setSelected(null);
      return;
    }
    if (selected.pairId === card.pairId && selected.kind !== card.kind) {
      const next = new Set(matched);
      next.add(selected.id);
      next.add(card.id);
      setMatched(next);
      setSelected(null);
      if (next.size === deck.length) {
        completeObjective("proj-match", "projects");
        if (!unlockedBadges.has("full-stack")) {
          unlockBadge("full-stack", "Full Stack Developer", "Tech Match champion");
        }
      }
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setSelected(null);
      }, 600);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        ✓ Tech Match mini-game complete
      </div>
    );
  }

  return (
    <div className={`${ui.card} p-5`}>
      <p className={ui.label}>Mini-Game · Tech Match</p>
      <p className={`mt-1 text-sm ${ui.muted}`}>
        Pair each tech stack with its project. Match all 4 pairs to continue.
      </p>
      <div
        className={`mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 ${wrong ? "animate-pulse" : ""}`}
      >
        {deck.map((card) => {
          const isMatched = matched.has(card.id);
          const isSelected = selected?.id === card.id;
          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => onCard(card)}
              disabled={isMatched}
              whileTap={{ scale: 0.97 }}
              className={`min-h-[72px] rounded-xl border p-2 text-left text-xs font-medium transition ${
                isMatched
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : isSelected
                    ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200"
                    : card.kind === "tech"
                      ? "border-violet-200 bg-violet-50 text-violet-900 hover:border-violet-400"
                      : "border-cyan-200 bg-cyan-50 text-cyan-900 hover:border-cyan-400"
              }`}
            >
              <span className="text-[10px] uppercase opacity-60">
                {card.kind === "tech" ? "Tech" : "Project"}
              </span>
              <p className="mt-1 leading-tight">{card.text}</p>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500">
        Matched: {matched.size / 2} / {MATCH_PAIRS.length}
      </p>
    </div>
  );
}
