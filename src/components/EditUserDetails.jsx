import React, { useState, useEffect } from "react";
import styles from "./EditUserDetails.module.css";


function EditUserDetails(props) {
    const [user, setUser] = useState(props.user.data);
    const [username, setUsername] = useState(user.username);
    const [description, setDescription] = useState(user.description);

    useEffect(() => {
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        props.updateUser(username, description);
        window.location.href='/MyProfilePage'
    };

    const Cancel = () => {
        window.location.href = '/MyProfilePage';
    };

    return (
        <div className={styles.container_edit}>
            <h1 className="page-title">Edit account details</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="signUp">
                    <div className="login-field">
                        <label className="field-label">Username</label>
                        <br />
                        <input
                            className="input-field"
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label className="field-label">Description</label>
                        <br />
                        <input
                            className="input-field"
                            type="textarea" 
                            name="description"
                            id="description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button className="loginButton">Save</button>
                </div>
            </form>
            <button onClick={Cancel} className="loginButton">
                Cancel
            </button>
        </div>
    );
}

export default EditUserDetails;
