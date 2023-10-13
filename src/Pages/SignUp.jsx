import React, { useState } from "react";
import InputItem from '../components/InputItem';
import userService from "../services/UserService"; 

function SignUp() {
  const [errorSavingUser, setErrorSavingUser] = useState(false);

  const addUser = (user) => {
    setErrorSavingUser(false);

    userService.saveUser(user) 
      .then(data => {
        console.log('User created:', data);

      })
      .catch(response => {
        const data = response.response.data;
        if (data.errors.find(error => error.error === 'USER_DUPLICATED')) {
          setErrorSavingUser(true);
        }
      })
      .finally(() => {
        console.log('User Created!');
      });
  };

  return (
    <div className="container">
      <div className="inner">
        <InputItem addUser={addUser} /> {}
      </div>
    </div>
  );
}

export default SignUp;