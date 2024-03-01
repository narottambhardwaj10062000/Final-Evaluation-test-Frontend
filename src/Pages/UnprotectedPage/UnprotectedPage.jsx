import styles from "./UnprotectedPage.module.css";
import React, { useEffect, useState } from "react";
import Image from "../../assets/Images/RegisterpageImage.png";
import { Outlet, useNavigate } from "react-router-dom";
import { protectedUrl } from "../../api/auth";

const UnprotectedPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);

  useEffect(() => {
    async function fun() {
      const isProtected = await protectedUrl();
      if (isProtected?.status === 200) {
        setStatus(!isProtected?.status);
        navigate("/");
      }
    }
    fun();
  });

  const jsx = (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={Image} alt="My Image" />

        <div className={styles.backgroundCircle}></div>
        <div className={styles.textContainer}>
          <p style={{ fontSize: 33, fontWeight: 600 }}>
            Welcome aboard my friend
          </p>
          <p style={{ fontSize: 19, fontWeight: 400, padding: 11 }}>
            just a couple of clicks and we start
          </p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  );
  return status && jsx;
};

export default UnprotectedPage;
