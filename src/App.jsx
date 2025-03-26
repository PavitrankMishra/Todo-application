import Header from "./Components/Header";
import styles from "./App.module.css";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task, type, priority) => {
    if (!task || !type || !priority) {
      alert("Please fill all the required fields");
      return;
    }
    const newTask = { task, type, priority };
    setTasks((prevTasks) => [...prevTasks, newTask]); // Using function to avoid dependency issues
  };

  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((_, i) => i !== index);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setDeletingIndex(null);
    }, 500);
  };

  return (
    <div className={styles.appContainer}>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        deletingIndex={deletingIndex}
      />
    </div>
  );
}

export default App;