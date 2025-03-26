import React, { useState, useEffect } from "react";
import styles from "./TaskList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NoTask from "./NoTask";

const apiKey = "d035980aeab24d229c3174544252503";

const TaskList = ({ tasks, handleDelete, deletingIndex }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);

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

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location.lat || !location.lon || tasks.length === 0) return;

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
  }, [tasks, location.lat, location.lon]);

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className={styles.taskListContainer}>
      {tasks.length === 0 ? (
        <NoTask />
      ) : (
        <table className={styles.taskTable}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Weather</th>
              <th className={styles.narrowColumn}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((item, index) => (
              <tr
                key={index}
                className={`${styles.fadeInRow} ${
                  deletingIndex === index ? styles.fadeOutRow : ""
                }`}
              >
                <td className={styles.wideColumn}>{item.task}</td>
                <td
                  className={
                    item.type === "outdoor" ? styles.outdoor : styles.indoor
                  }
                >
                  {item.type}
                </td>
                <td>
                  <span
                    className={`${styles.priorityBadge} ${
                      styles[item.priority]
                    }`}
                  >
                    {item.priority}
                  </span>
                </td>
                <td>
                  {item.type === "outdoor" && weatherData?.current ? (
                    <>
                      🌡️ {weatherData.current.temp_c}°C |{" "}
                      {weatherData.current.condition.text}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className={styles.narrowColumn}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
