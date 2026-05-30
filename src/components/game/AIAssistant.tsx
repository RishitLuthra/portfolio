"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NPC_RESPONSES } from "@/data/portfolio";
import { useGame } from "@/context/GameContext";
import { ZONE_QUESTS } from "@/data/quests";
const QUICK_PROMPTS = [
  { key: "experience", label: "His experience" },
  { key: "projects", label: "AI projects" },
  { key: "research", label: "Research" },
  { key: "leadership", label: "Leadership" },
] as const;

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const { activeZone, isZoneUnlocked } = useGame();
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: `Quest guide online. Your active mission: ${ZONE_QUESTS[activeZone].title}. Ask me for hints!`,
    },
  ]);

  const respond = (key: string) => {
    const prompt = QUICK_PROMPTS.find((p) => p.key === key);
    const response = NPC_RESPONSES[key] ?? NPC_RESPONSES.default;
    const zone = response.scrollTo;
    const hint = zone && !isZoneUnlocked(zone) ? " (Zone may still be locked — complete prior quests first.)" : "";
    setMessages((m) => [
      ...m,
      { role: "user", text: prompt?.label ?? key },
      { role: "bot", text: response.text + hint },
    ]);
    if (response.scrollTo) {
      document.getElementById(response.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 text-2xl text-white shadow-glow"
        whileHover={{ scale: 1.06 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        aria-label="Quest guide"
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-24 right-4 z-50 w-[min(100vw-2rem,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft"
          >
            <div className="border-b border-slate-100 bg-indigo-50 px-4 py-3">
              <p className="font-display text-sm font-bold text-slate-900">Quest Guide NPC</p>
              <p className="text-xs text-indigo-600">{ZONE_QUESTS[activeZone].title}</p>
            </div>
            <div className="max-h-48 space-y-2 overflow-y-auto p-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    msg.role === "bot" ? "bg-slate-50 text-slate-700" : "ml-6 bg-indigo-100 text-indigo-900"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 p-3">
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => respond(p.key)}
                    className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-600 hover:bg-indigo-50"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
