"use client";

import { useGame } from "@/context/GameContext";
import { TransmitChallenge } from "@/components/game/TransmitChallenge";
import { ui } from "@/lib/ui";

export function ContactZone() {
  const { completeObjective, isObjectiveDone } = useGame();

  return (
    <div className={`${ui.card} mx-auto max-w-lg p-8 text-center`}>
      <p className={ui.muted}>Let&apos;s build something intelligent together.</p>
      <TransmitChallenge />
      <div className="mt-6 flex flex-col gap-3">
        <a
          href="mailto:luthrarishit1234@gmail.com"
          className={ui.btnSecondary}
        >
          luthrarishit1234@gmail.com
        </a>
        <a
          href="/resume.pdf"
          download="Rishit_Luthra_Resume.pdf"
          onClick={() => {
            if (!isObjectiveDone("contact-resume")) {
              completeObjective("contact-resume", "contact");
            }
          }}
          className={ui.btnPrimary}
        >
          {isObjectiveDone("contact-resume") ? "✓ Resume Claimed" : "📄 Claim Resume Reward"}
        </a>
      </div>
    </div>
  );
}
