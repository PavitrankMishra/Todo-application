import Header from "./Components/Header";
import styles from "./App.module.css";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (task, type, priority) => {
    if (!task || !type || !priority) return;
    const newTask = { task, type, priority };
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      const updatedTasks = tasks.filter((_, i) => i !== index);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setDeletingIndex(null);
    }, 500);
  };
  return (
    <>
      <div className={styles.appContainer}>
        <Header />
        <TaskInput addTask={addTask} />
        <TaskList
          tasks={tasks}
          handleDelete={handleDelete}
          deletingIndex={deletingIndex}
        />
      </div>
    </>
  );
}

export default App;