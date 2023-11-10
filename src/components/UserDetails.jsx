import TokenManager from "../services/TokenManager";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";;

function UserDetails(props) {
    console.log(props)
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;
    const IsTheSameUser = () => {
        if (userDetails.userId === id) {
            return (
                <>
                    <Link to={`/EditUserDetailsPage/${userDetails.userId}`} className="account-details-button">
                        Edit account details
                    </Link>
                    <br />
                </>
            )
        }
            
    }

    return (
        <div className="container-account-details">
            <p className="user-details">Username: <b> {userDetails.username} </b> </p>
            <p className="user-details">Password: <b> {userDetails.password} </b> </p>
            <p className="user-details">Description: <b> {userDetails.description} </b> </p>
            <IsTheSameUser />
        </div>
    )
}

export default UserDetails;