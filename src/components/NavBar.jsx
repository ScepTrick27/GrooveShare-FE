import React from "react";
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className={styles.navBar}>
    <div className={styles["header"]}>
        <a className={styles["logo"]} href="/">Welcome to GrooveShare</a>
        <div className={styles["header-right"]}>
                <a href="/SignUp">Sign Up</a>
                <a href="/LogIn">LogIn</a>
                <a href="/MyProfilePage">My Profile</a>
                <a href="/CreatePost">Create Post</a>
        </div>
    </div>

        </nav>


    );
}

export default NavBar;