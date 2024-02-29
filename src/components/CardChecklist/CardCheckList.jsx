import styles from "./CardCheckList.module.css";
import React, {useEffect, useState} from "react";
import { CiSquareChevDown } from "react-icons/ci";
import { CiSquareChevUp } from "react-icons/ci";
import { handleChangeCheckList } from "../../api/task";
// import SingleCheckList from "../SingleChecklist/SingleCheckList";

const CardCheckList = ({ checkList, _id }) => {

  // console.log(checkList);
  const [cardCheckList, setCardChecklist] = useState(checkList);

  useEffect(() => {
    setCardChecklist(checkList)
  }, [])

  // console.log(cardCheckList)

  const [checklistToggle, setChecklistToggle] = useState(false);

  //total checklist count
  const totalChecklistCount = cardCheckList.length;

  //total completed checklist count
  const totalChecklistCompleted = cardCheckList.filter(
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
          {
            /* useEffect(() => {
          setIsCompleted(currItem.isCompleted);
        }, []); */
          }
          {/* const [IsCompleted, setIsCompleted] = useState(currItem.isCompleted); */}

          {
            /* console.log(IsCompleted); */
          }

          {/* const handleChecklistValueToggle = async () => {
            setIsCompleted(!IsCompleted);
            const response = await handleChangeCheckList(
              _id,
              currItem._id,
              IsCompleted
            );
            if (response) {
              fetchData();
            } */}

            {
              /* console.log(response); */
            }
          {/* }; */}

          {
            /* useEffect(() => {
          handleChecklistValueToggle();
        }, [IsCompleted]); */
          }

          return (
            <div key={index} className={styles.checklist}>
              <input
                type="checkbox"
                checked={currItem.isCompleted}
                // onChange={() => setIsCompleted(!IsCompleted)}
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
