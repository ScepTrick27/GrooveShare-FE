import React, { useState } from "react";
import LogInItem from '../components/LogInItem';
import userService from "../services/UserService"; 
import SpotifyService from "@/services/SpotifyService";

function LogIn() {

    const [errorSavingUser, setErrorSavingUser] = useState(false);

    const addUser = (user) => {
      setErrorSavingUser(false);

      SpotifyService.getToken();
  
      userService.LogInUser(user) 
        .then(data => {
          console.log('User created:', response.response.data);
          //window.location.href='/'
        })
        .catch(response => {
          const data = response.response.data;
            setErrorSavingUser(true);
        })
        .finally(() => {
          if(!errorSavingUser){
              //window.location.href='/'
          }
          console.log('User Logged In!');
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

export default LogIn;