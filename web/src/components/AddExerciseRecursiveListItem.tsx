import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ExerciseType, PlanItemType } from "../infra/PlanAPI";

import styles from "./AddExerciseList.module.css";
import AddRemoveButton from "./AddRemoveButton";

type Props = {
  item: ExerciseType;
  addToPracticePlan: (ex: PlanItemType) => any;
  inPlan: PlanItemType[];
  className?: string;
};

function AddExerciseRecursiveListItem(props: Props) {
  const [showItems, setShowItems] = useState(false);

  return (
    <li
      className={`${
        props.inPlan.some((e) => e.exerciseId === props.item.id)
          ? `${styles.alreadyAdded}`
          : ""
      }`}
      key={"Add" + props.item.id}
    >
      <div className={styles.listItemTitleBox}>
        <AddRemoveButton
          type="add"
          callbackFn={() =>
            props.addToPracticePlan({
              exerciseId: props.item.id,
              // TODO maybe possible to already add times/how many of a category etc?
            })
          }
          className={styles.addButton}
        />
        <label className={styles.exerciseName} htmlFor={props.item.name}>
          {props.item.name}
        </label>
        {props.item.subItems !== undefined && (
          <button
            onClick={() => setShowItems(!showItems)}
            className={styles.subItems}
            id={props.item.name}
          >
            {`${props.item.subItems.length} item${
              props.item.subItems.length > 1 ? "s" : ""
            }`}
            {showItems ? (
              <FontAwesomeIcon icon={solid("chevron-up")} />
            ) : (
              <FontAwesomeIcon icon={solid("chevron-down")} />
            )}
          </button>
        )}
      </div>
      {props.item.subItems !== undefined && showItems && (
        <ul className={styles.subList}>
          {props.item.subItems.map((ex) => {
            return (
              <AddExerciseRecursiveListItem
                addToPracticePlan={props.addToPracticePlan}
                inPlan={props.inPlan}
                item={ex}
                key={ex.id}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default AddExerciseRecursiveListItem;
