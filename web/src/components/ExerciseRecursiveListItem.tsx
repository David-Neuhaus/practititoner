import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { PlanItemType } from "../infra/PlanAPI";
import { ExerciseType } from "../infra/LibraryAPI";

import styles from "./ExerciseList.module.css";
import AddRemoveButton from "./AddRemoveButton";

type Props = {
  item: ExerciseType;
  addToPracticePlan?: (ex: PlanItemType) => any;
  inPlan?: PlanItemType[];
  className?: string;
};

function ExerciseRecursiveListItem(props: Props) {
  const [showItems, setShowItems] = useState(false);

  return (
    <li
      className={
        props.inPlan &&
        `${
          props.inPlan.some((e) => e.exerciseId === props.item.id)
            ? `${styles.alreadyAdded}`
            : ""
        }`
      }
      key={"Add" + props.item.id}
    >
      <div className={styles.listItemTitleBox}>
        {props.addToPracticePlan && (
          <AddRemoveButton
            type="add"
            callbackFn={() =>
              props.addToPracticePlan &&
              props.addToPracticePlan({
                exerciseId: props.item.id,
                // TODO maybe possible to already add times/how many of a category etc?
              })
            }
            className={styles.addButton}
          />
        )}

        {props.item.subItems ? (
          <>
            <label className={styles.exerciseName} htmlFor={props.item.name}>
              {props.item.name}
            </label>
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
          </>
        ) : (
          <span className={`${styles.exerciseName} ${styles.noPointer}`}>
            {props.item.name}
          </span>
        )}
      </div>
      {props.item.subItems !== undefined && showItems && (
        <ul className={styles.subList}>
          {props.item.subItems.map((ex) => {
            return (
              <ExerciseRecursiveListItem
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

export default ExerciseRecursiveListItem;
