// ChatRoom.js
import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from '@/components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '@/components/SendMessagePlaceholder';
import TokenManager from '@/services/TokenManager';
import userService from '@/services/UserService';

function ChatPage({ userId }) {
  const [stompClient, setStompClient] = useState();
  const [username, setUsername] = useState();
  const [messagesReceived, setMessagesReceived] = useState([]);
    const [user, setUser] = useState(null);
  const claims = TokenManager.getClaims();

  useEffect(() => {
    setUsername(claims.sub);
    setupStompClient(userId);

    // Fetch user details and handle loading/error
    userService.GetLoggedInUser(userId)
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

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up ChatPage component...');
      if (stompClient) {
        stompClient.deactivate();
        setStompClient(null); // Resetting the state
      }
    };
  }, [userId]);

  const setupStompClient = (userId) => {
    console.log(`Setting up STOMP client for username: ${userId}`);

    // Cleanup existing client if exists
    if (stompClient) {
      stompClient.deactivate();
    }

    // stomp client over websockets
    const newStompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    newStompClient.onConnect = () => {
      console.log('STOMP client connected!');

      // Subscribe to the user's specific topic
      newStompClient.subscribe(`/topic/user/${userId}`, (data) => {
        console.log(`Received from user topic ${userId}:`, data);
        onMessageReceived(data);
      });
    };

    // initiate client
    newStompClient.activate();

    // maintain the client for sending and receiving
    setStompClient(newStompClient);
};

  // send the data using Stomp
  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      console.log(`Sending private message to ${payload.to}:`, payload);
      stompClient.publish({ 'destination': `/topic/user/${payload.to}`, body: JSON.stringify(payload) });
    } else {
      console.log('Sending public message:', payload);
      stompClient.publish({ 'destination': `/topic/user/${userId}`, body: JSON.stringify(payload) });
    }
  };

  // display the received data
  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    console.log('Received message:', message);

    // Include all received messages in the messagesReceived state
    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  console.log('Rendering ChatRoom component:', { username, messagesReceived });

  return (
    <div>
      <h2>Live Chatroom for User {user?.username}</h2>
      <SendMessagePlaceholder username={userId} onMessageSend={sendMessage} />
      <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
    </div>
  );
}

export default ChatPage;
