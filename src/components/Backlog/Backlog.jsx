import styles from "./Backlog.module.css";
import React, { useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import Card from "../Card/Card";

const Backlog = ({ backlog }) => {
  // console.log(statusName);
  // console.log(typeof statusName);
  

  return (
    <div className={styles.container}>
      {/* header  */}
      <div className={styles.headerContainer}>
        <p>Backlog</p>
        <div className={styles.iconContainer}>
          <VscCollapseAll
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* cards will be rendered here*/}
      <div className={styles.cardContainer}>
        {backlog.map((currCard) => {
          return (
            <Card
              key={currCard._id}
              {...currCard}
              statusName="backlog"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Backlog;
