import styles from "./CreateTask.module.css";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import CheckList from "../../components/Checklist/CheckList";
import { createNewTask } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";

const CreateTask = ({ setShowModal }) => {
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");

  //getting required data from task Context
  const { fetchData } = useTaskContext();

  //Function to add task
  const handleCreateTask = async () => {
    //validation
    if (!title || !dueDate || !priority) {
      alert("please fill in all the fields");
      return;
    }

    //calling create API
    const response = await createNewTask({ title, priority, dueDate });

    // console.log(response.data);
    //Success Message on task addition
    if (response) {
      // alert("Task Added Successfully");
      fetchData();
      setShowModal(false);
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(e) => setPriority(e.target.value)}
            />
            HIGH PRIORITY
            <input
              type="radio"
              name="priority"
              value="Moderate Priority"
              onChange={(e) => setPriority(e.target.value)}
            />
            MODERATE PRIORITY
            <input
              type="radio"
              name="priority"
              value="Low Priority"
              onChange={(e) => setPriority(e.target.value)}
            />
            LOW PRIORITY
          </div>
          {/* --------------------------CheckList-------------------------------- */}
          <CheckList />
        </div>

        {/* -------------------------Buttons------------------------------------- */}
        <div className={styles.buttonContainer}>
          {/* ---------------------------Date------------------------------------ */}
          <input type="date" onChange={(e) => setDueDate(e.target.value)} />
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
