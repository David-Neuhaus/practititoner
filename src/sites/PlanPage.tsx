import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";

import Plan from "../components/Plan";

import styles from "./PlanPage.module.css";

type Params = {
  planId: string;
};

function PlanPage() {
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
      <Plan planId={params.planId} />
      <div className={styles.startLinkContainer}>
        <Link to="/practice" className={styles.startLink}>
          <div>
            <FontAwesomeIcon icon={solid("play")} />
            Practice
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlanPage;
