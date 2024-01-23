import React, { useState } from "react";
import styles from "./LoginItem.module.css";



function LogInItem({ addUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.trim() !== "") {
      addUser(user);
      setUser({
        username: "",
        password: "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <nav>
      <div className={styles['login-container']}>
        <h2>Log in</h2>
          <form onSubmit={handleSubmit} className={styles['login-form']}>

            <div className={styles['login-input']}>
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  data-testid="username"
                  placeholder="Enter your username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                />
            </div>

            <div className={styles['login-input']}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                data-testid="password" 
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>  
            <div>
              <button type="submit">
                Submit
              </button>
            </div>            
          </form>
      </div>
    </nav>

  );
}

export default LogInItem;