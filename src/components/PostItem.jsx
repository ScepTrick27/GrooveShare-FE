import React from "react"
import styles from "./TodoItem.module.css"

function PostItem(props) {
    return (
      <li className={styles.item}>
        <p className={styles.creator}>Creator: {props.post.user.username}</p>
        <p>Content: {props.post.content}</p>        
      </li>
    )
  }
  
  export default PostItem;