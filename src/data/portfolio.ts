export const SECTIONS = [
  { id: "about", label: "About Me", xp: 10 },
  { id: "experience", label: "Experience", xp: 20 },
  { id: "projects", label: "Projects", xp: 30 },
  { id: "research", label: "Research", xp: 50 },
  { id: "leadership", label: "Leadership", xp: 20 },
  { id: "contact", label: "Contact", xp: 10 },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const BADGES = [
  {
    id: "university-topper",
    emoji: "🏆",
    title: "University Topper",
    description: "MCA University Topper · BCA College Topper · 9.6 GPA",
    unlockSection: "about" as SectionId,
    questItem: true,
  },
  {
    id: "ai-engineer",
    emoji: "🤖",
    title: "AI Engineer",
    description: "Built production-grade AI systems",
    unlockSection: "projects" as SectionId,
  },
  {
    id: "researcher",
    emoji: "📚",
    title: "Researcher",
    description: "Published and presented AI research work",
    unlockSection: "research" as SectionId,
    questItem: true,
    secret: true,
  },
  {
    id: "club-president",
    emoji: "👑",
    title: "Club President",
    description: "Led technical clubs and student initiatives",
    unlockSection: "leadership" as SectionId,
    questItem: true,
  },
  {
    id: "business-analyst",
    emoji: "💼",
    title: "Business Analyst",
    description: "Bridged AI with insurance enterprise workflows",
    unlockSection: "experience" as SectionId,
  },
  {
    id: "full-stack",
    emoji: "🚀",
    title: "Full Stack Developer",
    description: "End-to-end web and AI application delivery",
    unlockSection: "projects" as SectionId,
  },
  {
    id: "developer-mode",
    emoji: "⚡",
    title: "Developer Mode",
    description: "Konami code activated",
    easterEgg: true,
  },
  {
    id: "recruiter-champion",
    emoji: "🎯",
    title: "Recruiter Champion",
    description: "Completed the Recruiter Challenge",
    questComplete: true,
  },
] as const;

export const RECRUITER_QUEST = [
  { id: "university-topper", label: "The University Topper Achievement", badgeId: "university-topper" },
  { id: "ai-research", label: "The AI Research Experience", badgeId: "researcher" },
  { id: "insurance-ai", label: "The Insurance AI Project", badgeId: "ai-engineer" },
  { id: "leadership", label: "The Leadership Experience", badgeId: "club-president" },
] as const;

export const MISSIONS = [
  {
    id: "mission-01",
    number: "01",
    title: "AI Agents for Insurance",
    description:
      "Deployed Creatio AI agents for insurance & broking — policy assistance, lead qualification, and client query handling with C# backend logic.",
    difficulty: 5,
    category: "Enterprise" as const,
    status: "Completed" as const,
    tech: ["Creatio AI", "C#", "REST APIs"],
  },
  {
    id: "mission-02",
    number: "02",
    title: "ClauseFlow AI",
    description:
      "Full-stack platform for automated legal contract generation with Ollama-powered drafting, risk analysis, and secure authentication.",
    difficulty: 4,
    category: "AI" as const,
    status: "Completed" as const,
    tech: ["Next.js", "Node.js", "MongoDB", "Ollama"],
  },
  {
    id: "mission-03",
    number: "03",
    title: "Image Caption Generator",
    description:
      "Developed a deep learning model combining CNN encoders with attention-based decoders for descriptive image captions.",
    difficulty: 4,
    category: "Research" as const,
    status: "Completed" as const,
    tech: ["TensorFlow", "Computer Vision", "NLP"],
  },
  {
    id: "mission-04",
    number: "04",
    title: "Lip Reading System",
    description:
      "Combined computer vision and sequence modeling to detect spoken words from lip movements for visual speech interpretation.",
    difficulty: 5,
    category: "Research" as const,
    status: "Completed" as const,
    tech: ["TensorFlow", "Keras", "Sequence Modeling"],
  },
] as const;

export const CONTACT = {
  email: "luthrarishit1234@gmail.com",
  phone: "+91 8587815662",
  location: "New Delhi, India",
} as const;

export const JOURNEY_STAGES = [
  {
    id: "student",
    title: "Student",
    period: "2021 – 2026",
    description: "BCA and MCA at GGSIPU — ML, AI, full-stack development, and cloud computing foundations.",
    highlight: "BCA Topper 9.4 · MCA 9.6 GPA",
  },
  {
    id: "researcher",
    title: "Researcher",
    period: "2024 – 2025",
    description: "Semantics-aware malware detection and deep face detection research at IITM, GGSIPU.",
    highlight: "Cybersecurity · Computer Vision",
  },
  {
    id: "ai-developer",
    title: "AI Developer",
    period: "2023 – 2025",
    description: "Built 8+ ML projects and full-stack platforms from internships through personal R&D.",
    highlight: "8+ Projects · SIH x2 · ML Competition Winner",
  },
  {
    id: "business-analyst",
    title: "Insurance Business Analyst",
    period: "Jan 2026 – Present",
    description: "White Gate Consulting (Singapore, remote) — AI agents, C# backends, and NFR-to-production delivery.",
    highlight: "Creatio AI · Enterprise Insurance Automation",
  },
  {
    id: "future-architect",
    title: "Future AI Architect",
    period: "Next Chapter",
    description: "Designing scalable, responsible AI platforms that bridge research and enterprise impact.",
    highlight: "Open to AI Engineering & Architecture roles",
  },
] as const;

export const SKILL_TREE = {
  core: { id: "ai-engineer", label: "AI Engineer" },
  branches: [
    {
      id: "ml",
      label: "Machine Learning",
      children: [
        { id: "dl", label: "Deep Learning" },
        { id: "cv", label: "Computer Vision" },
        { id: "nlp", label: "NLP" },
      ],
    },
    {
      id: "swe",
      label: "Software Engineering",
      children: [
        { id: "react", label: "React" },
        { id: "nextjs", label: "Next.js" },
        { id: "node", label: "Node.js" },
      ],
    },
    {
      id: "enterprise",
      label: "Enterprise Technology",
      children: [
        { id: "insurance", label: "Insurance Automation" },
        { id: "csharp", label: "C#" },
        { id: "api", label: "API Integration" },
      ],
    },
  ],
} as const;

export const GAME_STATS = [
  { label: "MCA GPA", value: "9.6", icon: "📊" },
  { label: "Projects Completed", value: "8+", icon: "🎯" },
  { label: "Research Works", value: "2", icon: "📚" },
  { label: "Team Led", value: "100", icon: "👑" },
  { label: "GPA Rank", value: "Uni Topper", icon: "🏆" },
  { label: "Hackathons", value: "SIH x2", icon: "⚡" },
] as const;

export const HIDDEN_FACTS = [
  "Selected twice for Smart India Hackathon (SIH).",
  "MCA University Topper with a 9.6 GPA at GGSIPU IITM.",
  "Led 100 members as President of the AI Experience Center.",
  "Currently building AI agents for insurance at White Gate Consulting.",
  "Won 1st place in a college-level Machine Learning competition.",
] as const;

export const NPC_RESPONSES: Record<string, { text: string; scrollTo?: SectionId }> = {
  experience: {
    text: "Rishit progressed from academic excellence to enterprise AI — research, hackathons, and insurance technology define his experience arc. Scroll to Experience for the full journey map.",
    scrollTo: "experience",
  },
  projects: {
    text: "Mission briefing: AI Agents for Insurance, ClauseFlow AI, Image Caption Generator, and Lip Reading System. Each mission is in the Project Arena.",
    scrollTo: "projects",
  },
  research: {
    text: "Research at IITM GGSIPU: semantics-aware malware detection and deep face detection using CNNs. See the Research section for details.",
    scrollTo: "research",
  },
  leadership: {
    text: "President of AIEC (GGSIPU–IITM) — led 100 members and directed Techno Sapiens for 1,000+ students. Check Leadership.",
    scrollTo: "leadership",
  },
  default: {
    text: "I'm Rishit's AI guide. Ask about his experience, projects, research, or leadership — I'll navigate you through his career world.",
  },
};

export const XP_PER_LEVEL = 60;
export const COMPLETION_XP = 100;

export function getLevel(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export function getLevelTitle(level: number) {
  if (level >= 10) return "AI Architect";
  if (level >= 7) return "AI Explorer";
  if (level >= 5) return "ML Navigator";
  if (level >= 3) return "Code Scout";
  return "Rookie Explorer";
}
