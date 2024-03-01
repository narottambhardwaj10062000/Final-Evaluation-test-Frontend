import styles from "./CreateTask.module.css";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import CheckList from "../../components/Checklist/CheckList";
import { createNewTask } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";
import { showSlashFormatDueDate } from "../../Helpers/FormatDate";
import { useSnackbar } from "notistack";

const CreateTask = ({ setShowModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [slashDueDate, setSlashDueDate] = useState("");

  useEffect(() => {
    const val = showSlashFormatDueDate(dueDate);
    setSlashDueDate(val);
  }, [dueDate]);

  //getting required data from task Context
  const { fetchData, checkListArray, setCheckListArray } = useTaskContext();

  //Function to handle Cancel
  const handleCancel = () => {
    setCheckListArray([]);
    setShowModal(false);
  };

  //Function to add task
  const handleCreateTask = async () => {
    //validation
    if (!title || !priority) {
      enqueueSnackbar("Please fill in all mandatory fields", {
        variant: "warning",
      });
      return;
    }

    if (checkListArray.length === 0) {
      enqueueSnackbar("CheckList is a mandatory field", { variant: "warning" });
      return;
    }

    if (checkListArray.length > 0) {
      const emptyCheckListArray = checkListArray.filter(
        (currItem) => currItem.body === ""
      );
      if (emptyCheckListArray.length > 0) {
        enqueueSnackbar("CheckLists cant be empty", { variant: "warning" });
        return;
      }
    }

    //calling create API

    if (dueDate) {
      const response = await createNewTask({
        title,
        checkListArray,
        priority,
        dueDate,
      });

      if (response) {
        enqueueSnackbar("Task Added Successfully", { variant: "success" });
        fetchData();
        setCheckListArray([]);
        setShowModal(false);
      }
    }

    if (dueDate === "") {
      const response = await createNewTask({
        title,
        checkListArray,
        priority,
      });

      if (response) {
        enqueueSnackbar("Task Added Successfully", { variant: "success" });
        fetchData();
        setCheckListArray([]);
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <div className={styles.wrapper}></div>
      {/* ----------------------PopUp----------------------------------------- */}
      <div className={styles.container}>
        <div className={styles.upperContainer}>
          {/* -------------------Task Title----------------------------------- */}
          <div className={styles.taskTitle}>
            <label htmlFor="title">
              Title<span className={styles.star}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Task Title"
              className={styles.titleInput}
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          {/* --------------------------Select Priority------------------------ */}
          <div className={styles.priorityContainer}>
            <p>
              Select Priority<span className={styles.star}>*</span>
            </p>
            {/* ---------radio Buttons----------------------------------------- */}
            <div className={styles.prioritybtnContainer}>
              <div
                className={styles.radioContainer}
                style={
                  priority === "High Priority"
                    ? { backgroundColor: "#EEECEC" }
                    : null
                }
              >
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#FF2473",
                  }}
                ></div>

                <input
                  type="radio"
                  name="priority"
                  value="High Priority"
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label>HIGH PRIORITY</label>
              </div>

              <div
                className={styles.radioModerateContainer}
                style={
                  priority === "Moderate Priority"
                    ? { backgroundColor: "#EEECEC" }
                    : null
                }
              >
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#18B0FF",
                  }}
                ></div>

                <input
                  type="radio"
                  name="priority"
                  value="Moderate Priority"
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label>MODERATE PRIORITY</label>
              </div>

              <div
                className={styles.radioContainer}
                style={
                  priority === "Low Priority"
                    ? { backgroundColor: "#EEECEC" }
                    : null
                }
              >
                <div
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#63C05B",
                  }}
                ></div>

                <input
                  type="radio"
                  name="priority"
                  value="Low Priority"
                  onChange={(e) => setPriority(e.target.value)}
                />
                <label>LOW PRIORITY</label>
              </div>
            </div>
          </div>
          {/* --------------------------CheckList-------------------------------- */}
          <CheckList />
        </div>

        {/* -------------------------Buttons------------------------------------- */}
        <div className={styles.buttonContainer}>
          {/* ---------------------------Date------------------------------------ */}

          <div className={styles.btnContainer}>
            <input type="date" onChange={(e) => setDueDate(e.target.value)} />

            {dueDate === "" ? (
              <label>Enter Due Date</label>
            ) : (
              <label>{slashDueDate}</label>
            )}
          </div>

          <div className={styles.cancelSaveBtn}>
            {/* -----------------------------Cancel Button----------------------- */}
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #CF3636",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                color: "#CF3636",
                width: "10rem",
                cursor: "pointer",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            {/* -----------------------------------Save Button---------------------- */}
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                padding: "0.5rem 1rem",
                fontFamily: "Poppins",
                fontWeight: "600",
                fontSize: "16px",
                color: "#FFFFFF",
                backgroundColor: "#17A2B8",
                width: "10rem",
                cursor: "pointer",
              }}
              onClick={handleCreateTask}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTask;
