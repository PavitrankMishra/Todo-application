import Header from "./Components/Header";
import styles from "./App.module.css";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (task, type, priority) => {
    if (!task || !type || !priority) return;
    const newTask = { task, type, priority };
    setTasks([...tasks, newTask]);
  };

  const handleDelete = (index) => {
    const updatedTask = tasks.filter((_,i) => i !== index);
    setTasks(updatedTask);
  };

  
  return (
    <>
      <div className={styles.appContainer}>
        <Header />
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} handleDelete = {handleDelete}/>
      </div>
    </>
  );
}

export default App;
