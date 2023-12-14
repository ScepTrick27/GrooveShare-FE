import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';
import ChatPage from '@/Pages/ChatPage';
import TokenManager from '@/services/TokenManager';

function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const claims = TokenManager.getClaims();

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
      // Update the state
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
    <div>
      <h2>User Details</h2>
      <p>User ID: {user.userId}</p>
      <p>Username: {user.username}</p>
      <button onClick={handleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      <br />
      <ChatPage userId={user.userId} />
    </div>
  );
}

export default UserDetailsPage;
