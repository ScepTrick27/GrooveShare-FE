import React from "react";
import { Link } from "react-router-dom";
import styles from "./TodoItem.module.css";
import { FaCheck } from 'react-icons/fa';

function UserItem({ user }) {
    const renderProfilePhoto = () => {
        if (user.photo) {
            return <img src={`data:image/jpeg;base64,${user.photo}`} alt="Preview" className={styles.profilePhoto} />;
        } else {
            return <span className={styles.initial}>{user.username.charAt(0).toUpperCase()}</span>;
        }
    };

    return (
        <div>
        {user.verified ?(
        <li className={styles.item}>
            {renderProfilePhoto()}
            <p>Username: {user.username}<FaCheck style={{ color: "green", marginLeft: "5px" }} /></p>
            <p>Description: {user.description}</p>
            <p>User Gender: {user.userGender}</p>

            <Link to={`/UserPage/${user.userId}`}>
                <button>View Details</button>
            </Link>
        </li>
        ) : (
            <li className={styles.item}>
             {renderProfilePhoto()}
            <p>Username: {user.username}</p>
            <p>Description: {user.description}</p>
            <p>User Gender: {user.userGender}</p>

            <Link to={`/UserPage/${user.userId}`}>
                <button>View Details</button>
            </Link>
        </li>
        )}
        </div>
    );
}

export default UserItem;