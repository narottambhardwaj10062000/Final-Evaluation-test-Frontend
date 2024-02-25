import styles from "./RegisterPage.module.css";
import React from "react";
import Image from "../../assets/Images/RegisterpageImage.png";
import Register from "../../components/Register/Register";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={Image} alt="My Image" />
      </div>
      <div className={styles.rightContainer}>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
