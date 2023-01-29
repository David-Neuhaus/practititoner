import React, { FormEvent, useState } from "react";
import PracticePlanList, { practicePlan } from "../components/PracticePlanList";

type Props = {};

function Home(props: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addPlanTitle, setAddPlanTitle] = useState("");
  const [practicePlans, setPracticePlans] = useState<practicePlan[]>([
    {
      id: "1",
      name: "jaci is cool",
      items: [""],
    },
  ]);

  function addPlan(event: FormEvent) {
    setPracticePlans(practicePlans.concat({ name: addPlanTitle, items: [""] }));
    event.preventDefault();
  }

  return (
    <div className="page">
      <h1>PracTITIoner</h1>
      <h2>Your practice plans</h2>
      <PracticePlanList plans={practicePlans} />
      <button onClick={() => setShowAddForm(true)}>Create plan</button>
      {showAddForm && (
        <form className="addPlanForm" onSubmit={addPlan}>
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
