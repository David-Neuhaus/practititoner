import React from "react";
import { Link } from "react-router-dom";

export type practicePlan = {
  id?: string;
  name: string;
  items: string[];
};

type Props = {
  plans: practicePlan[];
};

function PracticePlanList(props: Props) {
  return (
    <ul className="practicePlanList">
      {props.plans.map((p) => (
        <li>
          <Link to={`plans/${p.id}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PracticePlanList;
