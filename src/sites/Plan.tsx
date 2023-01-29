import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddExerciseList from "../components/AddExerciseList";
import AddRemoveButton from "../components/AddRemoveButton";

export type Exercise = {
  id: string;
  name: string;
  category: string;
  img?: string;
  isCategory?: boolean;
};

export type PlanType = {
  id?: string;
  name: string;
  items: Exercise[];
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
      { name: "Feuillard 1", category: "Shifts", id: "1" },
      { name: "Sevcik 20", category: "Legato", id: "2" },
      {
        name: "Double stops",
        category: "Double stops",
        isCategory: true,
        id: "3",
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
      <h1>{plan.name}</h1>

      <Link to="./play">Start</Link>

      <div className="planItemsDiv">
        <h2>Practice items</h2>
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Done" : "Add"}
        </button>
        <ul>
          {plan.items.map((item) => (
            <li key={item.id}>
              {item.name}
              {showAddForm && (
                <AddRemoveButton
                  type="remove"
                  callbackFn={() => removeItemFromPlan(item)}
                />
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
    </div>
  );
}

export default Plan;
