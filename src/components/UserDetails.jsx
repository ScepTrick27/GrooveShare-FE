import TokenManager from "../services/TokenManager";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import UserService from "@/services/UserService";
import styles from "./UserDetails.module.css";

function UserDetails(props) {
    console.log(props)
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;

    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
      };
    
      const openDialogBox = () => {
        handleDisplay(true);
      };
    
      const handleConfirm = () => {
        if (claims?.roles?.includes('USER') && claims?.userId) {
            UserService.DeleteUser(claims.userId)
            .catch(error => console.error(error));
        }
        window.location.href = '/';
        alert("Account Deleted")
        TokenManager.clear();
        handleClose();
      };
    
      const IsAuth = () => {
        if (userDetails.userId === id) {
          return (
            <>
              <Link to={`/EditUserDetailsPage/${userDetails.userId}`} className="account-details-button">
                Edit account details
              </Link>
              <br />
              <button onClick={openDialogBox}>Delete Account</button>
              <Dialog onClose={handleClose} open={openDialog}>
                <DialogTitle> Delete Account </DialogTitle>
                <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
                  Are you sure to delete your account?{" "}
                </h3>
                <br></br>
                <div>
                  <button onClick={handleConfirm}>Confirm</button>
                  <button onClick={handleClose}>Cancel</button>
                </div>
              </Dialog>
            </>
          );
        }
      };

    return (
        <div className={styles.container}>
            <p className="user-details">Username: <b> {userDetails.username} </b> </p>
            <p className="user-details">Password: <b> {userDetails.password} </b> </p>
            <p className="user-details">Description: <b> {userDetails.description} </b> </p>
            <IsAuth />
        </div>
    )
}

export default UserDetails;