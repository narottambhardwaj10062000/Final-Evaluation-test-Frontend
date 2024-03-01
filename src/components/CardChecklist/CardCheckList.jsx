import styles from "./CardCheckList.module.css";
import React, { useEffect, useState } from "react";
import { CiSquareChevDown } from "react-icons/ci";
import { CiSquareChevUp } from "react-icons/ci";
import { handleChangeCheckList } from "../../api/task";
import { useTaskContext } from "../../contexts/TaskContext";

const CardCheckList = ({ checkList, _id, collapseAllState }) => {
  const { fetchData } = useTaskContext();
  const [cardCheckList, setCardChecklist] = useState(checkList);
  const [checklistToggle, setChecklistToggle] = useState(false);

  useEffect(() => {
    setCardChecklist(checkList);
  }, [checkList]);

  useEffect(() => {
    setChecklistToggle(checklistToggle ? false : false);
  }, [collapseAllState]);

  const handleChecklistValueToggle = async (taskId, checklistId, value) => {
    const response = await handleChangeCheckList(taskId, checklistId, value);
    console.log(response);
    if (response.status === 200) {
      setCardChecklist(response.data.checklist);
    }
  };

  //total checklist count
  const totalChecklistCount = cardCheckList?.length;

  //total completed checklist count
  const totalChecklistCompleted = cardCheckList?.filter(
    (currItem) => currItem.isCompleted === true
  ).length;

  return (
    <div className={styles.checkListContainer}>
      {/* Title */}
      <div className={styles.checklistTitle}>
        <div className={styles.checklistCount}>
          Checklist ({totalChecklistCompleted}/{totalChecklistCount})
        </div>

        {checklistToggle ? (
          <CiSquareChevUp
            style={{
              cursor: "pointer",
              backgroundColor: "#EEECEC",
              width: "17.6px",
              height: "17.6px",
            }}
            onClick={() => setChecklistToggle(!checklistToggle)}
          />
        ) : (
          <CiSquareChevDown
            style={{
              cursor: "pointer",
              backgroundColor: "#EEECEC",
              width: "17.6px",
              height: "17.6px",
            }}
            onClick={() => setChecklistToggle(!checklistToggle)}
          />
        )}
      </div>

      {/* show all checkLists */}
      <div
        className={styles.allChecklist}
        style={checklistToggle ? { display: "flex" } : { display: "none" }}
      >
        {cardCheckList.map((currItem, index) => {
          return (
            <div key={index} className={styles.checklist}>
              <input
                type="checkbox"
                checked={currItem.isCompleted}
                onChange={() =>
                  handleChecklistValueToggle(
                    _id,
                    currItem._id,
                    !currItem.isCompleted
                  )
                }
              />
              <span>{currItem.body}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardCheckList;
