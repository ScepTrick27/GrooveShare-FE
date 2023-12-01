import React from "react";
import { Link } from "react-router-dom";
import styles from "./TodoItem.module.css";

function UserItem({ user }) {
    return (
        <li className={styles.item}>
            <p>User ID: {user.userId}</p>
            <p>Username: {user.username}</p>
            <p>Description: {user.description}</p>
            <p>User Gender: {user.userGender}</p>

            <Link to={`/UserPage/${user.userId}`}>
                <button>View Details</button>
            </Link>
        </li>
    );
}

export default UserItem;