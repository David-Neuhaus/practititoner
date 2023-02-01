import React, { useState } from "react";
import { Exercise } from "../sites/Plan";
import AddRemoveButton from "./AddRemoveButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./AddExerciseList.module.css";
import AddExerciseRecursiveListItem from "./AddExerciseRecursiveListItem";

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
  const [exerciseTree, setExercises] = useState([
    {
      name: "Double stops",
      category: "Double stops",
      isCategory: true,
      id: "3",
      subItems: [
        { name: "No 2.", category: "Double stops", id: "42" },
        { name: "No 1.", category: "Double stops", id: "41" },
        { name: "No 3.", category: "Double stops", id: "43" },
        { name: "No 4.", category: "Double stops", id: "44" },
        { name: "No 5.", category: "Double stops", id: "45" },
        { name: "No 6.", category: "Double stops", id: "46" },
      ],
    },
    {
      name: "Legato",
      category: "Legato",
      isCategory: true,
      id: "7",
      subItems: [
        {
          name: "Übung 2",
          category: "Legato",
          id: "5",
        },
        {
          name: "Sevcik",
          category: "Legato",
          id: "2",
          amount: 3,
          subItems: [
            { name: "No 1.", category: "Legato", id: "31" },
            { name: "No 2.", category: "Legato", id: "32" },
            { name: "No 3.", category: "Legato", id: "33" },
            { name: "No 4.", category: "Legato", id: "34" },
            { name: "No 5.", category: "Legato", id: "35" },
            { name: "No 6.", category: "Legato", id: "36" },
          ],
        },
      ],
    },
    {
      name: "Shifts",
      category: "Shifts",
      isCategory: true,
      id: "8",
      subItems: [
        {
          name: "Feuillard Shift exercises",
          category: "Shifts",
          id: "4",
          subItems: [{ name: "Feuillard No. 1", category: "Shifts", id: "20" }],
        },
      ],
    },
  ]);

  const [showItems, setShowItems] = useState<string[]>([]);

  const sortedExercises = sortByCategories(exerciseTree);

  function handleSubItems(id: string) {
    if (showItems.includes(id)) {
      setShowItems(showItems.filter((i) => i !== id));
      return;
    }
    setShowItems(showItems.concat(id));
  }

  return (
    <div className={styles.addExerciseDiv}>
      <h2>Your Exercises</h2>
      <button>
        <FontAwesomeIcon icon={solid("plus")} /> Add new exercise
      </button>
      <ul className={styles.exerciseList}>
        {exerciseTree
          .filter((e) => e.isCategory)
          .map((category) => {
            return (
              <AddExerciseRecursiveListItem
                {...props}
                item={category}
                key={category.id}
              />
            );
          })}
      </ul>

      {/*<ul className={styles.exerciseList}>
        {exercises
          .filter((e) => e.isCategory)
          .map((category) => {
            return (
              <li
                className={`${
                  props.inPlan.some((e) => e.id === category.id)
                    ? styles.alreadyAdded
                    : ""
                }`}
                key={"Add" + category.id}
              >
                <AddRemoveButton
                  type="add"
                  callbackFn={() => props.addToPracticePlan(category)}
                  className={styles.addButton}
                />
                <span className={styles.categoryName}>{category.name}</span>
                <button
                  onClick={() => handleSubItems(category.id)}
                  className={styles.subItems}
                >
                  {showItems.includes(category.id) ? (
                    <FontAwesomeIcon icon={solid("chevron-up")} />
                  ) : (
                    <FontAwesomeIcon icon={solid("chevron-down")} />
                  )}
                </button>
                {showItems.includes(category.id) && (
                  <ul className={styles.subList}>
                    {sortedExercises[category.name].map((exercise) => {
                      return (
                        <li
                          className={`${
                            props.inPlan.includes(exercise)
                              ? styles.alreadyAdded
                              : ""
                          }`}
                          key={"Add" + exercise.id}
                        >
                          <AddRemoveButton
                            type="add"
                            callbackFn={() => props.addToPracticePlan(exercise)}
                            className={`${styles.addButton} ${styles.innerAddButton}`}
                          />
                          <span className={styles.exerciseName}>
                            {exercise.name}
                          </span>
                          {exercise.subItems !== undefined && (
                            <button
                              onClick={() => handleSubItems(exercise.id)}
                              className={styles.subItems}
                            >
                              {`${exercise.subItems.length} item${
                                exercise.subItems.length && "s"
                              }`}
                              {showItems.includes(exercise.id) ? (
                                <FontAwesomeIcon icon={solid("chevron-up")} />
                              ) : (
                                <FontAwesomeIcon icon={solid("chevron-down")} />
                              )}
                            </button>
                          )}
                          {showItems.includes(exercise.id) &&
                            exercise.subItems !== undefined && (
                              <AddExerciseSubList
                                {...props}
                                items={exercise.subItems}
                              />
                            )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>*/}
    </div>
  );
}

export default AddExerciseList;
