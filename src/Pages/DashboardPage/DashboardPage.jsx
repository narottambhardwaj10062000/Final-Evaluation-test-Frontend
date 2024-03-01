import React, { useEffect } from "react";
import styles from "./DashboardPage.module.css";
import Backlog from "../../components/Backlog/Backlog";
import Todo from "../../components/Todo/Todo";
import InProgress from "../../components/InProgress/InProgress";
import Done from "../../components/Done/Done";
import { useTaskContext } from "../../contexts/TaskContext";

export default function DashboardPage() {
  const {
    fetchData,
    allTasks,
    userName,
    formattedDate,
    selectedFilter,
    setSelectedFilter,
    todo,
    setTodo,
    inProgress,
    setInProgress,
    backlog,
    setBacklog,
    done,
    setDone,
  } = useTaskContext();

  //function to handle filter dropdown
  const handleSelectChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* -------------------Upper Container--------------- */}
      <div className={styles.upperContainer}>
        <div className={styles.welcomeBoard}>
          {userName === null ? "" : <h3>Welcome! {userName.split(" ")[0]}</h3>}
          <h4>Board</h4>
        </div>

        <div className={styles.dateFilter}>
          {/* -------------------------Date----------------------------- */}
          <p>{formattedDate}</p>

          {/* -----------------------------Filter------------------------------- */}
          <select
            value={selectedFilter}
            onChange={handleSelectChange}
            name="filter"
          >
            <option className={styles.options} value="today">
              Today
            </option>
            <option className={styles.options} value="week">
              This Week
            </option>
            <option className={styles.options} value="month">
              This Month
            </option>
          </select>
        </div>
      </div>

      {/* ----------------------------Board Container-------------------------------- */}
      <div className={styles.boardContainer}>
        <Backlog backlog={backlog} />
        <Todo todo={todo} />
        <InProgress inProgress={inProgress} />
        <Done done={done} />
      </div>
    </>
  );
}
