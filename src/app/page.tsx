import { Hero } from "@/components/sections/Hero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SkillTree } from "@/components/sections/SkillTree";
import { ProjectArena } from "@/components/sections/ProjectArena";
import { JourneyMap } from "@/components/sections/JourneyMap";
import { GameStats } from "@/components/sections/GameStats";
import { TrophyCabinet } from "@/components/game/TrophyCabinet";
import { ZoneGate } from "@/components/game/ZoneGate";
import { QuizBlock } from "@/components/game/QuizBlock";
import { CodeTerminal } from "@/components/game/CodeTerminal";
import { RecruiterBoss } from "@/components/game/RecruiterBoss";
import { IntelCard } from "@/components/game/IntelCard";
import { ContactZone } from "@/components/game/ContactZone";
import { ABOUT_QUIZ, EXPERIENCE_QUIZ } from "@/data/quests";

export default function Home() {
  return (
    <>
      <Hero />

      <ZoneGate zoneId="about">
        <SectionShell
          id="about"
          title="About Me"
          subtitle="Insurance Business Analyst & AI Developer · MCA at GGSIPU (9.6 GPA)"
        >
          <div id="about-play" className="scroll-mt-28" />
          <QuizBlock
            zoneId="about"
            objectiveId="about-quiz"
            question={ABOUT_QUIZ.question}
            options={[...ABOUT_QUIZ.options]}
            correct={ABOUT_QUIZ.correct}
          />
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-slate-600">
              <p>
                I&apos;m <strong className="text-slate-900">Rishit Luthra</strong>, an Insurance
                Business Analyst & AI Developer in New Delhi. I architect AI agents, C# backends,
                and full-stack platforms for enterprise insurance.
              </p>
              <p>
                <strong className="text-amber-700">MCA University Topper</strong> (9.6 GPA), BCA
                College Topper (9.4), SIH twice, ML competition winner. Currently at White Gate
                Consulting.
              </p>
            </div>
            <GameStats />
          </div>
          <div className="mt-10">
            <SkillTree />
          </div>
        </SectionShell>
      </ZoneGate>

      <ZoneGate zoneId="experience">
        <SectionShell
          id="experience"
          title="Career Journey Map"
          subtitle="Click every milestone, then pass the employer intel check."
        >
          <JourneyMap />
          <div className="mt-10">
            <QuizBlock
              zoneId="experience"
              objectiveId="exp-quiz"
              question={EXPERIENCE_QUIZ.question}
              options={[...EXPERIENCE_QUIZ.options]}
              correct={EXPERIENCE_QUIZ.correct}
              label="Employer Intel Check"
            />
          </div>
        </SectionShell>
      </ZoneGate>

      <ZoneGate zoneId="projects">
        <SectionShell
          id="projects"
          title="Project Arena"
          subtitle="Complete mission briefings and win the Tech Match game."
        >
          <ProjectArena />
        </SectionShell>
      </ZoneGate>

      <ZoneGate zoneId="research">
        <SectionShell
          id="research"
          title="Research Lab"
          subtitle="Inspect artifacts and hack the terminal."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <IntelCard
              zoneId="research"
              objectiveId="res-malware"
              emoji="🛡️"
              title="Semantics-Aware Malware Detection"
              desc="Semantic analysis + ML for improved malware detection at IITM, GGSIPU."
            />
            <IntelCard
              zoneId="research"
              objectiveId="res-face"
              emoji="🧑"
              title="Deep Face Detection Model"
              desc="CNN face detection with Albumentations augmentation across diverse datasets."
            />
          </div>
          <div className="mt-8">
            <CodeTerminal />
          </div>
        </SectionShell>
      </ZoneGate>

      <ZoneGate zoneId="leadership">
        <SectionShell
          id="leadership"
          title="Command Center"
          subtitle="Unlock intel cards and defeat the Recruiter Boss."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <IntelCard
              zoneId="leadership"
              objectiveId="lead-aiec"
              emoji="👑"
              title="AIEC President"
              desc="Led 100 members at the AI Experience Center, GGSIPU–IITM."
            />
            <IntelCard
              zoneId="leadership"
              objectiveId="lead-techno"
              emoji="🎪"
              title="Techno Sapiens"
              desc="Flagship event for 1,000+ students — logistics and execution."
            />
            <IntelCard
              zoneId="leadership"
              objectiveId="lead-sih"
              emoji="🏆"
              title="SIH & ML Winner"
              desc="Smart India Hackathon x2 and 1st in college ML competition."
            />
          </div>
          <div className="mt-10">
            <RecruiterBoss />
          </div>
          <div className="mt-12">
            <TrophyCabinet />
          </div>
        </SectionShell>
      </ZoneGate>

      <ZoneGate zoneId="contact">
        <SectionShell
          id="contact"
          title="Final Transmission"
          subtitle="Send the recruitment signal to complete the campaign."
        >
          <ContactZone />
        </SectionShell>
      </ZoneGate>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Rishit Luthra · Interactive career RPG
      </footer>
    </>
  );
}
