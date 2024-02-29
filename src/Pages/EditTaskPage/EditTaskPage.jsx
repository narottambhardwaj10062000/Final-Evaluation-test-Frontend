import styles from "./EditTaskPage.module.css";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import CheckList from "../../components/Checklist/CheckList";
import { EditTask } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";
import EditChecklist from "../../components/EditChecklist/EditChecklist";
import { showSlashFormatDueDate } from "../../Helpers/FormatDate";
import { useSnackbar } from "notistack";

const EditTaskPage = ({ setShowModal, prefillData }) => {
  const {enqueueSnackbar} = useSnackbar();
  const { _id, title, checkList, priority, dueDate, status } = prefillData;
  const [slashDueDate, setSlashDueDate] = useState("");
  const taskId = _id;

  // const { fetchData, checkListArray } = useTaskContext();
  // console.log(checkList);
  const { fetchData, editedChecklist, setEditedCheckList } = useTaskContext();

  const [editPriority, setEditPriority] = useState(priority);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  console.log(editDueDate);
  const [editTitle, setEditTitle] = useState(title);
  // const [editCheckList, setEditCheckList] = useState(checkList);
  // const { fetchData, editedChecklist } = useTaskContext();
  // const [editCheckList, setEditCheckList] = useState();

  //   console.log(prefillData);

  if (editDueDate !== undefined) {
    useEffect(() => {
      const val = showSlashFormatDueDate(editDueDate);
      setSlashDueDate(val);
    }, [editDueDate]);
  }

  const handleEditTask = async () => {
    if (!editTitle || !editPriority) {
      alert("please fill in all the fields");
      enqueueSnackbar("please fill in all mandatory fields");
      return;
    }

    if (editedChecklist.length === 0) {
      enqueueSnackbar("CheckList is a mandatory field");
      return;
    }

    if (editedChecklist.length > 0) {
      const emptyCheckListArray = editedChecklist.filter((currItem) => currItem.body === "");
        
      if (emptyCheckListArray.length > 0) {
        enqueueSnackbar("CheckLists cant be empty");
        return;
      }
    }

    if (editDueDate) {
      const response = await EditTask({
        taskId,
        editTitle,
        editedChecklist,
        editPriority,
        editDueDate,
      });
      if (response) {
        // alert("Task Edit Successfull");
        enqueueSnackbar("Task Edit Successfull");
        // console.log(response);

        setEditedCheckList([]);
        fetchData();
        setShowModal(false);
      }
    } else if (editDueDate === undefined || editDueDate === "") {
      const response = await EditTask({
        taskId,
        editTitle,
        editedChecklist,
        editPriority,
      });

      if (response) {
        enqueueSnackbar("Task Edit Successfull");
        // console.log(response);

        setEditedCheckList([]);
        fetchData();
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Enter Task Title"
              className={styles.titleInput}
              name="title"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />
          </div>
          {/* --------------------------Select Priority------------------------ */}
          <div className={styles.priorityContainer}>
            <p>Select Priority</p>
            {/* ---------radio Buttons----------------------------------------- */}
            <div className={styles.prioritybtnContainer}>
              <div
                className={styles.radioContainer}
                style={
                  editPriority === "High Priority"
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
                  onChange={(e) => setEditPriority(e.target.value)}
                />
                <label>HIGH PRIORITY</label>
              </div>

              <div
                className={styles.radioModerateContainer}
                style={
                  editPriority === "Moderate Priority"
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
                  onChange={(e) => setEditPriority(e.target.value)}
                />
                <label>MODERATE PRIORITY</label>
              </div>

              <div
                className={styles.radioContainer}
                style={
                  editPriority === "Low Priority"
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
                  onChange={(e) => setEditPriority(e.target.value)}
                />
                <label>LOW PRIORITY</label>
              </div>
            </div>
          </div>
          {/* --------------------------CheckList-------------------------------- */}

          <EditChecklist prevChecklist={checkList} />
        </div>

        {/* -------------------------Buttons------------------------------------- */}
        <div className={styles.buttonContainer}>
          {/* ---------------------------Date------------------------------------ */}
          {/* <input type="date" onChange={(e) => setEditDueDate(e.target.value)} /> */}

          <div className={styles.btnContainer}>
            <input
              type="date"
              onChange={(e) => setEditDueDate(e.target.value)}
            />

            {dueDate === "" ||
            editDueDate === "" ||
            editDueDate === undefined ? (
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
              onClick={() => setShowModal(false)}
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
              onClick={handleEditTask}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTaskPage;
