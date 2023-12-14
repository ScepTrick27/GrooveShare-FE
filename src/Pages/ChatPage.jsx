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

    userService.GetLoggedInUser(userId)
      .then(response => {
        //console.log('User details fetched successfully:', response.data);
        setUser(response.data);
      })
      .catch(error => {
        //console.error('Error fetching user details:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      //console.log('Cleaning up ChatPage component...');
      if (stompClient) {
        stompClient.deactivate();
        setStompClient(null); 
      }
    };
  }, [userId]);

  const setupStompClient = (userId) => {
    //console.log(`Setting up STOMP client for username: ${userId}`);

    if (stompClient) {
      stompClient.deactivate();
    }

    const newStompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    newStompClient.onConnect = () => {
      //console.log('STOMP client connected!');

      newStompClient.subscribe(`/topic/user/${userId}`, (data) => {
        //console.log(`Received from user topic ${userId}:`, data);
        onMessageReceived(data);
      });
    };
    newStompClient.activate();

    setStompClient(newStompClient);
};

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      //console.log(`Sending private message to ${payload.to}:`, payload);
      stompClient.publish({ 'destination': `/topic/user/${payload.to}`, body: JSON.stringify(payload) });
    } else {
      //console.log('Sending public message:', payload);
      stompClient.publish({ 'destination': `/topic/user/${userId}`, body: JSON.stringify(payload) });
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);
    //console.log('Received message:', message);

    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };

  //console.log('Rendering ChatRoom component:', { username, messagesReceived });

  return (
    <div>
      <h2>Live Chatroom for User {user?.username}</h2>
      <SendMessagePlaceholder username={userId} onMessageSend={sendMessage} />
      <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
    </div>
  );
}

export default ChatPage;
