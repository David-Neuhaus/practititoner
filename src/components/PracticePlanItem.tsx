import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import { PlanItemType } from "../infra/PlanAPI";
import { useExerciseById } from "../infra/StateHooks";
import AddRemoveButton from "./AddRemoveButton";

import styles from "./PracticePlan.module.css";

type Props = {
  planItem: PlanItemType;
  index: number;
  removeItemFromPlan: (itemId: string) => any;
  showAddForm: boolean;
};

type CategoryProps = {
  id: string;
};

function CategoryFullPath(props: CategoryProps) {
  const category = useExerciseById(props.id);
  if (category?.parentId)
    return (
      <>
        <CategoryFullPath id={category.parentId} /> {" > "}
        {category?.name}
      </>
    );
  else return <>{category?.name}</>;
}

export function PracticePlanItemCategory(props: CategoryProps) {
  return (
    <span className={styles.itemCategory}>
      <CategoryFullPath {...props} />
    </span>
  );
}

function PracticePlanItem(props: Props) {
  const item = useExerciseById(props.planItem.exerciseId);

  if (!item) {
    return (
      <li>
        <span className={styles.itemName}>Exercise not found.</span>
      </li>
    );
  }

  return (
    <Draggable draggableId={props.planItem.exerciseId} index={props.index}>
      {(draggableProvided) => {
        return (
          <li
            {...draggableProvided.draggableProps}
            className={styles.planItem}
            ref={draggableProvided.innerRef}
          >
            {props.showAddForm && (
              <AddRemoveButton
                type="remove"
                className={styles.removePlanItem}
                callbackFn={() => props.removeItemFromPlan(item.id)}
              />
            )}
            <div className={styles.planItemInnerBox}>
              {item.parentId ? (
                <PracticePlanItemCategory id={item.parentId} />
              ) : (
                <span className={styles.itemCategory}></span>
              )}
              {props.planItem.duration !== undefined && (
                <span className={styles.itemDuration}>
                  <FontAwesomeIcon icon={solid("clock")} />
                  {props.planItem.duration}min
                </span>
              )}
              <span className={styles.itemName}>{item.name}</span>
              {props.planItem.amount !== undefined && (
                <span className={styles.itemAmount}>
                  {props.planItem.amount} random
                </span>
              )}
            </div>
            {props.showAddForm && (
              <button className={styles.editPlanItem}>
                <FontAwesomeIcon icon={solid("pen")} size="lg" />
              </button>
            )}

            <div {...draggableProvided.dragHandleProps}>
              {props.showAddForm && (
                <div className={styles.movePlanItem}>
                  <FontAwesomeIcon icon={solid("grip-lines")} />
                </div>
              )}
            </div>
          </li>
        );
      }}
    </Draggable>
  );
}

export default PracticePlanItem;
