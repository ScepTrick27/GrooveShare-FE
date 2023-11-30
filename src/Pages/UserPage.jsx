// UserDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/UserService';
import ChatPage from '@/Pages/ChatPage';

function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [id]);

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
      <br />
      <ChatPage userId={user.userId} />
    </div>
  );
}

export default UserDetailsPage;
