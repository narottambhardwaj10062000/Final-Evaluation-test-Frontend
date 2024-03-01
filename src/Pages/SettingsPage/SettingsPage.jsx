import React, { useEffect, useState } from "react";
import styles from "./SettingsPage.module.css";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import lockIcon from "../../assets/Icons/lockIcon.png";
import profileImg from "../../assets/Icons/Profile.png";
import { useTaskContext } from "../../contexts/TaskContext";
import { updateProfile } from "../../api/auth";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";

export default function SettingsPage() {
  const { activeUserName } = useTaskContext();
  const [name, setName] = useState(activeUserName);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleNew,setVisibleNew]=useState(false);

  useEffect(() => {
    setName(activeUserName);
  }, [activeUserName]);

  async function apiCall(body) {
    const result = await updateProfile(body);
    console.log(result);
    if (result?.status === 200) {
      if (result?.data?.message !== "Password Updated") {
        setName(result?.data?.name);
        enqueueSnackbar(result?.data?.message, { variant: "success" });
      }
    } else if (result?.status === 400) {
      enqueueSnackbar(result?.data?.message, { variant: "error" });
    } else {
      enqueueSnackbar("Network Error", { variant: "error" });
    }
  }

  async function onSubmit() {
    if (oldPassword === "" && newPassword === "" && name === "") {
      enqueueSnackbar("All fields cant be empty", { variant: "warning" });
      return;
    } else if (oldPassword === "" && newPassword === "") {
      await apiCall({
        name,
        oldpassword: oldPassword,
        newpassword: newPassword,
      });
    } else if (oldPassword === "" || newPassword === "") {
      if (oldPassword === "") {
        enqueueSnackbar("Old Password is required", { variant: "warning" });
        return;
      }
      if (newPassword === "") {
        enqueueSnackbar("New Password is required", { variant: "warning" });
        return;
      }
    } else if (oldPassword === newPassword) {
      enqueueSnackbar("New password cant be same as old password", {
        variant: "warning",
      });
      return;
    } else {
      await apiCall({
        name,
        oldpassword: oldPassword,
        newpassword: newPassword,
      });
    }
  }
  return (
    <div className={styles.settingContainer}>
      <div className={styles.settingHeader}>Settings</div>
      <div className={styles.settingForm}>
        <div className={styles.inputContainer}>
          <div className={styles.singleInputContainer}>
            <div className={styles.iconContainer}>
              <img src={profileImg} alt="lock Icon" className={styles.icon} />
            </div>

            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.singleInputContainer}>
            <div className={styles.iconContainer}>
              <img src={lockIcon} alt="lock Icon" className={styles.icon} />
            </div>

            <input
              type={visible ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              className={styles.input}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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

          <div className={styles.singleInputContainer}>
            <div className={styles.iconContainer}>
              <img src={lockIcon} alt="lock Icon" className={styles.icon} />
            </div>

            <input
              type={visibleNew ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              className={styles.passwordToggleContainer}
              onClick={() => setVisibleNew(!visibleNew)}
            >
            {visibleNew ? (
                <LuEyeOff style={{ height: "25px", width: "25px" }} />
              ) : (
                <LuEye style={{ height: "25px", width: "25px" }} />
              )}
            </div>

          </div>
        </div>
        <Button
          style={{
            width: "493px",
            height: "55px",
            borderRadius: "55px",
            backgroundColor: "#17A2B8",
            padding: "0px 132.31px 0px 132.31px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Open Sans",
            fontWeight: "400",
            fontSize: "19.29px",
            color: "#FFFFFF",
          }}
          onClick={onSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
