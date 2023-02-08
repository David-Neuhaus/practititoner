import React, { FormEvent, useContext, useState } from "react";
import PracticePlanList from "../components/PracticePlanList";
import { AppStateContext } from "../infra/AppStateContext";
import { addPlan } from "../infra/PlanAPI";

type Props = {};

function Home(props: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addPlanTitle, setAddPlanTitle] = useState("");
  const { plans, dispatch } = useContext(AppStateContext);

  function handleAdd(event: FormEvent) {
    addPlan({
      name: addPlanTitle,
      items: [],
    }).then((response) => {
      if (response.success && response.id !== undefined)
        dispatch({
          type: "addPlan",
          payload: {
            plan: {
              id: response.id,
              name: addPlanTitle,
              items: [],
            },
          },
        });
    });
    event.preventDefault();
  }

  return (
    <div className="page">
      <h1>PracTITIoner</h1>
      <h2>Your practice plans</h2>
      <PracticePlanList plans={plans} />
      <button onClick={() => setShowAddForm(true)}>Create plan</button>
      {showAddForm && (
        <form className="addPlanForm" onSubmit={handleAdd}>
          <input
            type="text"
            name="title"
            id="addPlanTitle"
            onChange={(e) => setAddPlanTitle(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}

export default Home;
