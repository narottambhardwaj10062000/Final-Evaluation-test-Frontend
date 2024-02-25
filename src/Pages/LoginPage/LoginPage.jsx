import styles from "./LoginPage.module.css";
import React from "react";
import Image from "../../assets/Images/RegisterpageImage.png";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={Image} alt="My Image" />
      </div>
      <div className={styles.rightContainer}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
