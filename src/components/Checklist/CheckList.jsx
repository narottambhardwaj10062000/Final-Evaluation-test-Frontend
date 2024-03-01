import styles from "./CheckList.module.css";
import Button from "../Button/Button";
import React, { useState } from "react";
import DeleteIcon from "../../assets/Icons/DeleteIcon.png";
import { useTaskContext } from "../../contexts/TaskContext";
import { useSnackbar } from "notistack";

const CheckList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { checkListArray, setCheckListArray } = useTaskContext();

  const totalChecklistCount = checkListArray.length;
  const totalCompletedChecklistCount = checkListArray.filter(
    (currItem) => currItem.isCompleted === true
  ).length;

  //function to add a new checkList Item
  const addNewItem = () => {
    if (checkListArray.length >= 1) {
      const emptyCheckListArray = checkListArray.filter(
        (currItem) => currItem.body === ""
      );
      if (emptyCheckListArray.length > 0) {
        enqueueSnackbar("Checklist can't be empty");
        return;
      }
    }

    setCheckListArray((prev) => {
      return [...prev, { body: "", isCompleted: false }];
    });
  };

  //handleDelete Function
  const handleDeleteItem = (index) => {
    setCheckListArray((prev) => {
      const tempState = prev.filter((currItem, idx) => index !== idx);
      return tempState;
    });
  };

  //handleChange Function
  const handleChange = (event, index) => {
    const tempState = checkListArray.map((currItem, idx) =>
      idx === index
        ? { body: event.target.value, isCompleted: currItem.isCompleted }
        : currItem
    );
    setCheckListArray(tempState);
  };

  //handleChecked Function
  const handleChecked = (index) => {
    const tempState = checkListArray.map((currItem, idx) =>
      idx === index
        ? { body: currItem.body, isCompleted: !currItem.isCompleted }
        : currItem
    );
    setCheckListArray(tempState);
  };

  const ShowAllCheckListItems = checkListArray.map((currItem, index) => {
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

export default CheckList;
