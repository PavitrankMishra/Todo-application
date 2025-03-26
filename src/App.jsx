import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import Header from "./Components/Header";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";
import Login from "./Components/Login";
import styles from "./App.module.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    setTasks((prevTasks) => [...prevTasks, newTask]);
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

  if (!isAuthenticated) return <Login />;

  return (
    <div className={styles.appContainer}>
      <Header user={user}/>
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
