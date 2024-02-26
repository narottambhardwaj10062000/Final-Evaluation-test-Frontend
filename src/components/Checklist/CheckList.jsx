import styles from "./CheckList.module.css";
import Button from "../Button/Button";
import React, { useState } from "react";
import DeleteIcon from "../../assets/Icons/DeleteIcon.png";
import tickIcon from "../../assets/Icons/tickIcon.png";
import { useTaskContext } from "../../contexts/TaskContext";

const CheckList = () => {
  
  const { checkListArray, setCheckListArray} = useTaskContext();

  console.log(checkListArray);

  //function to add a new checkList Item
  const addNewItem = () => {
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
        <div className={styles.checkContainer}>
          <div className={styles.check} onClick={() => handleChecked(index)}>
            {currItem.isCompleted ? "X" : ""}
          </div>
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
