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
                <div className={styles["logoBox"]}>
                    <a className={styles["logo"]} href="/">
                        Welcome to GrooveShare
                    </a>
                </div>        
                <div className={styles["searchBox"]}>
                    <input
                        className={styles["search"]}
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className={styles["searchButton"]}>Search</button>
                </div>     
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
                            <a href="/RecommendedPosts">Recommended Posts</a>
                        </>
                    )}

                    {accessToken && claims.roles && claims.roles.includes("ADMIN") && (
                        <>
                            <a href="/MyProfilePage">My Profile</a>
                            <a href="/Statistics">Statistics</a>
                            <a href="/AllVerifications">Verify Users</a>
                        </>

                    )}
                </div>
        </nav>
    );
}

export default NavBar;








