import { FormEvent, useContext, useMemo, useRef, useState } from "react";
import { PlanItemType } from "../infra/PlanAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./ExerciseList.module.css";
import ExerciseRecursiveListItem from "./ExerciseRecursiveListItem";
import { AppStateContext } from "../infra/AppStateContext";
import { addExercise, ExerciseType } from "../infra/LibraryAPI";
import { useAppState } from "../infra/StateHooks";

type Props = {
  addToPracticePlan?: (item: PlanItemType) => void;
  inPlan?: PlanItemType[];
};

function ExerciseList(props: Props) {
  const { exercises, dispatch } = useAppState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [addToSub, setAddToSub] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const parentRef = useRef<HTMLSelectElement>(null);

  const exerciseFlatList = useMemo<ExerciseType[]>(() => {
    function recursive(items?: ExerciseType[]): ExerciseType[] {
      if (items === undefined) return [];
      const output = [];
      for (const ex of items) {
        output.push(ex);
        output.concat(recursive(ex.subItems));
      }
      return output;
    }
    return recursive(exercises);
  }, [exercises]);

  function handleAddForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nameRef.current) {
      const name = nameRef.current.value;
      const parentId = parentRef.current?.value;
      addExercise({
        name,
        parentId: parentId,
      }).then((response) => {
        if (response.success && response.id) {
          dispatch({
            type: "addExercise",
            payload: {
              exercise: {
                name,
                id: response.id,
                parentId,
              },
            },
          });
        }
      });

      setAddToSub(false);
      setShowAddForm(false);
    }
  }
  return (
    <div className={styles.addExerciseDiv}>
      <h2>Your Exercises</h2>
      {!showAddForm && (
        <button onClick={() => setShowAddForm(true)}>
          <FontAwesomeIcon icon={solid("plus")} /> Add new exercise or piece
        </button>
      )}
      {showAddForm && (
        <form onSubmit={handleAddForm}>
          <label htmlFor="exerciseNameInput"></label>
          <input id="exerciseNameInput" ref={nameRef} type="text"></input>
          <label htmlFor="subExCheckbox">Movement or subexercise</label>
          <input
            type="checkbox"
            id="subExCheckbox"
            onChange={() => setAddToSub(true)}
          ></input>
          {addToSub && (
            <select id="exerciseParent" ref={parentRef}>
              {exerciseFlatList.map((ex) => (
                <option value={ex.id}>{ex.name}</option>
              ))}
            </select>
          )}
          <button type="submit">Add</button>
        </form>
      )}
      <ul className={styles.exerciseList}>
        {exercises.map((category) => {
          return (
            <ExerciseRecursiveListItem
              {...props}
              item={category}
              key={category.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ExerciseList;
