import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";

const apiKey = "d035980aeab24d229c3174544252503";

const TaskList = ({ tasks, handleDelete }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);

  // Get user's location once on component mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Error fetching location:", error.message)
      );
    }
  }, []);

  // Fetch Weather Data whenever a new task is added
  useEffect(() => {
    const fetchWeather = async () => {
      if (!location.lat || !location.lon || tasks.length === 0) return; // Ensure location & tasks exist

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=1&aqi=no&alerts=no`
        );

        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        console.log("Weather Data Updated:", data);

        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [tasks]); // Re-run whenever tasks update

  // Sorting tasks by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className={styles.taskListContainer}>
      {tasks.length === 0 ? (
        <p>No task found</p>
      ) : (
        <ol className={styles.taskList}>
          {sortedTasks.map((item, index) => (
            <li key={index} className={styles.taskItem}>
              <strong>Task:</strong> {item.task} | <strong>Type:</strong> {item.type} | <strong>Priority:</strong> {item.priority}{" "}
              {item.type === "outdoor" && weatherData?.current && (
                <span>
                  | 🌤️ {weatherData.current.temp_c}°C | {weatherData.current.condition.text}
                </span>
              )}
              <button className={styles.deleteButton} onClick={() => handleDelete(index)}>❌</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default TaskList;
