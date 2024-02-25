import styles from "./Done.module.css";
import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
import Card from "../Card/Card";

const Done = ({ done }) => {
  return (
    <div className={styles.container}>
      {/* header  */}
      <div className={styles.headerContainer}>
        <p>Done</p>
        <div className={styles.iconContainer}>
          <VscCollapseAll style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* cards will be rendered here*/}
      <div className={styles.cardContainer}>
        {done.map((currCard) => {
          return <Card key={currCard._id} {...currCard} statusName="done" />;
        })}
      </div>
    </div>
  );
};

export default Done;
