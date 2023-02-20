import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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
  editingItem: boolean | undefined;
  setEditingItem: (state: boolean) => any;
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
  const editingItem = props.editingItem;
  const setEditingItem = props.setEditingItem;
  const item = useExerciseById(props.planItem.exerciseId);
  const [amount, setAmount] = useState(props.planItem.amount);
  const [duration, setDuration] = useState(props.planItem.duration);

  function handleChangeDuration(newDuration: number) {
    if (Number.isNaN(newDuration)) {
      return;
    }

    // const oldDuration = duration;

    if (newDuration === 0) {
      setDuration(undefined);
    } else setDuration(newDuration);

    // TODO Call API and roll back if necessary
  }

  function handleChangeAmount(newAmount: number) {
    if (Number.isNaN(newAmount)) {
      return;
    }

    // const oldAmount = amount;

    if (newAmount === 0) {
      setAmount(undefined);
    } else setAmount(newAmount);

    // TODO Call API and roll back if necessary
  }

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
            <div className={styles.itemInfos}>
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
                {duration !== undefined && duration !== 0 && !editingItem && (
                  <span className={styles.itemDuration}>
                    <FontAwesomeIcon icon={solid("clock")} />
                    {duration}min
                  </span>
                )}
                <span className={styles.itemName}>{item.name}</span>
                {amount !== undefined && !editingItem && (
                  <span className={styles.itemAmount}>{amount} random</span>
                )}
              </div>
              {props.showAddForm && (
                <button
                  className={
                    editingItem
                      ? styles.finishEditPlanItem
                      : styles.editPlanItem
                  }
                  onClick={() => setEditingItem(!editingItem)}
                >
                  {editingItem ? (
                    <FontAwesomeIcon icon={solid("check")} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={solid("pen")} size="lg" />
                  )}
                </button>
              )}

              <div
                {...draggableProvided.dragHandleProps}
                className={styles.movePlanItem}
              >
                {props.showAddForm && (
                  <FontAwesomeIcon icon={solid("grip-lines")} />
                )}
              </div>
            </div>
            {editingItem && props.showAddForm && (
              <form
                className={styles.itemEditDetails}
                onSubmit={(e) => {
                  e.preventDefault();
                  setEditingItem(false);
                }}
              >
                {item.subItems !== undefined && (
                  <>
                    <label
                      htmlFor={props.planItem.exerciseId.concat("editAmount")}
                      className={styles.editAmountLabel}
                    >
                      <FontAwesomeIcon icon={solid("cubes")} />
                      Amount
                    </label>
                    <input
                      type="number"
                      inputMode="decimal"
                      name={props.planItem.exerciseId.concat("editAmount")}
                      id={props.planItem.exerciseId.concat("editAmount")}
                      className={styles.editAmountInput}
                      defaultValue={amount}
                      onChange={(e) =>
                        handleChangeAmount(parseInt(e.target.value))
                      }
                      onBlur={(e) =>
                        handleChangeAmount(parseInt(e.target.value))
                      }
                    />
                    <span className={styles.amountUnit}>ex./movts</span>
                  </>
                )}
                <label
                  className={styles.editTimerLabel}
                  htmlFor={props.planItem.exerciseId.concat("editTimer")}
                >
                  <FontAwesomeIcon icon={solid("clock")} />
                  Timer
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  name={props.planItem.exerciseId.concat("editTimer")}
                  id={props.planItem.exerciseId.concat("editTimer")}
                  className={styles.editTimerInput}
                  defaultValue={duration}
                  onChange={(e) =>
                    handleChangeDuration(parseInt(e.target.value))
                  }
                  onBlur={(e) => handleChangeDuration(parseInt(e.target.value))}
                />
                <span className={styles.timerUnit}>min</span>
                <input type="submit" className="hidden" />
              </form>
            )}
          </li>
        );
      }}
    </Draggable>
  );
}

export default PracticePlanItem;
