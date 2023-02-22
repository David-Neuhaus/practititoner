import { useContext, useMemo } from "react";
import { AppStateContext } from "./AppStateContext";
import { ExerciseType } from "./PlanAPI";

export function usePlanById(id: string) {
  const state = useContext(AppStateContext);
  const plan = useMemo(
    () => state.plans.find((plan) => plan.id === id),
    [state, id]
  );
  return plan;
}

// TODO faster exercise search function
function recursiveExerciseSearch(
  exercises: ExerciseType[],
  id: string
): ExerciseType | false {
  for (const ex of exercises) {
    if (ex.id === id) return ex;
    if (ex.subItems) {
      const found = recursiveExerciseSearch(ex.subItems, id);
      if (found) return found;
    }
  }
  return false;
}

export function useExerciseById(id: string) {
  const state = useContext(AppStateContext);
  const found = useMemo(
    () => recursiveExerciseSearch(state.exercises, id),
    [state, id]
  );
  if (found) return found;
  else return null;
}

export function usePracticeSession() {
  const state = useContext(AppStateContext);
  return state.practiceSession;
}
