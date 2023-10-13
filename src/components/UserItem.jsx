import React from "react"
import styles from "./TodoItem.module.css"

function UserItem(props) {
    return (
      <li className={styles.item}>
        <p>User ID: {props.user.userId}</p>
        <p>Username: {props.user.username}</p>
        <p>Password: {props.user.password}</p>
        <p>Description: {props.user.description}</p>
        <p>User Gender: {props.user.userGender}</p>
      </li>
    )
  }
  
  export default UserItem;