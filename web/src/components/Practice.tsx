import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AppStateContext } from "../infra/AppStateContext";
import {
  setPracticeSession,
  startPracticeSession,
} from "../infra/PracticeSessionAPI";
import {
  useExerciseById,
  usePlanById,
  usePracticeSession,
} from "../infra/StateHooks";
import Clock from "./Clock";

import styles from "./Practice.module.css";

type Props = {};

function Practice(props: Props) {
  const { dispatch } = useContext(AppStateContext);
  const session = usePracticeSession();
  const plan = usePlanById(session?.currentPlanId);
  const exercise = useExerciseById(session?.currentExerciseId);

  function currentlyPracticing() {
    if (!session) {
      return null;
    }
    if (plan) {
      return (
        <div className={styles.currentlyPracticing}>
          <span className={styles.currentPlan}>Practicing: {plan.name}</span>
          <div className={styles.breadcrumbsBox}>
            {plan.items.map((_, index) => {
              return (
                <span
                  className={`${styles.breadcrumb} ${
                    index < (session?.currentIndexInPlan ?? 0)
                      ? styles.breadcrumbDone
                      : index === (session?.currentIndexInPlan ?? 0)
                      ? styles.breadcrumbCurrent
                      : styles.breadcrumbTodo
                  }`}
                  key={index}
                />
              );
            })}
          </div>
          {/*<Clock className={styles.clock} />
          <p className={styles.timeLabel}>total time</p>*/}
          <h1 className={styles.currentExercise}>{exercise?.name}</h1>
        </div>
      );
    } else
      return (
        <div className={styles.currentlyPracticing}>
          {
            //TODO make buttons work
          }
          <button
            onClick={() => {
              setPracticeSession({
                ...session,
                currentPlanId: "1",
                startedCurrentPlan: Date.now(),
                currentIndexInPlan: 0,
                currentExerciseId: "20",
                startedCurrentExercise: Date.now(),
              }).then(() =>
                dispatch({
                  type: "setPracticeSession",
                  payload: {
                    ...session,
                    currentPlanId: "1",
                    startedCurrentPlan: Date.now(),
                    currentIndexInPlan: 0,
                    currentExerciseId: "20",
                    startedCurrentExercise: Date.now(),
                  },
                })
              );
            }}
          >
            Choose practice plan
          </button>
          <button>Choose exercise/piece</button>
        </div>
      );
  }

  if (session) {
    return (
      <div className={styles.practiceSessionBox}>
        {currentlyPracticing()}
        <div className={styles.activeTools}></div>
        <div className={styles.toolsBox}>
          <button className={styles.tool}>
            <FontAwesomeIcon icon={solid("music")} />{" "}
            {/* TODO better icon for pedal note */}
          </button>
          <button className={styles.tool}>
            <FontAwesomeIcon icon={solid("radio")} /> {/* TODO tuner icon */}
          </button>
          <button className={styles.tool}>
            <FontAwesomeIcon icon={solid("bell")} />
          </button>
          <button className={styles.tool}>
            <FontAwesomeIcon icon={solid("microphone")} />
          </button>
        </div>
        <div className={styles.rating}>
          <p>Rate your progress</p>
          <button className={styles.ratingBtn}>
            <FontAwesomeIcon icon={regular("face-frown")} size="2x" />
          </button>
          <button className={styles.ratingBtn}>
            <FontAwesomeIcon icon={regular("face-frown-open")} size="2x" />
          </button>
          <button className={styles.ratingBtn}>
            <FontAwesomeIcon icon={regular("face-meh")} size="2x" />
          </button>
          <button className={styles.ratingBtn}>
            <FontAwesomeIcon icon={regular("face-smile")} size="2x" />
          </button>
          <button className={styles.ratingBtn}>
            <FontAwesomeIcon icon={regular("face-laugh")} size="2x" />
          </button>
        </div>
        <button>Next</button>
      </div>
    );
  } else
    return (
      <div className={styles.practiceSessionBox}>
        <p>No practice session started.</p>

        <button
          onClick={() => {
            startPracticeSession().then(() =>
              dispatch({
                type: "startPracticeSession",
                payload: {},
              })
            );
          }}
        >
          Start Session
        </button>
      </div>
    );
}

export default Practice;
