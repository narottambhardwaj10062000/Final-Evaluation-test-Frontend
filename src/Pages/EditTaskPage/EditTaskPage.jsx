import styles from "./EditTaskPage.module.css";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import CheckList from "../../components/Checklist/CheckList";
import { EditTask } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";

const EditTaskPage = ({ setShowModal, prefillData }) => {
  const { _id, title, priority, dueDate, status } = prefillData;
  const taskId = _id;

  const [editPriority, setEditPriority] = useState(priority);
  const [editDueDate, setEditDueDate] = useState(dueDate);
  const [editTitle, setEditTitle] = useState(title);

  const { fetchData } = useTaskContext();
  //   console.log(prefillData);

  const handleEditTask = async () => {
    const response = await EditTask({
      taskId,
      editTitle,
      editPriority,
      editDueDate,
    });
    if (response) {
      alert("Task Edit Successfull");
      // console.log(response);
      fetchData();
      setShowModal(false);
    }
  };
  //function to handle Edit
  //   const handleEdit = () => {
  //validation
  // if( !title || !dueDate || !priority ) {
  //     alert("please fill in all the fields");
  //     return;
  // }
  //calling create API
  // const response = await createNewTask({ title, priority, dueDate });

  // console.log(response.data);
  //Success Message on task addition
  // if( response ) {
  //   alert("Task Added Successfully");
  //   setShowModal(false);
  // }

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
            <input
              type="radio"
              name="priority"
              value="High Priority"
              onChange={(e) => setEditPriority(e.target.value)}
            />
            HIGH PRIORITY
            <input
              type="radio"
              name="priority"
              value="Moderate Priority"
              onChange={(e) => setEditPriority(e.target.value)}
            />
            MODERATE PRIORITY
            <input
              type="radio"
              name="priority"
              value="Low Priority"
              onChange={(e) => setEditPriority(e.target.value)}
            />
            LOW PRIORITY
          </div>
          {/* --------------------------CheckList-------------------------------- */}
          <CheckList />
        </div>

        {/* -------------------------Buttons------------------------------------- */}
        <div className={styles.buttonContainer}>
          {/* ---------------------------Date------------------------------------ */}
          <input type="date" onChange={(e) => setEditDueDate(e.target.value)} />
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
