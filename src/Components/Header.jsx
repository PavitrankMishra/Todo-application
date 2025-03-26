import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; 
import styles from "./Header.module.css";

const Header = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.headerContainer}>
    <div className={styles.headingContainer}>
      <h1>Advanced To-Do App</h1>
      </div>
      <div className={styles.userSection}>
        <h2>Welcome, {user.username}!</h2>
        <button onClick={() => dispatch(logout())} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
