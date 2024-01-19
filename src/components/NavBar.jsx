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

// import React, { useState } from 'react';
// import UserService from "@/services/UserService";
// import { useNavigate } from 'react-router-dom'; 
// import TokenManager from '@/services/TokenManager';

// function NavBar() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const navigate = useNavigate();
//     const claims = TokenManager.getClaims();
//     const accessToken = TokenManager.getAccessToken();

//     const handleSearch = async () => {
//         try {
//             const response = await UserService.getFilteredUsers(searchTerm);
//             navigate(`/search?term=${searchTerm}`);
//         } catch (error) {
//             console.error('Error searching:', error);
//         }
//     };

//     return (
//         <nav className="w-full bg-gradient-to-r from-black to-gray-800 text-white border-b-2 border-gray-800 ">
//             <div className="flex justify-between items-center py-4 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24">
//                 <button
//                     className="sidebar-open block md:hidden relative z-30 focus:outline-none transform -translate-x-1/2 -translate-y-1/2 active:scale-75 transition-transform"
//                 >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//                     </svg>
//                 </button>
//                 <a href="/" className="text-xl md:text-2xl font-bold tracking-wide">
//                     Welcome to GrooveShare
//                 </a>
//                 <div className="menu-resposive hidden fixed flex inset-0 transition-all bg-gray-900 backdrop-blur-xl z-20 md:static md:bg-transparent md:flex items-center justify-center space-y-4 md:space-y-0 flex-col md:flex-row md:space-x-20 -mt-24 md:mt-0">
//                     <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-20 lg:md:-x-20">
//                         <div>
//                             {!accessToken && (
//                                 <>
//                                     <a
//                                         href="/SignUp"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         Sign Up
//                                     </a>
//                                     <a
//                                         href="/LogIn"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         Log In
//                                     </a>
//                                 </>
//                             )}

//                             {accessToken && claims.roles && claims.roles.includes("USER") && (
//                                 <>
//                                     <a
//                                         href="/MyProfilePage"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         My Profile
//                                     </a>
//                                     <a
//                                         href="/FollowingPage"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         Followers Posts
//                                     </a>
//                                     <a
//                                         href="/CreatePost"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         Create Post
//                                     </a>
//                                 </>
//                             )}

//                             {accessToken && claims.roles && claims.roles.includes("ADMIN") && (
//                                 <>
//                                     <a
//                                         href="/Statistics"
//                                         className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                                     >
//                                         Statistics
//                                     </a>
//                                 </>
//                             )}
//                         </div>
//                     </ul>
//                 </div>
//                 <button
//                     className="search-menu flex justify-center items-center h-8 px-3 font-medium text-white bg-green-600 whitespace-nowrap hover:bg-green-700 hover:text-white
//                         rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 focus:outline-none"
//                     onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg" 
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                     </svg>
//                 </button>
//             </div>
//             <div
//     className={`search-form flex items-center space-x-2 px-3 mx-auto pb-3 max-w-screen-xl md:px-12 lg:px-16 xl:px-24 transform duration-500 transition-all ${
//         isSearchOpen ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
//     }`}
//             >
//                 <div className="flex bg-gray-800 p-1 w-full space-x-1 rounded-lg items-center">
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6 opacity-75 ml-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
//                     </svg>
//                     <input
//                         className="w-full bg-gray-900 outline-none border-transparent focus:border-transparent focus:ring-0 rounded-lg text-white text-sm sm:text-base"
//                         type="text"
//                         placeholder="Search for a user"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button
//                         className="ml-2 bg-green-700 text-white px-2 py-1 rounded-md hover:bg-green-800 transition duration-300"
//                         onClick={handleSearch}
//                     >
//                         Search
//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default NavBar;









