import React, { useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </nav>

  );
}

export default LogInItem;