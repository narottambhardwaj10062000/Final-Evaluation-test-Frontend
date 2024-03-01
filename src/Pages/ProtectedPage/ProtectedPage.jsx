import styles from "./ProtectedPage.module.css";
import React, { useEffect, useState } from "react";
import codeSandBoxImage from "../../assets/Icons/codesandbox.png";
import layoutIcon from "../../assets/Icons/boardLayout.png";
import databaseIcon from "../../assets/Icons/databaseIcon.png";
import settingsIcon from "../../assets/Icons/settingsIcon.png";
import logoutIcon from "../../assets/Icons/LogoutIcon.png";
import LogoutPage from "../LogoutPage/LogoutPage";
import { Outlet, useNavigate } from "react-router-dom";
import { protectedUrl } from "../../api/auth";

const ProtectedPage = () => {
  const [status, setStatus] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState("board");
  const navigate = useNavigate();

  useEffect(() => {
    async function fun() {
      const isProtected = await protectedUrl();
      if (isProtected?.status === 200) setStatus(true);
      else navigate("/login");
    }
    fun();
  }, []);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const jsx = (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {/* logOut Modal */}
        {showLogoutModal && (
          <LogoutPage setShowLogoutModal={setShowLogoutModal} />
        )}
        {/* -------------------Title---------------- */}
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <img src={codeSandBoxImage} alt="Title-Image" />
            <h3>Pro Manage</h3>
          </div>
        </div>

        {/* ------------------Menu------------------ */}
        <div className={styles.menuContainer}>
          {/* ------------Board------------- */}
          <div
            style={
              selectedBtn === "board"
                ? { backgroundColor: "rgba(67, 145, 237, 0.1)" }
                : null
            }
            className={styles.menu}
            onClick={() => {
              setSelectedBtn("board");
              navigate("/");
            }}
          >
            <img src={layoutIcon} alt="layout-icon" />
            <p>Board</p>
          </div>

          {/* ----------------Analytics------------ */}
          <div
            style={
              selectedBtn === "analytics"
                ? { backgroundColor: "rgba(67, 145, 237, 0.1)" }
                : null
            }
            className={styles.menu}
            onClick={() => {
              setSelectedBtn("analytics");
              navigate("/analytics");
            }}
          >
            <img src={databaseIcon} alt="database-icon" />
            <p>Analytics</p>
          </div>

          {/* ------------------Settings----------- */}
          <div
            style={
              selectedBtn === "settings"
                ? { backgroundColor: "rgba(67, 145, 237, 0.1)" }
                : null
            }
            className={styles.menu}
            onClick={() => {
              setSelectedBtn("settings");
              navigate("/settings");
            }}
          >
            <img src={settingsIcon} alt="settings-icon" />
            <p>Settings</p>
          </div>
        </div>

        {/* -----------------Logout---------------------- */}
        <div
          className={styles.logoutContainer}
          onClick={() => setShowLogoutModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img src={logoutIcon} alt="logout-icon" />
          <p>Log out</p>
        </div>
      </div>
      {/* ----------------------Right Container---------------------- */}
      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  );
  return status && jsx;
};

export default ProtectedPage;
