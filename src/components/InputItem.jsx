import React, { useState } from "react";
// import styles from './SignUp.module.css';
import styles from "./InputItem.module.css";

function InputItem({ addUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    description: "",
    userGender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.trim() !== "") {
      addUser(user);
      setUser({
        username: "",
        password: "",
        description: "",
        userGender: "",
      });
      window.location.href='/LogIn'
    }z
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <nav className={styles.InputItem}>
        
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <label className={styles["label-title"]}>Username</label>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
        <label className={styles["label-title"]}>Password</label>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <label className={styles["label-title"]}>Description</label>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Description"
          name="description"
          value={user.description}
          onChange={handleInputChange}
        />
        <div className={styles["dropdown-container"]}>
          <label className={styles["label-title"]}>User Gender:</label>
          <select
            className={styles["user-gender-select"]}
            name="userGender"
            value={user.userGender}
            onChange={handleInputChange}
          >
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </div>
        <button type="submit" className={styles["input-submit"]}>
          Submit
        </button>
      </form>
    </nav>

  );
}

export default InputItem;