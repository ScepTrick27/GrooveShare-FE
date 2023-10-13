import React, { useEffect, useState } from "react";
import UserList from '../components/UserList';
import userService from "../services/UserService";

function UserPage() {
    const [users, setUsers] = useState([]);
    const [errorSavingUser, setErrorSavingUser] = useState(false);

    useEffect(() => {
        userService.getAllUsers()
            .then(data => setUsers(data.users))
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <UserList users={users} />
            </div>
        </div>
    )
}

export default UserPage;