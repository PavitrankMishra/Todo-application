import React, { useState } from "react";
import styles from "./TaskInput.module.css";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");

  return (
    <div className={styles.taskInputContainer}>
      <input
        type="text"
        className={styles.inputContainer}
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select
        className={styles.dropdown}
        onChange={(e) => setType(e.target.value)}
        value={type}
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value="indoor">Indoor</option>
        <option value="outdoor">Outdoor</option>
      </select>
      <select
        className={styles.dropdown}
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
      >
        <option value="" disabled>
          Select Priority
        </option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        className={styles.addTask}
        onClick={() => console.log({ task, type, priority })}
      >
        Add task
      </button>
    </div>
  );
};

export default TaskInput;
