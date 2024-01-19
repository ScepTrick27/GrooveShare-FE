import TokenManager from "../services/TokenManager";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import UserService from "@/services/UserService";
import styles from "./UserDetails.module.css";
import { FaCheck } from 'react-icons/fa';

function UserDetails(props) {
    console.log(props)
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  
    const handleClose = () => {
      setOpenDeleteDialog(false);
      setOpenLogoutDialog(false);
    };
  
    const openDeleteDialogBox = () => {
      setOpenDeleteDialog(true);
    };
  
    const openLogoutDialogBox = () => {
      setOpenLogoutDialog(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        await UserService.DeleteUser(claims.userId);
        TokenManager.clear();
        window.location.href = '/';
        alert("Account deleted");
      } catch (error) {
        console.error(error);
        alert("Error deleting user. Please try again.");
      } finally {
        handleClose();
      }
    };
  
    const handleLogOut = async () => {
      TokenManager.clear();
      window.location.href = '/';
      alert("You logged out!");
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
            <button onClick={openDeleteDialogBox} className={styles.buttons}>Delete Account</button>
            <button onClick={openLogoutDialogBox} className={styles.buttons}>Log out</button>
            {!userDetails.verified && (
              <button className={styles.buttons}><a href="/GetVerified">Get Verified</a></button>
            )}
  
            <Dialog onClose={handleClose} open={openDeleteDialog}>
              <DialogTitle>Delete Account</DialogTitle>
              <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
                Are you sure to delete your account?{" "}
              </h3>
              <br></br>
              <div>
                <button onClick={handleConfirmDelete}>Confirm</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </Dialog>
  
            <Dialog onClose={handleClose} open={openLogoutDialog}>
              <DialogTitle>Log out</DialogTitle>
              <h3 style={{ marginTop: "-10px", padding: "5px 10px" }}>
                Are you sure you want to log out{" "}
              </h3>
              <br></br>
              <div>
                <button onClick={handleLogOut}>Confirm</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </Dialog>
          </>
        );
      }
    };

    return (
        <div className={styles.container}>
          <img src={`data:image/jpeg;base64,${userDetails.photo}`} alt="Preview" className={styles.profilePhoto}/>
           {userDetails.verified ?(
            <div>
            <p className={styles.name} ><b> {userDetails.username} </b><FaCheck style={{ color: "green", marginLeft: "5px" }} /> </p>
            <p className="user-details">Description: <b> {userDetails.description} </b> </p>
            <IsAuth />
            </div>
           ):(
            <div>
            <p className={styles.name} ><b> {userDetails.username} </b> </p>
            <p className="user-details">Description: <b> {userDetails.description} </b> </p>
            <IsAuth />
            </div>
           )}
        </div>
    )
}

export default UserDetails;