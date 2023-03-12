import { AppState } from "./AppStateContext";
import { ExerciseType } from "./LibraryAPI";
import { PlanItemType, PlanType } from "./PlanAPI";
import { PracticeSessionType } from "./PracticeSessionAPI";

interface PayloadType {
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
  addExercise: {
    exercise: ExerciseType;
  };
  startPracticeSession: {
    currentPlanId?: string;
    currentExercsieId?: string;
  };
  stopPracticeSession: {};
  pausePracticeSession: {};
  resumePracticeSession: {};
  setPracticeSession: PracticeSessionType;
}

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
  addExercise: (prev, args) => {
    function addToParentRecursive(
      exercises: ExerciseType[],
      newExercise: ExerciseType
    ) {
      console.log("add");
      const output = [];
      for (const ex of exercises) {
        if (ex.id === newExercise.parentId) {
          console.log(ex.name);
          ex.subItems = ex.subItems
            ? [...ex.subItems, newExercise]
            : [newExercise];
          output.push(ex);
          continue;
        }

        if (ex.subItems) {
          ex.subItems = addToParentRecursive(ex.subItems, newExercise);
        }

        output.push(ex);
      }

      return output;
    }

    const newExercises = args.exercise.parentId
      ? addToParentRecursive([...prev.exercises], args.exercise)
      : [...prev.exercises, args.exercise];
    return {
      ...prev,
      exercises: newExercises,
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
  setPracticeSession: (prev, args) => {
    return {
      ...prev,
      practiceSession: {
        ...args,
      },
    };
  },
};
