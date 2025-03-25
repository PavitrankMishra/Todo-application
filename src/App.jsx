import Header from "./Components/Header";
import styles from "./App.module.css";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <>
      <div className={styles.appContainer}>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
    </>
  );
}

export default App;
