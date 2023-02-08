import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AppStateContext } from "../infra/AppStateContext";
import { PlanItemType, setPlanItems } from "../infra/PlanAPI";
import { usePlanById } from "../infra/StateHooks";
import AddExerciseList from "./AddExerciseList";

import styles from "./PracticePlan.module.css";
import PracticePlanItem from "./PracticePlanItem";

type Props = {
  planId: string;
};

const reorder = (
  list: PlanItemType[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function PracticePlan(props: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const plan = usePlanById(props.planId);
  const { dispatch } = useContext(AppStateContext);

  if (!plan) {
    return <p>Plan not found.</p>; // TODO Proper error handling
  }

  function addItemToPlan(item: PlanItemType) {
    if (plan)
      setPlanItems(plan.id, plan.items.concat(item)).then((response) => {
        if (response.success) {
          dispatch({
            type: "setPlanItems",
            payload: {
              planId: plan.id,
              items: plan.items.concat(item),
            },
          });
        }
      });
  }

  function removeItemFromPlan(itemId: string) {
    if (plan)
      setPlanItems(
        plan.id,
        plan.items.filter((i) => i.exerciseId !== itemId)
      ).then((response) => {
        if (response.success) {
          dispatch({
            type: "setPlanItems",
            payload: {
              planId: plan.id,
              items: plan.items.filter((i) => i.exerciseId !== itemId),
            },
          });
        }
      });
  }

  return (
    <div>
      <header className={styles.planHeader}>
        <h1 className={styles.planTitle}>{plan.name}</h1>
        <button className={styles.editPlanNameButton}>
          <FontAwesomeIcon icon={solid("pen")} fixedWidth size="lg" />
        </button>
      </header>
      <div className={styles.planItemsDiv}>
        <div className={styles.planItemsHeader}>
          <h2>Plan</h2>
          <button
            className={styles.editPlanButton}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <span>
                <FontAwesomeIcon icon={solid("check")} /> Done
              </span>
            ) : (
              <span>
                <FontAwesomeIcon icon={solid("pen")} /> Edit
              </span>
            )}
          </button>
        </div>
        <DragDropContext
          onDragEnd={(result) => {
            const { destination, source } = result;

            if (!destination) {
              return;
            }

            if (
              destination.droppableId === source.droppableId &&
              destination.index === source.index
            ) {
              return;
            }

            const items = reorder(plan.items, source.index, destination.index);

            dispatch({
              type: "setPlanItems",
              payload: {
                planId: plan.id,
                items,
              },
            });

            // TODO Call API
          }}
        >
          <Droppable droppableId={props.planId}>
            {(droppableProvided, snapshot) => (
              <ul
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={styles.planItemsList}
              >
                {plan.items.map((item, index) => {
                  return (
                    <PracticePlanItem
                      index={index}
                      planItem={item}
                      removeItemFromPlan={removeItemFromPlan}
                      showAddForm={showAddForm}
                      key={item.exerciseId}
                    ></PracticePlanItem>
                  );
                })}
                {
                  droppableProvided.placeholder /* needed to increase space while dragging */
                }
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {showAddForm && (
          <AddExerciseList
            inPlan={plan.items}
            addToPracticePlan={addItemToPlan}
          />
        )}
      </div>
    </div>
  );
}

export default PracticePlan;
