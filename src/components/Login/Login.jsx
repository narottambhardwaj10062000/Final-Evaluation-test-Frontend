import styles from "./Login.module.css";
import React, { useState } from "react";
import emailIcon from "../../assets/Icons/emailIcon.png";
import lockIcon from "../../assets/Icons/lockIcon.png";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { handleUserLogin } from "../../api/auth";
import { useTaskContext } from "../../contexts/TaskContext";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { useSnackbar } from "notistack";

const Login = () => {
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const [visible,setVisible]=useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { setUserName } = useTaskContext();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  //Function to handle Login
  const handleLogin = async () => {
    //validation
    if (!data.email || !data.password) {
      enqueueSnackbar("Please Fill all in all the fields", {variant: "warning"});
      return;
    }
    const response = await handleUserLogin({ ...data });
    // console.log(response);

    if (response?.status === 200) {
      enqueueSnackbar("Login Successful",{variant: "success"});
      localStorage.setItem("Token", JSON.stringify(response?.data?.token));
      localStorage.setItem("Name", JSON.stringify(response?.data?.name));
      // console.log(response);
      setUserName(response?.data?.name);
      navigate("/");
    }
    else if(response?.status === 400) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: 'error' });
    }
    else if(response?.status === 401) {
      enqueueSnackbar(response?.data?.errorMessage, { variant: 'error' });
    }
    else{
      enqueueSnackbar("Network Error", { variant: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Login</h3>
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
          type={visible ? "text": "password"}
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
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </div>
  );
};

export default Login;
