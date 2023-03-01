import { useParams } from "react-router-dom";
import Practice from "../components/Practice";
import { usePlanById } from "../infra/StateHooks";

import styles from "./PracticePage.module.css";

function PracticePage() {
  return (
    <div>
      <Practice></Practice>
    </div>
  );
}

export default PracticePage;
