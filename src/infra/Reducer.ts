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
};
