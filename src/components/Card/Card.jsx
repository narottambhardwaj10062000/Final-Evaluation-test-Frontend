import styles from "./Card.module.css";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { BsLock, BsThreeDots } from "react-icons/bs";
import EditTaskPage from "../../Pages/EditTaskPage/EditTaskPage";
import { updateStatus, handleChangeCheckList } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";
import { compareDueDate } from "../../Helpers/compareDueDate";
import { FormatDueDate } from "../../Helpers/FormatDate";
import DeleteModal from "../../Pages/DeleteModal/DeleteModal";
import CardCheckList from "../CardChecklist/CardCheckList";
import { useSnackbar } from "notistack";

const Card = ({
  _id,
  title,
  checkList,
  priority,
  dueDate,
  status,
  statusName,
  collapseAllState,
}) => {
  const [dueDateColor, setDueDateColor] = useState("");
  const [requiredDueDate, setRequiredDueDate] = useState("");
  const [menuToggle, setMenuToggle] = useState(false);
  const [showModal, setShowModal] = useState(false); //imp
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newCollapseAll, setNewCollapseAll] = useState(false);
  const { fetchData } = useTaskContext();
  const taskId = _id;
  const { enqueueSnackbar } = useSnackbar();

  const reqStyle = {
    display: "block",
    backgroundColor: "#EEECEC",
    fontFamily: "Poppins",
    fontSize: "8px",
    fontWeight: "500",
    color: "#767575",
    padding: "5px 10px 5px 10px",
    borderRadius: "8px",
    cursor: "pointer",
  };

  //handling due date
  if (dueDate) {
    useEffect(() => {
      const date = new Date();
      const colorVal = compareDueDate(date, dueDate, status);

      const dueDateArray = dueDate.split("-").reverse();
      const dueDay = dueDateArray[0];
      const dueMonth = Number(dueDateArray[1]) - 1;

      const dueDateVal = FormatDueDate(dueDay, dueMonth);
      setRequiredDueDate(dueDateVal);
      setDueDateColor(colorVal);
    }, [dueDate]);
  }

  useEffect(() => {
    setNewCollapseAll(!newCollapseAll);
  }, [collapseAllState]);


  const handleDelete = () => {
    setShowDeleteModal(true);
    setMenuToggle(false);
  };

  //function to handle status change Backlog
  const handleChangeStatusBacklog = async () => {
    const response = await updateStatus(taskId, "backlog");

    if (response) {
      fetchData();
    }
  };

  //function to handle status change Progress
  const handleChangeStatusProgress = async () => {
    const response = await updateStatus(taskId, "progress");

    if (response) {
      fetchData();
    }
  };

  //function to handle status change Done
  const handleChangeStatusDone = async () => {
    const response = await updateStatus(taskId, "done");

    if (response) {
      fetchData();
    }
  };

  //function to handle status change Todo
  const handleChangeStatusTodo = async () => {
    const response = await updateStatus(taskId, "todo");

    if (response) {
      fetchData();
    }
  };

  function copyUrl() {
    const baseUrl = window.location.origin;

    navigator.clipboard
      .writeText(`${baseUrl}/shared/${taskId}`)
      .then(() => {
        enqueueSnackbar("Link Copied", { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar("Error", { variant: "error" });
      });
  }

  //handle Share Function
  const handleShare = () => {
    copyUrl();
    setMenuToggle(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.priorityDropdown}>
        <div className={styles.priorityContainer}>
          <div
            className={styles.circle}
            style={
              priority === "Low Priority"
                ? { backgroundColor: "#63C05B" }
                : priority === "Moderate Priority"
                ? { backgroundColor: "#18B0FF" }
                : priority === "High Priority"
                ? { backgroundColor: "#FF2473" }
                : null
            }
          ></div>
          <p>{priority}</p>
        </div>

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
            setMenuToggle(false);
          }}
        >
          Edit
        </Button>

        <Button style={{ cursor: "pointer" }} onClick={handleShare} >
          Share
        </Button>

        <Button
          style={{ color: "#CF3636", cursor: "pointer" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      {/* Task title */}
      {title.length > 10 ? (
        <p className={styles.title} title={title}>
          {title.substring(0, 10)}...
        </p>
      ) : (
        <p className={styles.title}>{title}</p>
      )}

      {/* listing all checklist */}
      <CardCheckList
        checkList={checkList}
        _id={_id}
        collapseAllState={newCollapseAll}
      />

      <div className={styles.btnContainer}>
        <Button
          style={{
            backgroundColor: dueDateColor,
            fontFamily: "Poppins",
            fontSize: "8px",
            fontWeight: "500",
            color: "white",
            padding: "5px 10px 5px 10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {requiredDueDate}
        </Button>

        <div className={styles.threeBtn}>
          <Button
            style={statusName === "backlog" ? { display: "none" } : reqStyle}
            onClick={handleChangeStatusBacklog}
          >
            BACKLOG
          </Button>

          <Button
            style={statusName === "todo" ? { display: "none" } : reqStyle}
            onClick={handleChangeStatusTodo}
          >
            TO-DO
          </Button>

          <Button
            style={statusName === "progress" ? { display: "none" } : reqStyle}
            onClick={handleChangeStatusProgress}
          >
            PROGRESS
          </Button>

          <Button
            style={statusName === "done" ? { display: "none" } : reqStyle}
            onClick={handleChangeStatusDone}
          >
            DONE
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditTaskPage
          prefillData={{ _id, title, checkList, priority, dueDate, status }}
          setShowModal={setShowModal}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal setShowDeleteModal={setShowDeleteModal} taskId={taskId} />
      )}
    </div>
  );
};

export default Card;
