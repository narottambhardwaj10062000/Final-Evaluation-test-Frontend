import React, { useEffect } from "react";
// import "./Analytics.css";
// import { useDispatch } from "react-redux";
import styles from "./AnalyticsPage.module.css";

export default function AnalyticsPage() {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch({ type: "SELECTED_MENU", payload: "Analytics" });
  //   });

  const list1 = [
    {
      TaskName: "Backlog Tasks",
      Number: 16,
    },
    {
      TaskName: "To-do Tasks",
      Number: 14,
    },
    {
      TaskName: "In-Progress Tasks",
      Number: 3,
    },
    {
      TaskName: "Completed Tasks",
      Number: 22,
    },
  ];

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>Analytics</div>
      <div className={styles.taskContainer}>
        <div className={styles.subContainer}>
          {list1.map((item) => {
            return (
              <div className={styles.eachTask}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa-solid fa-circle bullet" ></i>
                  <div className={styles.taskName}>item.TaskName</div>
                </div>
                <div className={styles.taskCount}>item.Number</div>
              </div>
            );
          })}
        </div>
        <div className={styles.subContainer}>
          {list1.map((item) => {
            return (
              <div className={styles.eachTask}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa-solid fa-circle bullet"></i>
                  <div className={styles.taskName}>item.TaskName</div>
                </div>
                <div className={styles.taskCount}>item.Number</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
