import React, { useContext } from "react";
import { PlanItemType } from "../infra/PlanAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./AddExerciseList.module.css";
import AddExerciseRecursiveListItem from "./AddExerciseRecursiveListItem";
import { AppStateContext } from "../infra/AppStateContext";

type Props = {
  addToPracticePlan: (item: PlanItemType) => void;
  inPlan: PlanItemType[];
};

function AddExerciseList(props: Props) {
  const { exercises } = useContext(AppStateContext);

  return (
    <div className={styles.addExerciseDiv}>
      <h2>Your Exercises</h2>
      <button>
        <FontAwesomeIcon icon={solid("plus")} /> Add new exercise
      </button>
      <ul className={styles.exerciseList}>
        {exercises.map((category) => {
          return (
            <AddExerciseRecursiveListItem
              {...props}
              item={category}
              key={category.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default AddExerciseList;
