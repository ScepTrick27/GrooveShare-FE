import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import TokenManager from "../services/TokenManager";
import EditUserDetails from "../Components/EditUserDetails";

const EditUserDetailsPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState();
    const claims = TokenManager.getClaims();

    const getUserDetails = () => {
        if (claims?.roles?.includes('USER') && claims?.userId) {
            console.log("Fetching user details for userId:", claims.userId);

            UserService.GetLoggedInUser(claims.userId)
                .then(userDetails => {
                    console.log("User details received:", userDetails);

                    if (!userDetails || typeof userDetails !== 'object') {
                        console.error("Invalid user details format:", userDetails);
                        setUser(/* set a default value or handle the error */);
                        return;
                    }

                    setUser(userDetails);
                })
                .catch(error => {
                    console.error("Error fetching user details:", error);
                });
        } else {
            console.log("Condition is false, not fetching user details.");
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const EditUserDetailsMethod = () => {
        if (!user) {
            console.log("User details not available yet, showing loading...");
            return <>Loading...</>;
        }

        const updateUser = (username, description) => {
            const request = {
                "username": username,
                "description": description,
            };

            console.log("Updating user with request:", request);

            UserService.UpdateUser(id, request)
                .then(response => {
                    console.log("User details updated successfully:", response);
                })
                .catch(error => {
                    console.error("Error updating user details:", error);

                    if (error.response?.data === "USER_ID_INVALID") {
                        alert("User ID invalid.");
                    } else {
                        alert("Something went wrong");
                    }
                });
        };

        console.log("Rendering EditUserDetails with user:", user);
        return <EditUserDetails updateUser={updateUser} user={user} />;
    };

    console.log("Rendering EditUserDetailsPage");

    return (
        <>
            {document.title = "Edit account details"}
            <EditUserDetailsMethod />
        </>
    );
};

export default EditUserDetailsPage;