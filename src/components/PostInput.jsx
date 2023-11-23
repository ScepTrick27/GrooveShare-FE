import React, { useEffect, useState } from "react";
import styles from './SignUp.module.css';
import TokenManager from "../services/TokenManager";
import UserService from "../services/UserService";

function PostInput({ addPost }) {
    const [user, setUser] = useState('');
    const claims = TokenManager.getClaims();

    const getUserDetails = () => {
        if (claims?.roles?.includes('USER') && claims?.userId) {
            UserService.GetLoggedInUser(claims.userId)
                .then(response => {
                    const userDetails = response.data;
                    console.log("User details response:", userDetails);
                    setUser(userDetails);
                })
                .catch(error => {
                    console.error("Error getting user details:", error);
                });
        }
    }

    useEffect(() => {
        console.log("Fetching user details...");
        getUserDetails();
    }, []);

    console.log("User:", user);

    const [post, setPost] = useState({
        content: "",
        userId: user?.userId || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        getUserDetails();

        setPost((prevPost) => ({
            ...prevPost,
            content: "",
            userId: user?.userId || '',
        }));

        console.log("Submitting post:", post);
        addPost(post);
        window.location.href='/'
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...user, [name]: value });
    };

    return (
        <nav className={styles.InputItem}>
            <form className={styles["form-container"]} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles["input-text"]}
                    placeholder="Content"
                    name="content"
                    value={post.content}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles["input-submit"]}>
                    Submit
                </button>
            </form>
        </nav>
    );
}

export default PostInput;