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

function MetronomeIcon() {
  return (
    <svg
      fill="#000000"
      height="14px"
      width="14px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 213.605 213.605"
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M200.203,161.656L143.86,4.962C142.79,1.985,139.966,0,136.803,0h-60c-3.164,0-5.987,1.985-7.058,4.962L13.402,161.656
		c-0.292,0.814-0.442,1.672-0.442,2.538v41.912c0,4.142,3.358,7.5,7.5,7.5h172.686c4.142,0,7.5-3.358,7.5-7.5v-41.912
		C200.646,163.329,200.496,162.47,200.203,161.656z M82.076,15h49.453l50.949,141.694h-70.676v-4.861h7.5c2.761,0,5-2.239,5-5
		s-2.239-5-5-5h-7.5v-7.36h7.5c2.761,0,5-2.239,5-5s-2.239-5-5-5h-7.5v-7.36h7.5c2.761,0,5-2.239,5-5s-2.239-5-5-5h-7.5v-7.361h7.5
		c2.761,0,5-2.239,5-5s-2.239-5-5-5h-7.5V47.333c0-2.761-2.239-5-5-5s-5,2.239-5,5v42.418h-7.5c-2.761,0-5,2.239-5,5s2.239,5,5,5
		h7.5v7.361h-7.5c-2.761,0-5,2.239-5,5s2.239,5,5,5h7.5v7.36h-7.5c-2.761,0-5,2.239-5,5s2.239,5,5,5h7.5v7.36h-7.5
		c-2.761,0-5,2.239-5,5s2.239,5,5,5h7.5v4.861H31.127L82.076,15z M27.96,198.605v-26.912h157.686v26.912H27.96z"
        />
      </g>
    </svg>
  );
}

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
          {/* TODO think: Tuner needed? */}
          <button className={styles.tool}>
            <FontAwesomeIcon icon={solid("music")} />{" "}
            {/* TODO better icon for pedal note */}
          </button>
          <button className={styles.tool}>
            <MetronomeIcon />
            {/* TODO better icon for metronome */}
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
