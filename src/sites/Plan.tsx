import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import PracticePlan from "../components/Plan";

import styles from "./Plan.module.css";

type Params = {
  planId: string;
};

function Plan() {
  const params = useParams<Params>();

  if (!params.planId) {
    return (
      <p>
        {/* TODO 404 Weiterleitung */}
        No Plan ID!
      </p>
    );
  }

  return (
    <div>
      <PracticePlan planId={params.planId} />
      <div className={styles.startLinkContainer}>
        <Link to="./play" className={styles.startLink}>
          <div>
            <FontAwesomeIcon icon={solid("play")} />
            Start
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Plan;
