export type ExerciseType = {
  id: string;
  name: string;
  parentId?: string;
  img?: string;
  subItems?: ExerciseType[];
};

export type PlanItemType = {
  exerciseId: string;
  amount?: number;
  duration?: number;
};

export type PlanType = {
  id: string;
  name: string;
  items: PlanItemType[];
};

export async function fetchPlanById(planId: string): Promise<PlanType | null> {
  // TODO Call API
  return null;
}

export async function fetchPlans(): Promise<PlanType[]> {
  // TODO Call API
  return [];
}

export async function addPlan(
  newPlan: Omit<PlanType, "id">
): Promise<{ success: boolean; id?: string }> {
  // TODO call API
  return { success: true, id: Date.now().toString() };
}

export async function removePlan(
  planId: string
): Promise<{ success: boolean }> {
  // TODO call API
  return { success: true };
}

export async function setPlanItems(
  planId: string,
  items: PlanItemType[]
): Promise<{ success: boolean }> {
  // TODO call API
  return { success: true };
}

export async function setPlanName(
  planId: string,
  name: string
): Promise<{ success: boolean }> {
  // TODO call API

  return { success: true };
}

export async function fetchExercises(): Promise<ExerciseType[]> {
  return [];
}

export async function fetchExerciseById(
  exerciseId: string
): Promise<ExerciseType | null> {
  return null;
}
