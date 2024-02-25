import styles from "./CheckList.module.css";
import Button from "../Button/Button";
import React, { useState } from "react";
import DeleteIcon from "../../assets/Icons/DeleteIcon.png";
import tickIcon from "../../assets/Icons/tickIcon.png";

const CheckList = () => {
  const [checkListMessage, setCheckListMessage] = useState([]);
  const [checked, setChecked] = useState(false);

  const addNewItem = () => {
    setCheckListMessage((prev) => {
      return [...prev, ""];
    });
  };

  const handleDeleteItem = (index) => {
    setCheckListMessage((prev) => {
      const tempState = prev.filter((currItem, idx) => index !== idx);
      return tempState;
    });
  };

  // console.log(checkListMessage);

  const handleChange = (event, index) => {
    setCheckListMessage((prev) => {
      const tempState = [...prev];
      tempState[index] = event.target.value;
      return tempState;
    });
  };
// ----------------------DOUBT---------------------------------
//   const handleChecked = (index) => {
//     setChecked((prev) => checkListMessage.map);
//   }
// -------------------------------------------------------

  const ShowAllCheckListItems = checkListMessage.map((currItem, index) => {
    return (
      <div key={index} className={styles.listItem}>
        <div className={styles.checkContainer}>
          <div className={styles.check} onClick={() => handleChecked(index)}>
            {checked ? "X":""}
          </div>
        </div>

        <input
          type="text"
          placeholder="Add a task"
          value={currItem}
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
