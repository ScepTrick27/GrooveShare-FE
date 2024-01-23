import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';
import ChatPage from '@/Pages/ChatPage';
import TokenManager from '@/services/TokenManager';
import styles from "./UserPage.module.css";

function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const claims = TokenManager.getClaims();

  const renderProfilePhoto = () => {
    if (user.photo) {
        return <img src={`data:image/jpeg;base64,${user.photo}`} alt="Preview" className={styles.photo} />;
    } else {
        return <span className={styles.initial}>{user.username.charAt(0).toUpperCase()}</span>;
    }
};


  useEffect(() => {
    console.log("Pula=>"+ claims.userId)
    userService.GetLoggedInUser(id)
      .then(response => {
        console.log('User details fetched successfully:', response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    userService.isFollowing(claims.userId, id)
      .then(response => {
        const isCurrentlyFollowing = response;
        console.log('Is currently following:', isCurrentlyFollowing);
        setIsFollowing(isCurrentlyFollowing);
      })
      .catch(error => {
        console.error('Error checking if following:', error);
      });
  }, [id, claims.userId]);

  useEffect(() =>{

  },[])

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await userService.unfollow(claims.userId, id);
        console.log('User unfollowed successfully.');
      } else {
        await userService.follow(claims.userId, id);
        console.log('User followed successfully.');
      }
      setIsFollowing(prevState => !prevState);
    } catch (error) {
      console.error('Error interacting with user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className={styles.bigger}>
      <div className={styles.leftContainer}>
          <h2>User Details</h2>

          <div className={styles.userDetails}>
          {renderProfilePhoto()}
            <p>User ID: {user.userId}</p>
            <p>Username: {user.username}</p>
          </div>         

          <button onClick={handleFollow} className={styles.followButton}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
      </div>
      <div className={styles.rightContainer}>
        <ChatPage userId={user.userId} />
      </div>    
    </div>
  );
}

export default UserDetailsPage;
