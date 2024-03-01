import styles from "./Registerxx.module.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import profileImg from "../../assets/Icons/Profile.png";
import emailIcon from "../../assets/Icons/emailIcon.png";
import lockIcon from "../../assets/Icons/lockIcon.png";
import { useNavigate } from "react-router-dom";
import { handleUserRegistration } from "../../api/auth";
import { useTaskContext } from "../../contexts/TaskContext";
import { useSnackbar } from "notistack";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setUserName } = useTaskContext();

  //   console.log(data);

  const [confirmPassword, setConfirmPassword] = useState("");
  //   console.log(confirmPassword);

  const handleChange = (event) => {
    if (event.target.name === "confirmpassword") {
      setConfirmPassword(event.target.value);
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  // function to handle registration
  const handleRegister = async () => {
    //validation
    if (!data.name || !data.email || !data.password || !confirmPassword) {
      enqueueSnackbar("Please Fill all in all the fields", {
        variant: "warning",
      });
      return;
    }

    if (data.password !== confirmPassword) {
      enqueueSnackbar("password and Confirm Password did not match", {
        variant: "warning",
      });
      return;
    }
    const response = await handleUserRegistration({ ...data });
    // console.log(response);
    if (response?.status === 200) {
      enqueueSnackbar(response?.data.message, { variant: "success" });

      localStorage.setItem("Token", JSON.stringify(response?.data.token));
      localStorage.setItem("Name", JSON.stringify(response?.data.name));

      setUserName(response?.data.name);
      navigate("/");
    } else if (response?.status === 409) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: "error" });
    } else if (response?.status === 400) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: "error" });
    } else if (response?.status === 500) {
      enqueueSnackbar(response?.data?.message, { variant: "error" });
    } else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Register</h3>{" "}
      {/* ----------------------Name--------------------------------------- */}
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <img src={profileImg} alt="Profile Image" className={styles.icon} />
        </div>

        <input
          type="text"
          className={styles.input}
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      {/* ------------------------Email-------------------------------------- */}
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
      {/* ------------------------Password--------------------------------------*/}
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <img src={lockIcon} alt="lock Icon" className={styles.icon} />
        </div>

        <input
          type={visible ? "text" : "password"}
          className={styles.input}
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <div
          className={styles.passwordToggleContainer}
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <LuEyeOff style={{ height: "25px", width: "25px" }} />
          ) : (
            <LuEye style={{ height: "25px", width: "25px" }} />
          )}
        </div>
      </div>
      {/* ------------------------Confirm Password-----------------------------*/}
      <div className={styles.inputContainer}>
        <div className={styles.iconContainer}>
          <img src={lockIcon} alt="lock Icon" className={styles.icon} />
        </div>

        <input
          type={visibleConfirm ? "text" : "password"}
          className={styles.input}
          name="confirmpassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleChange}
        />

        <div
          className={styles.passwordToggleContainer}
          onClick={() => setVisibleConfirm(!visibleConfirm)}
        >
          {visibleConfirm ? (
            <LuEyeOff style={{ height: "25px", width: "25px" }} />
          ) : (
            <LuEye style={{ height: "25px", width: "25px" }} />
          )}
        </div>
      </div>
      {/* --------------Register Button--------------------------------------- */}
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
        onClick={handleRegister}
      >
        Register
      </Button>
      <p>Have an account?</p>
      {/* ----------------Login Button----------------------------------------- */}
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
        onClick={redirectToLoginPage}
      >
        Log in
      </Button>
    </div>
  );
};

export default Register;
