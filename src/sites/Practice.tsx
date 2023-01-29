import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Clock from "../components/Clock";
import { PlanType } from "./Plan";

function Practice() {
  const params = useParams();

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
  }); // TODO maybe useLoader, because doesnt need to change?

  const [currentItem, setCurrentItem] = useState(0);

  function pauseExercise(time: number, resume: () => void) {}

  function pausePractice(time: number, resume: () => void) {}

  if (plan.items[currentItem]) {
    return (
      <div>
        <h1>{plan.name}</h1>
        <div>
          <p className="currentExercise">
            Current Exercise: {plan.items[currentItem].name}
          </p>
          <p className="exerciseCategory">
            Category: {plan.items[currentItem].category}
          </p>
        </div>
        {plan.items[currentItem].img && (
          <img src={plan.items[currentItem].img}></img>
        )}
        <div className="exerciseClock">
          <Clock callbackOnPause={pauseExercise} />
        </div>
        <div className="totalTimeClock">
          <Clock callbackOnPause={pausePractice} start={3600} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Congratulations, you finished your program!</p>
    </div>
  );
}

export default Practice;
