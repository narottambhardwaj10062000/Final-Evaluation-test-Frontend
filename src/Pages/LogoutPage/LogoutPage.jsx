import styles from "./LogoutPage.module.css";
import React from 'react'
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const LogoutPage = ({ setShowLogoutModal }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Name");
        localStorage.removeItem("Token");
        setShowLogoutModal(false);
        navigate("/login");
    }

  return (
    <>
       <div className={styles.wrapper}></div>
       <div className={styles.container}>
          <p>Are you sure you want to Logout?</p>
          <div className={styles.buttons}>
            <Button
                style={{
                    width: "300px",
                    height: "45px",
                    borderRadius: "12px",
                    backgroundColor: "#17A2B8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "16px",
                    color: "#FFFFFF",
                    cursor: "pointer"
                }}

                onClick={ handleLogout }
            >
                Yes, Logout
            </Button>

            <Button
                style={{
                    width: "300px",
                    height: "45px",
                    borderRadius: "12px",
                    border: "1px solid #CF3636",
                    color: "#CF3636",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                }}

                onClick={ () => setShowLogoutModal(false) }
            >
                Cancel
            </Button>
          </div>
       </div>
    </>
  )
}

export default LogoutPage