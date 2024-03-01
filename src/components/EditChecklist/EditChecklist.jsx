import styles from "./EditChecklist.module.css";
import Button from "../Button/Button";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../assets/Icons/DeleteIcon.png";
import tickIcon from "../../assets/Icons/tickIcon.png";
import { useTaskContext } from "../../contexts/TaskContext";
import { useSnackbar } from "notistack";

const EditChecklist = ({ prevChecklist }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { editedChecklist, setEditedCheckList } = useTaskContext();

  const reqArray = prevChecklist.map((currItem) => {
    return { body: currItem.body, isCompleted: currItem.isCompleted };
  });

  useEffect(() => {
    setEditedCheckList(reqArray);
  }, []);

  //Total CheckList Count
  const totalChecklistCount = editedChecklist.length;

  //Total Completed CheckList Count
  const totalCompletedChecklistCount = editedChecklist.filter(
    (currItem) => currItem.isCompleted === true
  ).length;

  //function to add a new checkList Item
  const addNewItem = () => {
    if (editedChecklist.length >= 1) {
      const emptyCheckListArray = editedChecklist.filter(
        (currItem) => currItem.body === ""
      );

      if (emptyCheckListArray.length > 0) {
        enqueueSnackbar("CheckList can't be empty");
        return;
      }
    }

    setEditedCheckList((prev) => {
      return [...prev, { body: "", isCompleted: false }];
    });
  };

  //handleDelete Function
  const handleDeleteItem = (index) => {
    setEditedCheckList((prev) => {
      const tempState = prev.filter((currItem, idx) => index !== idx);
      return tempState;
    });
  };

  //handleChange Function
  const handleChange = (event, index) => {
    const tempState = editedChecklist.map((currItem, idx) =>
      idx === index
        ? { body: event.target.value, isCompleted: currItem.isCompleted }
        : currItem
    );
    setEditedCheckList(tempState);
  };

  //handleChecked Function
  const handleChecked = (index) => {
    const tempState = editedChecklist.map((currItem, idx) =>
      idx === index
        ? { body: currItem.body, isCompleted: !currItem.isCompleted }
        : currItem
    );
    setEditedCheckList(tempState);
  };

  const ShowAllCheckListItems = editedChecklist.map((currItem, index) => {
    return (
      <div key={index} className={styles.listItem}>
        <div className={styles.checkBoxContainer}>
          <input
            type="checkbox"
            checked={currItem.isCompleted}
            onChange={() => handleChecked(index)}
          />
        </div>

        <input
          type="text"
          placeholder="Add a task"
          value={currItem.body}
          onChange={() => handleChange(event, index)}
        />

        <img
          src={DeleteIcon}
          alt="delete-icon"
          className={styles.img}
          onClick={() => handleDeleteItem(index)}
        />
      </div>
    );
  });

  return (
    <div className={styles.checkListContainer}>
      <h3 className={styles.checklistCount}>
        Checklist ({totalCompletedChecklistCount}/{totalChecklistCount})
        <span className={styles.star}>*</span>
      </h3>

      {ShowAllCheckListItems}

      <Button
        style={{
          fontFamily: "Inter",
          fontWeight: "500",
          fontSize: "16px",
          color: "#767575",
          cursor: "pointer",
        }}
        onClick={addNewItem}
      >
        + Add New
      </Button>
    </div>
  );
};

export default EditChecklist;
