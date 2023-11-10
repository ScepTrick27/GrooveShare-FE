import UserService from "../services/UserService";
import { useState, useEffect } from "react";
import TokenManager from "../services/TokenManager";
import UserDetails from "../Components/UserDetails";

const ProfilePage = () => {
    const [user, setUser] = useState();
    const claims = TokenManager.getClaims();

    console.log("Roles check:", claims?.roles?.includes('USER'));
console.log("UserId check:", !!claims?.userId);

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
}

    useEffect(() => {
        getUserDetails();
    }, []);

    const ShowUserDetails = () => {
        if (!user) {
            return <>Loading...</>
        }
        return (
            <UserDetails userDetails={user} />
        );
    }

    return (
        <>
            {document.title = "My account"}
            <ShowUserDetails />
        </>
    );
};

export default ProfilePage;
