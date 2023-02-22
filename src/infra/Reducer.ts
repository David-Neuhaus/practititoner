import { AppState } from "./AppStateContext";
import { ExerciseType, PlanItemType, PlanType } from "./PlanAPI";

type PayloadType = {
  setPlanItems: {
    planId: string;
    items: PlanItemType[];
  };
  addPlan: {
    plan: PlanType;
  };
  removePlan: {
    id: string;
  };
  setPlanName: {
    planId: string;
    name: string;
  };
  setPlans: {
    plans: PlanType[];
  };
  setExercises: {
    exercises: ExerciseType[];
  };
  startPracticeSession: {
    currentPlanId?: string;
    currentExercsieId?: string;
  };
  stopPracticeSession: {};
  pausePracticeSession: {};
  resumePracticeSession: {};
};

export type ActionType = {
  [T in keyof PayloadType]: {
    type: T;
    payload: PayloadType[T];
  };
}[keyof PayloadType];

type ReducerType = {
  [T in keyof PayloadType]: (prev: AppState, args: PayloadType[T]) => AppState;
};

export const Reducers: ReducerType = {
  addPlan: (prev, args) => {
    return {
      ...prev,
      plans: [
        ...prev.plans,
        {
          ...args.plan,
          items: [...args.plan.items],
        },
      ],
    };
  },
  removePlan: (prev, args) => {
    return {
      ...prev,
      plans: prev.plans.filter((plan) => plan.id !== args.id),
    };
  },
  setPlanItems: (prev, args) => {
    return {
      ...prev,
      plans: prev.plans.map((plan) =>
        plan.id === args.planId ? { ...plan, items: [...args.items] } : plan
      ),
    };
  },
  setPlans: (prev, args) => {
    return {
      ...prev,
      plans: [...args.plans],
    };
  },
  setExercises: (prev, args) => {
    return {
      ...prev,
      exercises: [...args.exercises],
    };
  },
  setPlanName: (prev, args) => {
    return {
      ...prev,
      plans: prev.plans.map((plan) =>
        plan.id === args.planId ? { ...plan, name: args.name } : plan
      ),
    };
  },
  startPracticeSession: (prev, args) => {
    return {
      ...prev,
      practiceSession: {
        start: Date.now(),
        paused: false,
        ...args,
      },
    };
  },
  stopPracticeSession: (prev) => {
    return {
      ...prev,
      practiceSession: undefined,
    };
  },
  pausePracticeSession: (prev) => {
    return {
      ...prev,
      practiceSession: prev.practiceSession
        ? {
            ...prev.practiceSession,
            paused: true,
          }
        : undefined,
    };
  },
  resumePracticeSession: (prev) => {
    return {
      ...prev,
      practiceSession: prev.practiceSession
        ? {
            ...prev.practiceSession,
            paused: false,
          }
        : undefined,
    };
  },
};
