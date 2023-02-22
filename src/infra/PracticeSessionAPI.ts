export type TimerType = {
  start: number;
  end: number;
  name?: string;
};

export type PracticeSessionType = {
  start: number;
  paused: boolean;
  currentPlanId?: string;
  currentExerciseId?: string;
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
  newSession: Partial<PracticeSessionType>
): Promise<{ success: boolean }> {
  // TODO Call API

  return {
    success: true,
  };
}
