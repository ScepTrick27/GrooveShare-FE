import React from "react"
import styles from "./TodoItem.module.css"

function PostItem(props) {
    return (
      <li className={styles.item}>
        <p>Content: {props.post.content}</p>
        <p>Creator: {props.post.user.username}</p>
      </li>
    )
  }
  
  export default PostItem;