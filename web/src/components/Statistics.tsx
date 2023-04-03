import { useMemo } from "react";
import { useStatistics } from "../infra/StateHooks";

export function Statistics() {
  const statistics = useStatistics();

  const todaysPracticeTime = useMemo(() => {
    const today = new Date();
    return (
      statistics.sessionIdsByDate[Number(today).toString()]?.reduce(
        (acc, sessionId) => {
          const session = statistics.practiceSessions.find(
            (session) => session.id === sessionId
          );
          return acc + ((session?.end ?? 0) - (session?.start ?? 0));
        },
        0
      ) ?? 0
    );
  }, [statistics]);

  const totalPracticeTime = useMemo(() => {
    return statistics.practiceSessions.reduce(
      (acc, session) => acc + (session.end - session.start),
      0
    );
  }, [statistics]);

  return (
    <div>
      <p>Total practice time: {totalPracticeTime}</p>
      <p>Today's practice time: {todaysPracticeTime}</p>
    </div>
  );
}
