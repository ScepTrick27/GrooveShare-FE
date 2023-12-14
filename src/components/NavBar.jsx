import styles from './NavBar.module.css';
import React, { useState } from 'react';
import UserService from "@/services/UserService";
import { useNavigate } from 'react-router-dom'; 
import TokenManager from '@/services/TokenManager';

function NavBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const claims = TokenManager.getClaims();
    const accessToken = TokenManager.getAccessToken();

    const handleSearch = async () => {
        try {
            const response = await UserService.getFilteredUsers(searchTerm);

            navigate(`/search?term=${searchTerm}`);
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
<nav className={styles.navBar}>
    <div className={styles["header"]}>
        <a className={styles["logo"]} href="/">
            Welcome to GrooveShare
        </a>
        <input
            className="text"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div className={styles["header-right"]}>
            {!accessToken && (
                <>
                    <a href="/SignUp">Sign Up</a>
                    <a href="/LogIn">Log In</a>
                </>
            )}

            {accessToken && claims.roles && claims.roles.includes("USER") && (
                <>
                    <a href="/MyProfilePage">My Profile</a>
                    <a href="/FollowingPage">Followers Posts</a>
                    <a href="/CreatePost">Create Post</a>
                </>
            )}

            {accessToken && claims.roles && claims.roles.includes("ADMIN") && (
                <>
                                <a href="/Statistics">Statistics</a>
                </>

            )}
        </div>
    </div>
</nav>
    );
}

export default NavBar;