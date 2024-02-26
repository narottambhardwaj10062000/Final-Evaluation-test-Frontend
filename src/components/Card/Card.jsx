import styles from "./Card.module.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import { BsLock, BsThreeDots } from "react-icons/bs";
import EditTaskPage from "../../Pages/EditTaskPage/EditTaskPage";
import { deleteTask } from "../../api/task";
import { updateStatus } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";
import { FaCheckDouble } from "react-icons/fa6";

const Card = ({
  _id,
  title,
  checkList,
  priority,
  dueDate,
  status,
  statusName,
}) => {
  // console.log(statusName);
  // console.log(title, priority, dueDate, status);
  // console.log(checkList);
  const [menuToggle, setMenuToggle] = useState(false);

  const taskId = _id;

  const [showModal, setShowModal] = useState(false); //imp

  //getting required data from task context
  const { fetchData } = useTaskContext();

  //handling my delete function
  const handleDelete = async () => {
    const response = await deleteTask(taskId);
    if (response) {
      // alert(" task has been successfully deleted" );
      fetchData();
    }
  };

  //function to handle status change Backlog
  const handleChangeStatusBacklog = async () => {
    const response = await updateStatus(taskId, "backlog");

    if (response) {
      // alert("status has been updated");
      fetchData();
    }
  };

  //function to handle status change Progress
  const handleChangeStatusProgress = async () => {
    const response = await updateStatus(taskId, "progress");

    if (response) {
      // alert("status has been updated");
      fetchData();
    }
  };

  //function to handle status change Done
  const handleChangeStatusDone = async () => {
    const response = await updateStatus(taskId, "done");

    if (response) {
      // alert("status has been updated");
      fetchData();
    }
  };

  const handleChangeStatusTodo = async () => {
    const response = await updateStatus(taskId, "todo");

    if (response) {
      // alert("status has been updated");
      fetchData();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.priorityDropdown}>
        <p>{priority}</p>
        <BsThreeDots
          style={{ cursor: "pointer" }}
          onClick={() => setMenuToggle(!menuToggle)}
        />
      </div>

      <div
        style={menuToggle ? { display: "flex" } : { display: "none" }}
        className={styles.menuContainer}
      >
        <Button
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Edit
        </Button>
        <Button style={{ cursor: "pointer" }}>Share</Button>
        <Button
          style={{ color: "#CF3636", cursor: "pointer" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>

      <p className={styles.title}>{title}</p>

      {/* listing all checklist */}
      <div className={styles.checkListContainer}>
        <div className={styles.checklistCount}>Checklist (1/3)</div>
        {checkList.map((currItem) => {
          const IsCompleted = currItem.isCompleted;
          return (
            <label className={styles.checklist}>
              <input type="checkbox" value={currItem.isCompleted} checked={IsCompleted} />
              <span>{currItem.body}</span>
            </label>
          );
        })}
      </div>

      {/* <select>
        <option>Task to be done</option>
        <option>Task to be done</option>
        <option>Task has been done</option>
      </select> */}

      <div className={styles.btnContainer}>
        <Button
          style={{
            backgroundColor: "#CF3636",
            fontFamily: "Poppins",
            fontSize: "8px",
            fontWeight: "500",
            color: "#FFFFFF",
            padding: "5px 10px 5px 10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {dueDate}
        </Button>

        <div className={styles.threeBtn}>
          <Button
            style={
              statusName === "backlog"
                ? { display: "none" }
                : {
                    display: "block",
                    backgroundColor: "#EEECEC",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                    fontWeight: "500",
                    color: "#767575",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }
            }
            onClick={handleChangeStatusBacklog}
          >
            BACKLOG
          </Button>

          <Button
            style={
              statusName === "todo"
                ? { display: "none" }
                : {
                    display: "block",
                    backgroundColor: "#EEECEC",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                    fontWeight: "500",
                    color: "#767575",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }
            }
            onClick={handleChangeStatusTodo}
          >
            TO-DO
          </Button>

          <Button
            style={
              statusName === "progress"
                ? { display: "none" }
                : {
                    backgroundColor: "#EEECEC",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                    fontWeight: "500",
                    color: "#767575",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }
            }
            onClick={handleChangeStatusProgress}
          >
            PROGRESS
          </Button>

          <Button
            style={
              statusName === "done"
                ? { display: "none" }
                : {
                    backgroundColor: "#EEECEC",
                    fontFamily: "Poppins",
                    fontSize: "8px",
                    fontWeight: "500",
                    color: "#767575",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }
            }
            onClick={handleChangeStatusDone}
          >
            DONE
          </Button>
        </div>
      </div>
      {/* modal */}
      {showModal && (
        <EditTaskPage
          prefillData={{ _id, title, checkList, priority, dueDate, status }}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Card;
