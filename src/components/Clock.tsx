import React, { useEffect, useState } from "react";

type Props = {
  start?: number; // in seconds
  callbackOnPause: (time: number, resume: () => void) => any;
};

function secondsToClockString(seconds: number) {
  const s = seconds % 60;
  const m = ((seconds - s) / 60) % 60;
  const h = (((seconds - s) / 60 - m) / 60) % 60;
  return `${h ? `${h.toString()}:` : ""}${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
}

function Clock(props: Props) {
  const [time, setTime] = useState(props.start ?? 0);

  function tickClock() {
    setTime((oldTime) => oldTime + 1);
  }

  useEffect(() => {
    const timerId = setInterval(() => tickClock(), 1000);

    return function cleanup() {
      clearInterval(timerId);
      console.log("hi");
    };
  }, []);
  return <div>{secondsToClockString(time)}</div>;
}

export default Clock;
