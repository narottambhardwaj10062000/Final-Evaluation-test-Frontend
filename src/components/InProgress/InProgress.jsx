import styles from "./InProgress.module.css";
import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
import Card from "../Card/Card";

const InProgress = ({ inProgress }) => {
  return (
    <div className={styles.container}>
      {/* header  */}
      <div className={styles.headerContainer}>
        <p>In Progress</p>
        <div className={styles.iconContainer}>
          <VscCollapseAll style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* cards will be rendered here*/}
      <div className={styles.cardContainer}>
        {inProgress.map((currCard) => {
          return (
            <Card key={currCard._id} {...currCard} statusName="progress" />
          );
        })}
      </div>
    </div>
  );
};

export default InProgress;
