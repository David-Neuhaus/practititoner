import React from "react";
import { Link } from "react-router-dom";
import { PlanType } from "../infra/PlanAPI";

type Props = {
  plans: PlanType[];
};

function PracticePlanList(props: Props) {
  return (
    <ul className="practicePlanList">
      {props.plans.map((p) => (
        <li key={p.id}>
          <Link to={`plans/${p.id}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PracticePlanList;
