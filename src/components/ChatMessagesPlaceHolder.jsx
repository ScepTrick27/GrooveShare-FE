const MessageReceived = (props) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
        </div>
    );
};

const ChatMessagesPlaceholder = (props) => {
    // Remove duplicate messages based on the 'id' property
    const uniqueMessages = [...new Map(props.messagesReceived.map((message) => [message.id, message])).values()];
  
    return (
      <>
        <h2>Messages:</h2>
        {uniqueMessages.map((message) => (
          <MessageReceived
            key={message.id}
            from={message.from}
            direct={message.to === props.username}
            text={message.text}
          />
        ))}
      </>
    );
  };
  
  export default ChatMessagesPlaceholder;