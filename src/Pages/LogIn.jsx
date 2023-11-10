import React, { useState } from "react";
import LogInItem from '../components/LogInItem';
import userService from "../services/UserService"; 

function LogInUp() {

    const [errorSavingUser, setErrorSavingUser] = useState(false);

    const addUser = (user) => {
      setErrorSavingUser(false);
  
      userService.LogInUser(user) 
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
      <div>
        <div>
          <LogInItem addUser={addUser} /> {}
        </div>
      </div>
    );
}

export default LogInUp;