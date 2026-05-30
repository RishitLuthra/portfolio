import type { SectionId } from "./portfolio";

export type ZoneId = SectionId | "hub";

export type ObjectiveType = "quiz" | "click" | "skills" | "missions" | "match" | "code" | "boss" | "transmit";

export type QuestObjective = {
  id: string;
  label: string;
  type: ObjectiveType;
  hint?: string;
};

export type ZoneQuest = {
  zoneId: SectionId;
  title: string;
  story: string;
  xpReward: number;
  badgeId?: string;
  objectives: QuestObjective[];
  unlocksNext: SectionId | null;
};

export const ZONE_ORDER: SectionId[] = [
  "about",
  "experience",
  "projects",
  "research",
  "leadership",
  "contact",
];

export const ZONE_QUESTS: Record<SectionId, ZoneQuest> = {
  about: {
    zoneId: "about",
    title: "Quest 1 · Origin Scan",
    story: "Prove you read Rishit's profile. Answer the intel check and power up the skill tree.",
    xpReward: 75,
    badgeId: "university-topper",
    unlocksNext: "experience",
    objectives: [
      { id: "about-quiz", label: "Pass the GPA intel check", type: "quiz", hint: "Check the About section bio." },
      { id: "about-skills", label: "Activate 3 skill branches", type: "skills", hint: "Click each branch head in the Skill Tree." },
      { id: "about-scan", label: "Scan the player stats panel", type: "click", hint: "Click the stats grid once." },
    ],
  },
  experience: {
    zoneId: "experience",
    title: "Quest 2 · Journey Path",
    story: "Walk the career timeline and identify where Rishit works today.",
    xpReward: 100,
    badgeId: "business-analyst",
    unlocksNext: "projects",
    objectives: [
      { id: "exp-stages", label: "Activate all 5 journey milestones", type: "click", hint: "Click each stage on the map." },
      { id: "exp-quiz", label: "Pass the employer intel check", type: "quiz" },
    ],
  },
  projects: {
    zoneId: "projects",
    title: "Quest 3 · Mission Briefing",
    story: "Open enterprise missions and match tech stacks to the right project.",
    xpReward: 125,
    badgeId: "ai-engineer",
    unlocksNext: "research",
    objectives: [
      { id: "proj-m01", label: "Briefing: AI Agents for Insurance", type: "missions" },
      { id: "proj-m02", label: "Briefing: ClauseFlow AI", type: "missions" },
      { id: "proj-match", label: "Win the Tech Match mini-game", type: "match" },
    ],
  },
  research: {
    zoneId: "research",
    title: "Quest 4 · Lab Access",
    story: "Inspect research artifacts and crack the hidden terminal code.",
    xpReward: 100,
    badgeId: "researcher",
    unlocksNext: "leadership",
    objectives: [
      { id: "res-malware", label: "Inspect malware detection research", type: "click" },
      { id: "res-face", label: "Inspect face detection research", type: "click" },
      { id: "res-code", label: "Enter terminal code SIH", type: "code", hint: "Hackathon clue — 3 letters." },
    ],
  },
  leadership: {
    zoneId: "leadership",
    title: "Quest 5 · Command Center",
    story: "Unlock leadership pillars, then survive the Recruiter Boss interview.",
    xpReward: 100,
    badgeId: "club-president",
    unlocksNext: "contact",
    objectives: [
      { id: "lead-aiec", label: "Unlock AIEC President intel", type: "click" },
      { id: "lead-techno", label: "Unlock Techno Sapiens intel", type: "click" },
      { id: "lead-sih", label: "Unlock SIH & ML Winner intel", type: "click" },
      { id: "lead-boss", label: "Defeat the Recruiter Boss (4/4)", type: "boss" },
    ],
  },
  contact: {
    zoneId: "contact",
    title: "Quest 6 · Final Transmission",
    story: "Send the recruitment signal and claim your completion reward.",
    xpReward: 150,
    unlocksNext: null,
    objectives: [
      { id: "contact-signal", label: "Transmit code RECRUIT", type: "transmit" },
      { id: "contact-resume", label: "Claim resume reward", type: "click" },
    ],
  },
};

export const ABOUT_QUIZ = {
  question: "What is Rishit's current MCA GPA at GGSIPU IITM?",
  options: ["8.6", "9.0", "9.6", "9.4"],
  correct: "9.6",
};

export const EXPERIENCE_QUIZ = {
  question: "Where is Rishit currently working (Jan 2026)?",
  options: ["MeriSkill", "White Gate Consulting", "CodSoft", "Google"],
  correct: "White Gate Consulting",
};

export const BOSS_QUESTIONS = [
  {
    id: "b1",
    question: "Which platform powers Rishit's insurance AI agents?",
    options: ["Creatio AI", "Salesforce", "SAP", "HubSpot"],
    correct: "Creatio AI",
  },
  {
    id: "b2",
    question: "How many members did Rishit lead as AIEC President?",
    options: ["25", "50", "100", "200"],
    correct: "100",
  },
  {
    id: "b3",
    question: "Which research topic combines semantics with ML?",
    options: ["Lip Reading", "Malware Detection", "Customer Segmentation", "Dropout Prediction"],
    correct: "Malware Detection",
  },
  {
    id: "b4",
    question: "ClauseFlow AI uses which local LLM runtime?",
    options: ["Ollama", "OpenAI API", "Gemini", "Claude"],
    correct: "Ollama",
  },
] as const;

export const MATCH_PAIRS = [
  { id: "p1", tech: "Creatio AI + C#", project: "AI Agents for Insurance" },
  { id: "p2", tech: "Next.js + Ollama", project: "ClauseFlow AI" },
  { id: "p3", tech: "TensorFlow + Flickr8k", project: "Image Caption Generator" },
  { id: "p4", tech: "Keras + Sequence Model", project: "Lip Reading System" },
] as const;

export const TERMINAL_CODE = "SIH";
export const TRANSMIT_CODE = "RECRUIT";

export function getTotalObjectives() {
  return ZONE_ORDER.reduce((n, z) => n + ZONE_QUESTS[z].objectives.length, 0);
}
