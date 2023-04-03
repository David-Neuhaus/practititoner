import { PracticeLogItemType } from "./PracticeSessionAPI";

export type StatisticsItemType = {
  id: string; // TODO needed?
  sessionIds: string[];
  averageRating: number;
  totalPracticeTime: number;
};

export type SavedSessionType = {
  id: string;
  start: number;
  end: number;
  practiceLog: PracticeLogItemType[];
  rating: number;
};

export type StatisticsType = {
  byPlanOrExerciseId: {
    [key: string]: StatisticsItemType;
  };
  sessionIdsByDate: {
    [key: string]: string[];
  };
  practiceSessions: SavedSessionType[];
};
