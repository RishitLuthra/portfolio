"use client";

import { useCallback, useEffect, useRef } from "react";
import { useGame } from "@/context/GameContext";
import { HIDDEN_FACTS } from "@/data/portfolio";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { unlockBadge, unlockedBadges } = useGame();
  const factIndex = useRef(0);

  const onParticleClick = useCallback(() => {
    const fact = HIDDEN_FACTS[factIndex.current % HIDDEN_FACTS.length];
    factIndex.current += 1;

    const toast = document.createElement("div");
    toast.className =
      "fixed bottom-24 left-1/2 z-[100] max-w-sm -translate-x-1/2 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-soft";
    toast.textContent = `💡 ${fact}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);

    if (!unlockedBadges.has("full-stack") && factIndex.current >= 4) {
      unlockBadge("full-stack", "Full Stack Developer", "Particle explorer bonus");
    }
  }, [unlockBadge, unlockedBadges]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (particles.length === 0) {
        for (let i = 0; i < 40; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.35 + 0.1,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    const clickHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (particles.some((p) => Math.hypot(p.x - x, p.y - y) < 28)) onParticleClick();
    };
    canvas.addEventListener("click", clickHandler);

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${p.alpha})`;
        ctx.fill();
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(8, 145, 178, ${0.06 * (1 - d / 100)})`;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", clickHandler);
    };
  }, [onParticleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto fixed inset-0 z-0 opacity-50"
      aria-hidden
    />
  );
}
