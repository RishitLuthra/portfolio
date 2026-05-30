"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { TERMINAL_CODE } from "@/data/quests";
import { ui } from "@/lib/ui";

export function CodeTerminal() {
  const { completeObjective, isObjectiveDone } = useGame();
  const [input, setInput] = useState("");
  const done = isObjectiveDone("res-code");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === TERMINAL_CODE) {
      completeObjective("res-code", "research");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 font-mono text-sm shadow-lg">
      <p className="text-emerald-400">research@iitm-ggsipu:~$ access --hackathon</p>
      <p className="mt-2 text-slate-400">
        {"// Enter the 3-letter hackathon code (hint: Smart India ___)"}
      </p>
      {done ? (
        <p className="mt-3 text-emerald-400">ACCESS GRANTED ✓</p>
      ) : (
        <form onSubmit={submit} className="mt-3 flex gap-2">
          <span className="text-emerald-400">&gt;</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent uppercase text-emerald-300 outline-none placeholder:text-slate-600"
            placeholder="___"
            maxLength={8}
            autoComplete="off"
          />
          <button type="submit" className={`${ui.btnPrimary} !py-1 !text-xs`}>
            Run
          </button>
        </form>
      )}
    </div>
  );
}
