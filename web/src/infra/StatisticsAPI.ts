import { PracticeLogItemType } from "./PracticeSessionAPI";

export type StatisticsItemType = {
  id: string; // TODO needed?
  sessions: SavedSessionType[];
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
  byPlanOrExercise: {
    [key: string]: StatisticsItemType;
  };
  practiceSessions: SavedSessionType[];
};
