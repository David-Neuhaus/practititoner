import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AddExerciseList from "../components/AddExerciseList";
import AddRemoveButton from "../components/AddRemoveButton";

import styles from "./Plan.module.css";

export type Exercise = {
  id: string;
  name: string;
  category: string;
  img?: string;
  isCategory?: boolean;
  subItems?: Exercise[];
};

export type PlanType = {
  id?: string;
  name: string;
  items: (Exercise & { amount?: number; duration?: number })[];
};

type Params = {
  planId: string;
};

function Plan() {
  const params = useParams<Params>();
  const [plan, setPlan] = useState<PlanType>({
    id: params.planId,
    name: "My Practice Plan",
    items: [
      { name: "Feuillard No. 1", category: "Shifts", id: "20" },
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
      {
        name: "Double stops",
        category: "Double stops",
        isCategory: true,
        id: "3",
        duration: 20,
        amount: 1,
        subItems: [
          { name: "No 2.", category: "Double stops", id: "42" },
          { name: "No 1.", category: "Double stops", id: "41" },
          { name: "No 3.", category: "Double stops", id: "43" },
          { name: "No 4.", category: "Double stops", id: "44" },
          { name: "No 5.", category: "Double stops", id: "45" },
          { name: "No 6.", category: "Double stops", id: "46" },
        ],
      },
    ],
  });
  const [showAddForm, setShowAddForm] = useState(false);

  function addItemToPlan(item: Exercise) {
    setPlan({
      ...plan,
      items: plan.items.concat(item),
    });
  }

  function removeItemFromPlan(item: Exercise) {
    setPlan({
      ...plan,
      items: plan.items.filter((i) => i !== item),
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

        <ul className={styles.planItemsList}>
          {plan.items.map((item) => (
            <li key={item.id} className={styles.planItem}>
              {showAddForm && (
                <AddRemoveButton
                  type="remove"
                  className={styles.removePlanItem}
                  callbackFn={() => removeItemFromPlan(item)}
                />
              )}
              <div className={styles.planItemInnerBox}>
                <span className={styles.itemCategory}>
                  {item.isCategory ? "from category" : item.category}
                </span>
                {item.duration !== undefined && (
                  <span className={styles.itemDuration}>
                    <FontAwesomeIcon icon={solid("clock")} />
                    {item.duration}min
                  </span>
                )}
                <span className={styles.itemName}>{item.name}</span>
                {item.amount !== undefined && (
                  <span className={styles.itemAmount}>
                    {item.amount} random
                  </span>
                )}
              </div>
              {showAddForm && (
                <button className={styles.editPlanItem}>
                  <FontAwesomeIcon icon={solid("pen")} size="lg" />
                </button>
              )}
              {showAddForm && (
                <button className={styles.movePlanItem}>
                  <FontAwesomeIcon icon={solid("grip-lines")} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {showAddForm && (
          <AddExerciseList
            inPlan={plan.items}
            addToPracticePlan={addItemToPlan}
          />
        )}
      </div>
      <div className={styles.startLinkContainer}>
        <Link to="./play" className={styles.startLink}>
          <div>Start</div>
        </Link>
      </div>
    </div>
  );
}

export default Plan;
