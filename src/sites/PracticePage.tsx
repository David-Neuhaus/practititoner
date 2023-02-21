import { useParams } from "react-router-dom";
import Practice from "../components/Practice";
import { usePlanById } from "../infra/StateHooks";

import styles from "./PracticePage.module.css";

function PracticePage() {
  const params = useParams();
  const plan = usePlanById(params.planId ?? ""); // TODO maybe useLoader, because doesnt need to change?

  if (!plan) return <p> Error fetching plan {params.planId}</p>; // TODO proper Error handling

  return (
    <div>
      <h1>Practice Session</h1>
      <Practice></Practice>;
    </div>
  );
}

export default PracticePage;
