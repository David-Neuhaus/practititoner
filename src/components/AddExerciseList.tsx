import React, { useState } from "react";
import { Exercise } from "../sites/Plan";
import AddRemoveButton from "./AddRemoveButton";

function sortByCategories(exercises: Exercise[]) {
  const sorted: {
    [id: string]: Exercise[];
  } = {};
  for (const e of exercises) {
    if (!e.isCategory) {
      sorted[e.category] =
        sorted[e.category] === undefined ? [e] : sorted[e.category].concat(e);
    }
  }

  return sorted;
}

type Props = {
  addToPracticePlan: (item: Exercise) => void;
  inPlan: Exercise[];
};

function AddExerciseList(props: Props) {
  const [exercises, setExercises] = useState([
    {
      name: "Übung 1",
      category: "Shifts",
      id: "4",
    },
    {
      name: "Übung 2",
      category: "Legato",
      id: "5",
    },
    {
      name: "Übung 3",
      category: "Double stops",
      id: "6",
    },
    {
      name: "Double stops",
      category: "Double stops",
      isCategory: true,
      id: "3",
    },
    {
      name: "Legato",
      category: "Legato",
      isCategory: true,
      id: "7",
    },
    {
      name: "Shifts",
      category: "Shifts",
      isCategory: true,
      id: "8",
    },
  ]);

  const sortedExercises = sortByCategories(exercises);

  return (
    <div className="addExerciseDiv">
      <ul>
        {exercises
          .filter((e) => e.isCategory)
          .map((category) => {
            return (
              <li
                className={`${
                  props.inPlan.some((e) => e.id === category.id)
                    ? "alreadyAdded"
                    : ""
                }`}
                key={"Add" + category.id}
              >
                {category.name}{" "}
                <AddRemoveButton
                  type="add"
                  withText={false}
                  callbackFn={() => props.addToPracticePlan(category)}
                />
                <ul>
                  {sortedExercises[category.name].map((exercise) => {
                    return (
                      <li
                        className={`${
                          props.inPlan.includes(exercise) ? "alreadyAdded" : ""
                        }`}
                        key={"Add" + exercise.id}
                      >
                        {exercise.name}{" "}
                        <AddRemoveButton
                          type="add"
                          withText={false}
                          callbackFn={() => props.addToPracticePlan(exercise)}
                        />
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default AddExerciseList;
