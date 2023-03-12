/**
 * AppStateContext.tsx
 *
 * Defines the app global state in a react context object.
 */

import React, { createContext, useReducer } from "react";
import { PlanType } from "./PlanAPI";
import { ActionType, Reducers } from "./Reducer";
import { useFetch } from "./Network";
import { PracticeSessionType } from "./PracticeSessionAPI";
import { ExerciseType } from "./LibraryAPI";

// Test Data
export const plansTestData: PlanType[] = [
  {
    id: "1",
    name: "Technique",
    items: [
      { exerciseId: "20" },
      {
        exerciseId: "2",
        amount: 3,
      },
      {
        exerciseId: "3",
        duration: 20,
        amount: 1,
      },
    ],
  },
  {
    id: "2",
    name: "My Practice Plan",
    items: [
      { exerciseId: "20" },
      {
        exerciseId: "2",
        amount: 3,
      },
      {
        exerciseId: "3",
        duration: 20,
        amount: 1,
      },
    ],
  },
];

export const exercisesTestData: ExerciseType[] = [
  {
    name: "Double stops",
    id: "3",
    subItems: [
      { name: "No 2.", parentId: "3", id: "42" },
      { name: "No 1.", parentId: "3", id: "41" },
      { name: "No 3.", parentId: "3", id: "43" },
      { name: "No 4.", parentId: "3", id: "44" },
      { name: "No 5.", parentId: "3", id: "45" },
      { name: "No 6.", parentId: "3", id: "46" },
    ],
  },
  {
    name: "Legato",
    id: "7",
    subItems: [
      {
        name: "Übung 2",
        parentId: "7",
        id: "5",
      },
      {
        name: "Sevcik",
        parentId: "7",
        id: "2",
        subItems: [
          { name: "No 1.", parentId: "2", id: "31" },
          { name: "No 2.", parentId: "2", id: "32" },
          { name: "No 3.", parentId: "2", id: "33" },
          { name: "No 4.", parentId: "2", id: "34" },
          { name: "No 5.", parentId: "2", id: "35" },
          { name: "No 6.", parentId: "2", id: "36" },
        ],
      },
    ],
  },
  {
    name: "Shifts",
    id: "8",
    subItems: [
      {
        name: "Feuillard Shift exercises",
        parentId: "8",
        id: "4",
        subItems: [{ name: "Feuillard No. 1", parentId: "4", id: "20" }],
      },
    ],
  },
  {
    name: "Pieces",
    id: "78",
    subItems: [
      { name: "Bach Suite No. 3", parentId: "78", id: "100" },
      { name: "Haydn 2. movement", parentId: "78", id: "1003" },
    ],
  },
];

export type AppState = {
  plans: PlanType[];
  exercises: ExerciseType[];
  practiceSession?: PracticeSessionType;
};

export const AppStateContext = createContext<
  AppState & { dispatch: React.Dispatch<ActionType> }
>({
  plans: plansTestData,
  exercises: exercisesTestData,
  dispatch: (v: ActionType) => {},
});

type Props = { children: JSX.Element };

function AppStateContextProvider(props: Props) {
  const [state, dispatch] = useReducer<
    (prev: AppState, action: ActionType) => AppState
  >(
    (prev, action) => {
      return Reducers[action.type](prev, action.payload as any); // Typescript problems...
    },
    {
      plans: useFetch(null, null) ?? plansTestData, // TODO fetch plans
      exercises: useFetch(null, null) ?? exercisesTestData, // TODO fetch exercises
    }
  );
  return (
    <AppStateContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {props.children}
    </AppStateContext.Provider>
  );
}

export default AppStateContextProvider;
