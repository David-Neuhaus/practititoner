import { useParams } from "react-router-dom";
import { usePlanById } from "../infra/StateHooks";

function Practice() {
  const params = useParams();

  const plan = usePlanById(params.planId ?? ""); // TODO maybe useLoader, because doesnt need to change?

  if (!plan) return <p> Error fetching plan {params.planId}</p>; // TODO proper Error handling
  /*  if (plan.items[currentItem]) {

    const exercise = useExerciseById(plan.items[currentItem].exerciseId);
    return (
      <div>
        <h1>{plan.name}</h1>
        <div>
          <p className="currentExercise">
            Current Exercise: {exercise?.name ?? ""}
          </p>
          <p className="exerciseCategory">
            <PracticePlanItemCategory id={exercise?.id}/>
          </p>
        </div>
        {exercise?.img && <img src={exercise.img}></img>}
        <div className="exerciseClock">
          <Clock callbackOnPause={pauseExercise} />
        </div>
        <div className="totalTimeClock">
          <Clock callbackOnPause={pausePractice} start={3600} />
        </div>
      </div>
    );
    // TODO
  }
*/
  return (
    <div>
      <p>Congratulations, you finished your practice plan!</p>
    </div>
  );
}

export default Practice;
