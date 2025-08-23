import { useId } from "react";

import classes from "./Spinner.module.css";

export function Spinner() {
  const id = useId();
  return (
    <span style={{ display: "inline-flex" }}>
      <svg
        height="32px"
        width="32px"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        aria-labelledby={id}
        className={classes.spinner}
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        ></circle>
        <path
          d="M15 8a7.002 7.002 0 00-7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        ></path>
      </svg>
      <span id={id} className="hidden">
        Loading
      </span>
    </span>
  );
}
