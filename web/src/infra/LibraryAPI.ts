export interface ExerciseType {
  id: string;
  name: string;
  parentId?: string;
  img?: string;
  subItems?: ExerciseType[];
}

export async function fetchExercises(): Promise<ExerciseType[]> {
  return [];
}

export async function fetchExerciseById(
  exerciseId: string
): Promise<ExerciseType | null> {
  return null;
}

export async function addExercise(exercise: Omit<ExerciseType, "id">): Promise<{
  success: boolean;
  id?: string;
}> {
  return { success: true, id: Date.now().toString() };
}
