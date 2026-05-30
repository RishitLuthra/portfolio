"use client";

import { motion } from "framer-motion";
import { useGame } from "@/context/GameContext";
import { SKILL_TREE } from "@/data/portfolio";
import { ui } from "@/lib/ui";

export function SkillTree() {
  const { unlockSkill, unlockedSkills } = useGame();

  return (
    <div className={`${ui.card} p-8`}>
      <h3 className="font-display text-xl font-bold text-slate-900">Skill Tree</h3>
      <p className={`mt-1 text-sm ${ui.muted}`}>
        Click each branch head to activate ({unlockedSkills.size}/3 for quest)
      </p>

      <div className="mt-10 flex flex-col items-center">
        <motion.div
          className="rounded-2xl border-2 border-indigo-400 bg-indigo-50 px-8 py-4 text-center shadow-glow"
          whileHover={{ scale: 1.03 }}
        >
          <span className="text-2xl">🧠</span>
          <p className="mt-1 font-display font-bold text-indigo-900">{SKILL_TREE.core.label}</p>
        </motion.div>

        <div className="mt-8 grid w-full gap-8 md:grid-cols-3">
          {SKILL_TREE.branches.map((branch) => {
            const active = unlockedSkills.has(branch.id);
            return (
              <div key={branch.id} className="flex flex-col items-center">
                <div className="mb-4 h-8 w-px bg-indigo-200" />
                <motion.button
                  type="button"
                  onClick={() => unlockSkill(branch.id)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-center transition ${
                    active
                      ? "border-cyan-400 bg-cyan-50 shadow-md"
                      : "border-slate-200 bg-slate-50 hover:border-indigo-300"
                  }`}
                >
                  <p className={`font-semibold ${active ? "text-cyan-800" : "text-indigo-700"}`}>
                    {active ? "⚡ " : ""}
                    {branch.label}
                  </p>
                </motion.button>
                <div className="mt-3 flex w-full flex-col gap-2">
                  {branch.children.map((child) => (
                    <div
                      key={child.id}
                      className={`rounded-lg border px-3 py-2 text-sm ${
                        active
                          ? "border-indigo-100 bg-indigo-50/50 text-slate-700"
                          : "border-slate-100 bg-slate-50 text-slate-400"
                      }`}
                    >
                      → {child.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
