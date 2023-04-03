import { FormEvent, useMemo, useRef, useState } from "react";
import { PlanItemType } from "../infra/PlanAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./ExerciseList.module.css";
import ExerciseRecursiveListItem from "./ExerciseRecursiveListItem";
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

  const exerciseFlatList = useMemo<(ExerciseType & { level: number })[]>(() => {
    function recursive(level: number, items?: ExerciseType[]) {
      if (items === undefined) return [];
      let output: (ExerciseType & { level: number })[] = [] as any;
      for (const ex of items) {
        output.push({ ...ex, level });
        output = output.concat(recursive(level + 1, ex.subItems));
      }
      return output;
    }
    return recursive(1, exercises);
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
        // TODO should decide between category or movement/subexercise with a radio button
        <form onSubmit={handleAddForm}>
          <label htmlFor="exerciseNameInput"></label>
          <input id="exerciseNameInput" ref={nameRef} type="text"></input>
          <fieldset>
            <input
              type="radio"
              id="piece"
              name="parentType"
              checked={!addToSub}
              onChange={() => setAddToSub(false)}
            ></input>
            <label htmlFor="piece">Piece or exercise</label>
            <input
              type="radio"
              id="subExRadio"
              name="parentType"
              onChange={() => setAddToSub(true)}
            ></input>
            <label htmlFor="subExRadio">Movement or subexercise</label>
          </fieldset>

          <select id="exerciseParent" ref={parentRef}>
            {addToSub
              ? exerciseFlatList.map((ex) => (
                  <option value={ex.id} key={ex.id}>
                    {`${new Array(ex.level).join("> ")}${ex.name}`}
                  </option>
                ))
              : exercises.map((ex) => (
                  <option value={ex.id} key={ex.id}>
                    {ex.name}
                  </option>
                ))}
          </select>
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
