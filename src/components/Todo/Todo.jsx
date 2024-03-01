import styles from "./Todo.module.css";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { VscCollapseAll } from "react-icons/vsc";
import Card from "../Card/Card";
import CreateTask from "../../Pages/CreateTaskPage/CreateTask";

const Todo = ({ todo }) => {
  const [showModal, setShowModal] = useState(false);
  const [collapseAllState, setCollapseAllState] = useState(false);

  return (
    <div className={styles.container}>
      {/* header  */}
      <div className={styles.headerContainer}>
        <p>To do</p>
        <div className={styles.iconContainer}>
          <FaPlus
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer" }}
          />
          <VscCollapseAll
            style={{ cursor: "pointer" }}
            onClick={() => setCollapseAllState(!collapseAllState)}
          />
        </div>
      </div>

      {/* cards will be rendered here*/}
      <div className={styles.cardContainer}>
        {todo.map((currCard) => {
          return (
            <Card
              key={currCard._id}
              {...currCard}
              statusName="todo"
              collapseAllState={collapseAllState}
            />
          );
        })}
      </div>

      {/* modal */}
      {showModal && <CreateTask setShowModal={setShowModal} />}
    </div>
  );
};

export default Todo;
