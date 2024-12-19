import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({
  title, 
  selectedFriend, 
  messages, 
  onSendMessage, 
  message, 
  setMessage,
  sender
}) => {
  if (!selectedFriend && sender === 'friend') {
    return <div className="chat-window"><h3>Please select a friend to start chatting</h3></div>;
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message, sender);
      setMessage(''); // Reset message input after sending
    }
  };

  return (
    <div className={`chat-window ${sender}`}>
      <h3>{title}</h3>

      <div className="messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user' : 'friend'} 
            ${sender === 'friend' && msg.sender === 'friend' ? 'friend-right' : ''} 
            ${sender === 'friend' && msg.sender === 'user' ? 'user-left' : ''}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="message-input-container">
        <textarea
          placeholder="Type a message..."
          value={message}
          onChange={handleMessageChange}
        />
        <button onClick={handleSendClick}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
