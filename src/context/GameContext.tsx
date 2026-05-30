"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import type { SectionId } from "@/data/portfolio";
import { getLevel, getLevelTitle } from "@/data/portfolio";
import {
  ZONE_ORDER,
  ZONE_QUESTS,
  getTotalObjectives,
} from "@/data/quests";
import { burstConfetti } from "@/lib/confetti";
import { playAchievementSound, playXpSound } from "@/lib/sounds";

type Toast = {
  id: string;
  title: string;
  subtitle?: string;
  xp?: number;
};

type State = {
  xp: number;
  completedObjectives: Set<string>;
  completedZones: Set<SectionId>;
  unlockedZones: Set<SectionId>;
  unlockedBadges: Set<string>;
  unlockedSkills: Set<string>;
  missionBriefings: Set<string>;
  bossCorrect: Set<string>;
  developerMode: boolean;
  soundEnabled: boolean;
  toasts: Toast[];
  showCompletionModal: boolean;
  lastLevel: number;
  showLevelUp: boolean;
};

type Action =
  | { type: "COMPLETE_OBJECTIVE"; objectiveId: string; zoneId: SectionId }
  | { type: "UNLOCK_SKILL"; skillId: string }
  | { type: "BRIEF_MISSION"; missionId: string }
  | { type: "BOSS_ANSWER"; questionId: string; correct: boolean }
  | { type: "UNLOCK_BADGE"; badgeId: string; title: string; subtitle?: string }
  | { type: "DEVELOPER_MODE" }
  | { type: "TOGGLE_SOUND" }
  | { type: "DISMISS_TOAST"; id: string }
  | { type: "DISMISS_COMPLETION" }
  | { type: "DISMISS_LEVEL_UP" }
  | { type: "RESTORE"; payload: SerializedState };

type SerializedState = {
  xp: number;
  completedObjectives: string[];
  completedZones: SectionId[];
  unlockedZones: SectionId[];
  unlockedBadges: string[];
  unlockedSkills: string[];
  missionBriefings: string[];
  bossCorrect: string[];
  developerMode: boolean;
  soundEnabled: boolean;
  showCompletionModal: boolean;
};

const STORAGE_KEY = "rishit-portfolio-game-v2";

const initialState: State = {
  xp: 0,
  completedObjectives: new Set(),
  completedZones: new Set(),
  unlockedZones: new Set(["about"]),
  unlockedBadges: new Set(),
  unlockedSkills: new Set(),
  missionBriefings: new Set(),
  bossCorrect: new Set(),
  developerMode: false,
  soundEnabled: false,
  toasts: [],
  showCompletionModal: false,
  lastLevel: 1,
  showLevelUp: false,
};

function zoneObjectivesDone(state: State, zoneId: SectionId) {
  const quest = ZONE_QUESTS[zoneId];
  return quest.objectives.every((o) => state.completedObjectives.has(o.id));
}

function completeZoneIfReady(state: State, zoneId: SectionId): State {
  if (state.completedZones.has(zoneId)) return state;
  if (!zoneObjectivesDone(state, zoneId)) return state;

  const quest = ZONE_QUESTS[zoneId];
  const completedZones = new Set(state.completedZones);
  completedZones.add(zoneId);

  const unlockedZones = new Set(state.unlockedZones);
  if (quest.unlocksNext) unlockedZones.add(quest.unlocksNext);

  let xp = state.xp + quest.xpReward;
  const unlockedBadges = new Set(state.unlockedBadges);
  const toasts: Toast[] = [
    ...state.toasts,
    {
      id: `zone-${zoneId}-${Date.now()}`,
      title: `Zone Cleared: ${quest.title}`,
      subtitle: `+${quest.xpReward} XP`,
      xp: quest.xpReward,
    },
  ];

  if (quest.badgeId && !unlockedBadges.has(quest.badgeId)) {
    unlockedBadges.add(quest.badgeId);
    toasts.push({
      id: `badge-zone-${quest.badgeId}`,
      title: "Achievement Unlocked",
      subtitle: quest.badgeId,
    });
  }

  let showCompletionModal = state.showCompletionModal;
  if (zoneId === "contact") {
    showCompletionModal = true;
    xp += 100;
    toasts.push({
      id: "game-complete",
      title: "Campaign Complete!",
      subtitle: "+100 XP · Full portfolio mastered",
      xp: 100,
    });
  }

  const prevLevel = getLevel(state.xp);
  const newLevel = getLevel(xp);

  return {
    ...state,
    xp,
    completedZones,
    unlockedZones,
    unlockedBadges,
    toasts,
    showCompletionModal,
    lastLevel: newLevel,
    showLevelUp: newLevel > prevLevel,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "COMPLETE_OBJECTIVE": {
      if (state.completedObjectives.has(action.objectiveId)) return state;
      const completedObjectives = new Set(state.completedObjectives);
      completedObjectives.add(action.objectiveId);
      const next = {
        ...state,
        completedObjectives,
        toasts: [
          ...state.toasts,
          {
            id: `obj-${action.objectiveId}`,
            title: "Objective Complete",
            subtitle: ZONE_QUESTS[action.zoneId].objectives.find(
              (o) => o.id === action.objectiveId
            )?.label,
          },
        ],
      };
      return completeZoneIfReady(next, action.zoneId);
    }
    case "UNLOCK_SKILL": {
      if (state.unlockedSkills.has(action.skillId)) return state;
      const unlockedSkills = new Set(state.unlockedSkills);
      unlockedSkills.add(action.skillId);
      const next = { ...state, unlockedSkills };
      if (unlockedSkills.size >= 3 && !state.completedObjectives.has("about-skills")) {
        return reducer(
          { ...next, completedObjectives: new Set(state.completedObjectives) },
          { type: "COMPLETE_OBJECTIVE", objectiveId: "about-skills", zoneId: "about" }
        );
      }
      return next;
    }
    case "BRIEF_MISSION": {
      if (state.missionBriefings.has(action.missionId)) return state;
      const missionBriefings = new Set(state.missionBriefings);
      missionBriefings.add(action.missionId);
      let next: State = { ...state, missionBriefings };
      const objMap: Record<string, string> = {
        "mission-01": "proj-m01",
        "mission-02": "proj-m02",
      };
      const objId = objMap[action.missionId];
      if (objId && !state.completedObjectives.has(objId)) {
        next = reducer(next, {
          type: "COMPLETE_OBJECTIVE",
          objectiveId: objId,
          zoneId: "projects",
        });
      }
      return next;
    }
    case "BOSS_ANSWER": {
      if (!action.correct) return state;
      const bossCorrect = new Set(state.bossCorrect);
      bossCorrect.add(action.questionId);
      let next: State = { ...state, bossCorrect };
      if (bossCorrect.size >= 4 && !state.completedObjectives.has("lead-boss")) {
        next = reducer(next, {
          type: "COMPLETE_OBJECTIVE",
          objectiveId: "lead-boss",
          zoneId: "leadership",
        });
        if (!state.unlockedBadges.has("recruiter-champion")) {
          const badges = new Set(next.unlockedBadges);
          badges.add("recruiter-champion");
          next = {
            ...next,
            unlockedBadges: badges,
            toasts: [
              ...next.toasts,
              { id: "recruiter-champ", title: "Mission Accomplished", subtitle: "Recruiter Champion" },
            ],
          };
        }
      }
      return next;
    }
    case "UNLOCK_BADGE": {
      if (state.unlockedBadges.has(action.badgeId)) return state;
      const badges = new Set(state.unlockedBadges);
      badges.add(action.badgeId);
      return {
        ...state,
        unlockedBadges: badges,
        toasts: [
          ...state.toasts,
          { id: `badge-${action.badgeId}`, title: "Achievement Unlocked", subtitle: action.title },
        ],
      };
    }
    case "DEVELOPER_MODE":
      return { ...state, developerMode: true };
    case "TOGGLE_SOUND":
      return { ...state, soundEnabled: !state.soundEnabled };
    case "DISMISS_TOAST":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case "DISMISS_COMPLETION":
      return { ...state, showCompletionModal: false };
    case "DISMISS_LEVEL_UP":
      return { ...state, showLevelUp: false };
    case "RESTORE": {
      const p = action.payload;
      return {
        ...state,
        xp: p.xp ?? 0,
        completedObjectives: new Set(p.completedObjectives ?? []),
        completedZones: new Set(p.completedZones ?? []),
        unlockedZones: new Set(p.unlockedZones ?? ["about"]),
        unlockedBadges: new Set(p.unlockedBadges ?? []),
        unlockedSkills: new Set(p.unlockedSkills ?? []),
        missionBriefings: new Set(p.missionBriefings ?? []),
        bossCorrect: new Set(p.bossCorrect ?? []),
        developerMode: p.developerMode ?? false,
        soundEnabled: p.soundEnabled ?? false,
        showCompletionModal: p.showCompletionModal ?? false,
        lastLevel: getLevel(p.xp ?? 0),
      };
    }
    default:
      return state;
  }
}

export type GameContextValue = State & {
  level: number;
  levelTitle: string;
  progressPercent: number;
  activeZone: SectionId;
  completeObjective: (objectiveId: string, zoneId: SectionId) => void;
  unlockSkill: (skillId: string) => void;
  briefMission: (missionId: string) => void;
  answerBoss: (questionId: string, correct: boolean) => void;
  isZoneUnlocked: (zone: SectionId) => boolean;
  isZoneComplete: (zone: SectionId) => boolean;
  isObjectiveDone: (id: string) => boolean;
  unlockBadge: (badgeId: string, title: string, subtitle?: string) => void;
  enableDeveloperMode: () => void;
  toggleSound: () => void;
  dismissToast: (id: string) => void;
  dismissCompletion: () => void;
  dismissLevelUp: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "RESTORE", payload: JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    const s = state;
    const payload: SerializedState = {
      xp: s.xp,
      completedObjectives: [...s.completedObjectives],
      completedZones: [...s.completedZones],
      unlockedZones: [...s.unlockedZones],
      unlockedBadges: [...s.unlockedBadges],
      unlockedSkills: [...s.unlockedSkills],
      missionBriefings: [...s.missionBriefings],
      bossCorrect: [...s.bossCorrect],
      developerMode: s.developerMode,
      soundEnabled: s.soundEnabled,
      showCompletionModal: s.showCompletionModal,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [state]);

  const completeObjective = useCallback((objectiveId: string, zoneId: SectionId) => {
    dispatch({ type: "COMPLETE_OBJECTIVE", objectiveId, zoneId });
  }, []);

  const unlockSkill = useCallback((skillId: string) => {
    dispatch({ type: "UNLOCK_SKILL", skillId });
  }, []);

  const briefMission = useCallback((missionId: string) => {
    dispatch({ type: "BRIEF_MISSION", missionId });
  }, []);

  const answerBoss = useCallback((questionId: string, correct: boolean) => {
    dispatch({ type: "BOSS_ANSWER", questionId, correct });
  }, []);

  const unlockBadge = useCallback((badgeId: string, title: string, subtitle?: string) => {
    dispatch({ type: "UNLOCK_BADGE", badgeId, title, subtitle });
  }, []);

  const enableDeveloperMode = useCallback(() => {
    dispatch({ type: "DEVELOPER_MODE" });
    dispatch({
      type: "UNLOCK_BADGE",
      badgeId: "developer-mode",
      title: "Developer Mode",
    });
  }, []);

  const toggleSound = useCallback(() => dispatch({ type: "TOGGLE_SOUND" }), []);
  const dismissToast = useCallback((id: string) => dispatch({ type: "DISMISS_TOAST", id }), []);
  const dismissCompletion = useCallback(() => dispatch({ type: "DISMISS_COMPLETION" }), []);
  const dismissLevelUp = useCallback(() => dispatch({ type: "DISMISS_LEVEL_UP" }), []);

  const level = getLevel(state.xp);
  const levelTitle = getLevelTitle(level);

  const progressPercent = useMemo(() => {
    const total = getTotalObjectives();
    const done = state.completedObjectives.size;
    return Math.round((done / total) * 100);
  }, [state.completedObjectives]);

  const activeZone = useMemo(() => {
    for (const z of ZONE_ORDER) {
      if (!state.completedZones.has(z)) return z;
    }
    return "contact" as SectionId;
  }, [state.completedZones]);

  const isZoneUnlocked = useCallback(
    (zone: SectionId) => state.unlockedZones.has(zone),
    [state.unlockedZones]
  );

  const isZoneComplete = useCallback(
    (zone: SectionId) => state.completedZones.has(zone),
    [state.completedZones]
  );

  const isObjectiveDone = useCallback(
    (id: string) => state.completedObjectives.has(id),
    [state.completedObjectives]
  );

  const prevToastCount = useRef(0);
  useEffect(() => {
    if (state.toasts.length <= prevToastCount.current) {
      prevToastCount.current = state.toasts.length;
      return;
    }
    const latest = state.toasts[state.toasts.length - 1];
    prevToastCount.current = state.toasts.length;
    if (
      latest.title.includes("Achievement") ||
      latest.title.includes("Mission") ||
      latest.title.includes("Zone Cleared") ||
      latest.title.includes("Campaign")
    ) {
      burstConfetti();
      playAchievementSound(state.soundEnabled);
    } else if (latest.xp) {
      playXpSound(state.soundEnabled);
    }
    const t = setTimeout(() => dismissToast(latest.id), 4500);
    return () => clearTimeout(t);
  }, [state.toasts, state.soundEnabled, dismissToast]);

  useEffect(() => {
    if (state.showCompletionModal) burstConfetti();
  }, [state.showCompletionModal]);

  const value: GameContextValue = {
    ...state,
    level,
    levelTitle,
    progressPercent,
    activeZone,
    completeObjective,
    unlockSkill,
    briefMission,
    answerBoss,
    isZoneUnlocked,
    isZoneComplete,
    isObjectiveDone,
    unlockBadge,
    enableDeveloperMode,
    toggleSound,
    dismissToast,
    dismissCompletion,
    dismissLevelUp,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
