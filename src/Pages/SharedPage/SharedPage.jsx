import React, { useEffect, useState } from "react";
import styles from "./SharedPage.module.css";
import { useParams } from "react-router-dom";
import { sharedTask } from "../../api/task";
import codesandBoxIcon from "../../assets/Icons/codesandbox.png";
import moment from "moment";

export default function SharedPage() {
  const { param } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getSharedData();
  }, [param]);

  const getSharedData = async () => {
    const response = await sharedTask(param);
    if (response) {
      setData(response.data.task);
    }
  };

  //total checklist count
  const totalChecklistCount = data?.checkList.length;

  //total completed checklist count
  const totalChecklistCompleted = data?.checkList.filter(
    (currItem) => currItem.isCompleted === true
  ).length;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        position: "relative"
      }}
    >
    <div className={styles.cornerContainer}>
      <img src={codesandBoxIcon} className={styles.imgContainer} />
      <h3>PRO MANAGE</h3>
    </div>
      <div className={styles.taskContainer1}>
        <div className={styles.taskHeader}>
          <div className={styles.bulletContainer}>
            <div
              className={styles.bullet}
              style={
                data?.priority === "Low Priority"
                  ? { backgroundColor: "#63C05B" }
                  : data?.priority === "Moderate Priority"
                  ? { backgroundColor: "#18B0FF" }
                  : data?.priority === "High Priority"
                  ? { backgroundColor: "#FF2473" }
                  : null
              }
            ></div>
            <p className={styles.taskPriority}>{data?.priority}</p>
          </div>

          <div className={styles.taskTitle}>{data?.title}</div>
        </div>
        <div className={styles.checklistCount}>
          Checklist ({totalChecklistCompleted}/{totalChecklistCount})
        </div>
        <div className={styles.taskChecklist}>
          {data?.checkList.map((currItem) => {
            return (
              <label key={currItem._id} className={styles.checklist}>
                <input
                  type="checkbox"
                  checked={currItem.isCompleted}
                  readOnly
                />
                <span>{currItem.body}</span>
              </label>
            );
          })}
        </div>
        {data?.dueDate ? (
          <div className={styles.taskDuedate}>
            <div className={styles.duedate}>Due Date</div>
            <div className={styles.dateContainer}>
              {moment(data.dueDate).format("MMM Do")}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
