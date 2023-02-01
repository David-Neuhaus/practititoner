import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Exercise } from "../sites/Plan";

import styles from "./AddExerciseList.module.css";
import AddRemoveButton from "./AddRemoveButton";

type Props = {
  item: Exercise;
  addToPracticePlan: (ex: Exercise) => any;
  inPlan: Exercise[];
  className?: string;
};

function AddExerciseRecursiveListItem(props: Props) {
  const [showItems, setShowItems] = useState(false);

  return (
    <li
      className={`${
        props.inPlan.some((e) => e.id === props.item.id)
          ? `${styles.alreadyAdded}`
          : ""
      }`}
      key={"Add" + props.item.id}
    >
      <div className={styles.listItemTitleBox}>
        <AddRemoveButton
          type="add"
          callbackFn={() => props.addToPracticePlan(props.item)}
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
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default AddExerciseRecursiveListItem;
