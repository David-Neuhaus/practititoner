import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

type Props = {
  type: "add" | "remove";
  withText?: boolean;
  callbackFn: () => any;
};

function AddRemoveButton(props: Props) {
  if (props.type === "add") {
    if (props.withText) {
      return (
        <button className="addButton" onClick={props.callbackFn}>
          <FontAwesomeIcon icon={solid("plus")} /> Add
        </button>
      );
    }

    return (
      <button className="addButton" onClick={props.callbackFn}>
        <FontAwesomeIcon icon={solid("plus")} />
      </button>
    );
  } else {
    if (props.withText) {
      return (
        <button className="removeButton" onClick={props.callbackFn}>
          <FontAwesomeIcon icon={solid("minus")} /> Remove
        </button>
      );
    }

    return (
      <button className="removeButton" onClick={props.callbackFn}>
        <FontAwesomeIcon icon={solid("minus")} />
      </button>
    );
  }
}

export default AddRemoveButton;
