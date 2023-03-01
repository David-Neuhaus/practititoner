import React, { useEffect, useState } from "react";

import styles from "./Clock.module.css";

type Props = {
  start?: number; // as Date number
  callbackOnPause?: (time: number, resume: () => void) => any;
  className?: string;
};

function Clock(props: Props) {
  const [time, setTime] = useState(props.start ?? Date.now());

  function tickClock() {
    setTime((oldTime) => oldTime + 1);
  }

  useEffect(() => {
    const timerId = setInterval(() => tickClock(), 1000);

    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div className={`${styles.Clock} ${props.className}`}>
      {new Date(Date.now() - time)
        .toLocaleTimeString()
        .replace(/(^1:)/g, "") // TODO this should not happen?
        .replace(/( AM)|( PM)/g, "")}
    </div>
  );
}

export default Clock;
