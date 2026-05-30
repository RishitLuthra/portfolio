"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SectionId } from "@/data/portfolio";
import { useGame } from "@/context/GameContext";
import { ui } from "@/lib/ui";

type Props = {
  zoneId: SectionId;
  objectiveId: string;
  question: string;
  options: string[];
  correct: string;
  label?: string;
};

export function QuizBlock({
  zoneId,
  objectiveId,
  question,
  options,
  correct,
  label = "Intel Check",
}: Props) {
  const { completeObjective, isObjectiveDone } = useGame();
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "right">("idle");
  const done = isObjectiveDone(objectiveId);

  const submit = (opt: string) => {
    if (done) return;
    setSelected(opt);
    if (opt === correct) {
      setFeedback("right");
      completeObjective(objectiveId, zoneId);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback("idle"), 1200);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        ✓ {label} passed
      </div>
    );
  }

  return (
    <div className={`${ui.card} p-5`}>
      <p className={ui.label}>{label}</p>
      <p className="mt-2 font-medium text-slate-900">{question}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => submit(opt)}
            className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
              selected === opt && feedback === "right"
                ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                : selected === opt && feedback === "wrong"
                  ? "border-red-300 bg-red-50 text-red-700 animate-shake"
                  : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback === "wrong" && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm text-red-600">
          Incorrect — try again!
        </motion.p>
      )}
    </div>
  );
}
