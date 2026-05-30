"use client";

import { useCallback } from "react";
import { useGame } from "@/context/GameContext";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useMouseGradient } from "@/hooks/useMouseGradient";
import { ParticleField } from "@/components/effects/ParticleField";
import { MouseGradient } from "@/components/effects/MouseGradient";
import { QuestHUD } from "@/components/game/QuestHUD";
import { CompletionModal } from "@/components/game/CompletionModal";
import { AIAssistant } from "@/components/game/AIAssistant";

export function GameShell({ children }: { children: React.ReactNode }) {
  const { enableDeveloperMode, developerMode } = useGame();
  useMouseGradient();

  const onKonami = useCallback(() => {
    enableDeveloperMode();
  }, [enableDeveloperMode]);

  useKonamiCode(onKonami);

  return (
    <>
      <ParticleField />
      <MouseGradient />
      <QuestHUD />
      <CompletionModal />
      <AIAssistant />
      {developerMode && (
        <div className="fixed left-4 top-28 z-50 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          ⚡ Developer Mode
        </div>
      )}
      <main className="relative z-10">{children}</main>
    </>
  );
}
