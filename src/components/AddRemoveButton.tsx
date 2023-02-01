import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import styles from "./AddRemoveButton.module.css";

type Props = {
  type: "add" | "remove";
  withText?: boolean;
  callbackFn: () => any;
  className?: string;
};

function AddRemoveButton(props: Props) {
  if (props.type === "add") {
    if (props.withText) {
      return (
        <button
          className={`${styles.addButtonWithText} ${props.className}`}
          onClick={props.callbackFn}
        >
          <FontAwesomeIcon icon={solid("plus")} /> Add
        </button>
      );
    }

    return (
      <button
        className={`${styles.addButton} ${props.className}`}
        onClick={props.callbackFn}
      >
        <FontAwesomeIcon icon={solid("plus")} />
      </button>
    );
  } else {
    if (props.withText) {
      return (
        <button
          className={`${styles.removeButtonwithText} ${props.className}`}
          onClick={props.callbackFn}
        >
          <FontAwesomeIcon icon={solid("minus")} /> Remove
        </button>
      );
    }

    return (
      <button
        className={`${styles.removeButton} ${props.className}`}
        onClick={props.callbackFn}
      >
        <FontAwesomeIcon icon={solid("minus")} />
      </button>
    );
  }
}

export default AddRemoveButton;
