import React from "react";
import styles from "./NoTask.module.css";

const NoTask = () => {
  return <div className={styles.noTaskContainer}>
    <h1>No Current Task Found</h1>
    <span>Start By Adding a New Task</span>
  </div>;
};

export default NoTask;
