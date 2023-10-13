import React, { useState } from "react";
import styles from './SignUp.module.css';

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
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <nav className={styles.InputItem}>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className={styles["input-text"]}
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
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