"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { TRANSMIT_CODE } from "@/data/quests";
import { ui } from "@/lib/ui";

export function TransmitChallenge() {
  const { completeObjective, isObjectiveDone } = useGame();
  const [code, setCode] = useState("");
  const done = isObjectiveDone("contact-signal");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === TRANSMIT_CODE) {
      completeObjective("contact-signal", "contact");
    }
  };

  return (
    <form onSubmit={send} className={`${ui.card} mt-6 p-5`}>
      <p className={ui.label}>Final Transmission</p>
      <p className={`text-sm ${ui.muted}`}>
        Type the recruitment signal <strong className="text-indigo-600">RECRUIT</strong> to
        complete the campaign.
      </p>
      {done ? (
        <p className="mt-3 text-sm font-semibold text-emerald-600">📡 Signal transmitted ✓</p>
      ) : (
        <div className="mt-3 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={ui.input}
            placeholder="Enter signal code..."
            autoComplete="off"
          />
          <button type="submit" className={ui.btnPrimary}>
            Send
          </button>
        </div>
      )}
    </form>
  );
}
