"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { BOSS_QUESTIONS } from "@/data/quests";
import { ui } from "@/lib/ui";

export function RecruiterBoss() {
  const { answerBoss, bossCorrect, isObjectiveDone } = useGame();
  const [current, setCurrent] = useState(0);
  const done = isObjectiveDone("lead-boss");
  const defeated = bossCorrect.size;

  const q = BOSS_QUESTIONS[current];

  const pick = (opt: string) => {
    if (done || bossCorrect.has(q.id)) return;
    const correct = opt === q.correct;
    if (correct) {
      answerBoss(q.id, true);
      if (current < BOSS_QUESTIONS.length - 1) {
        setCurrent((c) => c + 1);
      }
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 text-center">
        <p className="text-4xl">🏅</p>
        <h3 className="mt-2 font-display text-xl font-bold text-slate-900">Boss Defeated!</h3>
        <p className="text-sm text-amber-800">Recruiter Champion · Mission Accomplished</p>
      </div>
    );
  }

  return (
    <div className={`${ui.card} border-2 border-amber-200 p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Recruiter Boss Fight
          </p>
          <p className="text-sm text-slate-600">Answer 4 questions from Rishit&apos;s resume</p>
        </div>
        <div className="flex gap-1">
          {BOSS_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${
                i < defeated ? "bg-emerald-400" : i === current ? "bg-amber-400" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={q.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-6"
      >
        <p className="font-medium text-slate-900">
          Q{current + 1}. {q.question}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {q.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => pick(opt)}
              disabled={bossCorrect.has(q.id)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>
      <p className="mt-4 text-center text-xs text-slate-500">
        HP: {defeated}/4 · Wrong answers don&apos;t penalize — keep trying
      </p>
    </div>
  );
}
