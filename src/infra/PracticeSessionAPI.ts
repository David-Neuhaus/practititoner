export type TimerType = {
  start: number;
  end: number;
  name?: string;
};

export type PracticeLogItemType = {
  start: number;
  end: number;
  exerciseId: string;
  reflection: number;
};

export type PracticeSessionType = {
  start: number;
  paused: boolean;
  currentPlanId?: string;
  startedCurrentPlan?: number;
  currentExerciseId?: string;
  startedCurrentExercise?: number;
  currentIndexInPlan?: number;
  practiceLog?: PracticeLogItemType;
};

export async function startPracticeSession(): Promise<{ succcess: boolean }> {
  // TODO Call API

  return {
    succcess: true,
  };
}

export async function stopPracticeSession(): Promise<{ success: boolean }> {
  // TODO Call API

  return {
    success: true,
  };
}

export async function pausePracticeSession(): Promise<{ success: boolean }> {
  // TODO Call API

  return {
    success: true,
  };
}

export async function resumePracticeSession(): Promise<{ success: boolean }> {
  // TODO Call API

  return {
    success: true,
  };
}

export async function setPracticeSession(
  newSession: PracticeSessionType
): Promise<{ success: boolean }> {
  // TODO Call API

  return {
    success: true,
  };
}
