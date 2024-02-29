import styles from "./DeleteModal.module.css";
import React from 'react'
import Button from "../../components/Button/Button";
import { deleteTask } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";

const DeleteModal = ({ setShowDeleteModal, taskId }) => {

    const { fetchData } = useTaskContext();

//   handling delete function
  const handleDeleteCard = async () => {
    const response = await deleteTask(taskId);
    if (response) {
      fetchData();
      setShowDeleteModal(false);
    }
  };

  return (
   <>
     <div className={styles.wrapper}></div>
     <div className={styles.container}>
          <p>Are you sure you want to Delete?</p>
          <div className={styles.buttons}>
            <Button
                style={{
                    width: "300px",
                    height: "45px",
                    borderRadius: "12px",
                    backgroundColor: "#17A2B8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#FFFFFF",
                    cursor: "pointer"
                }}

                onClick={ handleDeleteCard }
            >
                Yes, Delete
            </Button>

            <Button
                style={{
                    width: "300px",
                    height: "45px",
                    borderRadius: "12px",
                    border: "1px solid #CF3636",
                    color: "#CF3636",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                }}

                onClick={ () => setShowDeleteModal(false) }
            >
                Cancel
            </Button>
          </div>
       </div>
   </>

  )
}

export default DeleteModal