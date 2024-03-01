import React, { useEffect, useState } from "react";
import styles from "./AnalyticsPage.module.css";
import { useSnackbar } from "notistack";
import { analytics } from "../../api/task";

export default function AnalyticsPage() {
  const [state, setState] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fun() {
      const result = await analytics();
      console.log(result);
      if (result?.status === 200 || result?.status === 203) {
        const middleIndex = Math.floor(result?.data?.task.length / 2);
        const firstHalf = result?.data?.task.slice(0, middleIndex);
        const secondHalf = result?.data?.task.slice(middleIndex);

        await setState([...state, ...[firstHalf, secondHalf]]);

      }
      else
        enqueueSnackbar('Network Error', { variant: 'error' });
    }
    fun();
  }, [])

  return (
    <div className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>Analytics</div>
      <div className={styles.taskContainer}>
        {
          state?.map((item, index) => {
            return (
              <div key={index} className={styles.subContainer}>
                {item?.map((item) => {
                  return (
                    <div className={styles.eachTask}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className={styles.singleBullet}></div>
                        <div className={styles.taskName}>{item.TaskName}</div>
                      </div>
                      <div className={styles.taskCount}>{item.Number}</div>
                    </div>
                  );
                })}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
