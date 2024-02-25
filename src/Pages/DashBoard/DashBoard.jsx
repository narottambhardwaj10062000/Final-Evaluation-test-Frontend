import styles from "./DashBoard.module.css";
import React, { useEffect, useState } from "react";
import codeSandBoxImage from "../../assets/Icons/codesandbox.png";
import layoutIcon from "../../assets/Icons/boardLayout.png";
import databaseIcon from "../../assets/Icons/databaseIcon.png";
import settingsIcon from "../../assets/Icons/settingsIcon.png";
import logoutIcon from "../../assets/Icons/LogoutIcon.png";
import { getTasksList } from "../../api/task";
import Backlog from "../../components/Backlog/Backlog";
import Todo from "../../components/Todo/Todo";
import InProgress from "../../components/InProgress/InProgress";
import Done from "../../components/Done/Done";
import { useTaskContext } from "../../contexts/TaskContext";
import LogoutPage from "../LogoutPage/LogoutPage";

const DashBoard = () => {
  const [backlog, setBacklog] = useState([]);
  //   const [allTasks, setAllTasks] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //defining state for filter

  //console.log(selectedOption);

  const {
    fetchData,
    allTasks,
    userName,
    formattedDate,
    selectedOption,
    setSelectedOption,
  } = useTaskContext();

  //   console.log(allTasks);
  //   console.log(typeof allTasks);
  //   console.log(todo);

  const setValue = () => {
    const todoVal = allTasks.filter((currTask) => {
      return currTask.status === "todo";
    });

    const backlogVal = allTasks.filter((currTask) => {
      return currTask.status === "backlog";
    });

    const progressVal = allTasks.filter((currTask) => {
      return currTask.status === "progress";
    });

    const doneVal = allTasks.filter((currTask) => {
      return currTask.status === "done";
    });

    setTodo(todoVal);
    setBacklog(backlogVal);
    setInProgress(progressVal);
    setDone(doneVal);
  };

  //function to handle filter dropdown
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setValue();
  }, [allTasks]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {/* -------------------Title---------------- */}
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <img src={codeSandBoxImage} alt="Title-Image" />
            <h3>Pro Manage</h3>
          </div>
        </div>

        {/* ------------------Menu------------------ */}
        <div className={styles.menuContainer}>
          {/* ------------Board------------- */}
          <div className={styles.menu}>
            <img src={layoutIcon} alt="layout-icon" />
            <p>Board</p>
          </div>

          {/* ----------------Analytics------------ */}
          <div className={styles.menu}>
            <img src={databaseIcon} alt="database-icon" />
            <p>Analytics</p>
          </div>

          {/* ------------------Settings----------- */}
          <div className={styles.menu}>
            <img src={settingsIcon} alt="settings-icon" />
            <p>Settings</p>
          </div>
        </div>

        {/* -----------------Logout---------------------- */}
        <div className={styles.logoutContainer} onClick={() => setShowLogoutModal(true)}>
          <img src={logoutIcon} alt="logout-icon" />
          <p>Log out</p>
        </div>

      </div>
      {/* ----------------------Right Container---------------------- */}
      <div className={styles.rightContainer}>
        {/* -------------------Upper Container--------------- */}
        <div className={styles.upperContainer}>
          <div className={styles.welcomeBoard}>
            {
                userName === null ? "" : <h3>Welcome! {userName.split(" ")[0]}</h3>
            }
            <h4>Board</h4>
          </div>

          <div className={styles.dateFilter}>
            {/* -------------------------Date----------------------------- */}
            <p>{formattedDate}</p>

            {/* -----------------------------Filter------------------------------- */}
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              name="filter"
            >
              <option className={styles.options} value="Today">
                Today
              </option>
              <option className={styles.options} value="This Week">
                This Week
              </option>
              <option className={styles.options} value="This Month">
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
      </div>
      {/* logOut Modal */}
      {showLogoutModal && <LogoutPage setShowLogoutModal={setShowLogoutModal} />}
    </div>
  );
};

export default DashBoard;
