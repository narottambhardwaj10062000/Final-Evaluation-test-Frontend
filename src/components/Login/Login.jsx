import styles from "./Login.module.css";
import React, { useState } from "react";
import emailIcon from "../../assets/Icons/emailIcon.png";
import lockIcon from "../../assets/Icons/lockIcon.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { handleUserLogin } from "../../api/auth";
import { useTaskContext } from "../../contexts/TaskContext";

const Login = () => {
  const navigate = useNavigate();

  //modal related needs to be removed !!!!!!!!!
  

  // const closeModal = () => {
  //   return setShowModal(false);
  // };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUserName } = useTaskContext();

  // console.log(data);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // const redirectToRegisterPage = () => {
  //     navigate("/register");
  //     navigate("/create");
  // }

  //Function to handle Login
  const handleLogin = async () => {
    //validation
    if (!data.email || !data.password) {
      alert("please fill in all details");
      return;
    }
    const response = await handleUserLogin({ ...data });
    // console.log(response);
    
    if (response) {
      localStorage.setItem("Token", JSON.stringify(response.token));
      localStorage.setItem("Name", JSON.stringify(response.name));
      // console.log(response);
      setUserName(response.name);
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Login</h3>
      {/* ------------------------------Email-----------------------------*/}
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <img src={emailIcon} alt="Email Icon" className={styles.icon} />
        </div>

        <input
          type="text"
          className={styles.input}
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      {/* -------------------------------Password-------------------------- */}
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <img src={lockIcon} alt="lock Icon" className={styles.icon} />
        </div>

        <input
          type="password"
          className={styles.input}
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />
      </div>

      {/* ----------------Login Button---------------------------- */}
      <Button
        style={{
          backgroundColor: "#17A2B8",
          color: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: "55px",
          padding: "1rem",
          fontFamily: "Open Sans",
          fontWeight: "400",
          cursor: "pointer",
        }}
        onClick={handleLogin}
      >
        Log in
      </Button>

      <p>Have no account yet?</p>

      {/* --------------------Register Button------------------------ */}
      <Button
        style={{
          border: "1px solid #17A2B8",
          color: "#17A2B8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          borderRadius: "55px",
          padding: "1rem",
          fontFamily: "Open Sans",
          fontWeight: "400",
          cursor: "pointer",
        }}
        
      >
        Register
      </Button>

    </div>
  );
};

export default Login;
