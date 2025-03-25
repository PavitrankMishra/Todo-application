import Header from "./Components/Header";
import styles from "./App.module.css";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const addTask = (task, type, priority) => {
    if (!task || !type || !priority) return;
    const newTask = { task, type, priority };
    setTask([...task, newTask]);
  };
  return (
    <>
      <div className={styles.appContainer}>
        <Header />
        <TaskInput addTask={addTask} />
        <TaskList task={task} />
      </div>
    </>
  );
}

export default App;
