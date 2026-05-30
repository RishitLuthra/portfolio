"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { JOURNEY_STAGES } from "@/data/portfolio";
import { ui } from "@/lib/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function JourneyMap() {
  const { completeObjective, isObjectiveDone } = useGame();
  const [activated, setActivated] = useState<Set<string>>(new Set());
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#journey-map",
        start: "top 75%",
        end: "bottom 25%",
        scrub: 1,
      },
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const activateStage = (id: string) => {
    const next = new Set(activated);
    next.add(id);
    setActivated(next);
    if (next.size >= JOURNEY_STAGES.length && !isObjectiveDone("exp-stages")) {
      completeObjective("exp-stages", "experience");
    }
  };

  return (
    <div id="journey-map" className="relative">
      <svg
        className="absolute left-1/2 top-0 hidden h-full w-4 -translate-x-1/2 md:block"
        viewBox="0 0 4 400"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 2 0 L 2 400"
          fill="none"
          stroke="url(#journey-gradient)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
      </svg>

      <p className={`mb-6 text-center text-sm ${ui.muted}`}>
        Click each milestone to travel the path ({activated.size}/{JOURNEY_STAGES.length})
      </p>

      <div className="relative space-y-6">
        {JOURNEY_STAGES.map((stage, i) => {
          const lit = activated.has(stage.id);
          return (
            <motion.button
              key={stage.id}
              type="button"
              onClick={() => activateStage(stage.id)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01 }}
              className={`block w-full rounded-2xl border-2 p-6 text-left transition md:max-w-xl ${
                i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              } ${
                lit
                  ? "border-indigo-300 bg-indigo-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-indigo-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold ${
                    lit ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {lit ? "✓" : i + 1}
                </span>
                <div>
                  <h4 className="font-display text-lg font-semibold text-slate-900">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-cyan-700">{stage.period}</p>
                </div>
              </div>
              {lit && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                  <p className="text-sm text-slate-600">{stage.description}</p>
                  <p className="mt-2 text-xs font-medium text-amber-700">{stage.highlight}</p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
