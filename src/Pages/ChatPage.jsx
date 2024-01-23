import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { v4 as uuidv4 } from 'uuid';
import ChatMessagesPlaceholder from '@/components/ChatMessagesPlaceHolder';
import SendMessagePlaceholder from '@/components/SendMessagePlaceholder';
import TokenManager from '@/services/TokenManager';
import userService from '@/services/UserService';
import styles from "./ChatPage.module.css";

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
        setUser(response.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        setStompClient(null); 
      }
    };
  }, [userId]);

  const setupStompClient = (userId) => {

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

      newStompClient.subscribe(`/topic/user/${userId}`, (data) => {
        onMessageReceived(data);
      });
    };
    newStompClient.activate();

    setStompClient(newStompClient);
};

  const sendMessage = (newMessage) => {
    const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
    if (payload.to) {
      stompClient.publish({ 'destination': `/topic/user/${payload.to}`, body: JSON.stringify(payload) });
    } else {
      stompClient.publish({ 'destination': `/topic/user/${userId}`, body: JSON.stringify(payload) });
    }
  };

  const onMessageReceived = (data) => {
    const message = JSON.parse(data.body);

    setMessagesReceived(messagesReceived => [...messagesReceived, message]);
  };


  return (
    <div>
      <h2>Live Chatroom for User {user?.username}</h2>
      <SendMessagePlaceholder username={userId} onMessageSend={sendMessage} />
      <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />      
    </div>
  );
}

export default ChatPage;
