import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import FriendList from './components/FriendsList';
import ChatWindow from './components/ChatWindow';
import { getUserFromLocalStorage, setUserToLocalStorage } from './data/users';

function App() {
  const [user, setUser] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [friendMessage, setFriendMessage] = useState('');

  // Get user from localStorage on component mount
  useEffect(() => {
    const storedUser = getUserFromLocalStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fetch chat history for the selected friend when user or selectedFriend changes
  useEffect(() => {
    if (user && selectedFriend) {
      fetchChatHistory(user.id, selectedFriend.id);
    }
  }, [user, selectedFriend]);

  const fetchChatHistory = (userId, friendId) => {
    const chatKey = `chatHistory_${userId}_${friendId}`; // Unique key per friend
    const chatHistory = JSON.parse(localStorage.getItem(chatKey)) || [];
    setMessages(chatHistory);
  };

  const handleLogin = (user) => {
    setUser(user);
    setUserToLocalStorage(user); // Save user in localStorage
  };

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend); // Update selected friend
  };

  const handleSendMessage = (message, sender) => {
    if (!selectedFriend) return; // Ensure a friend is selected

    const newMessage = { text: message, sender };
    const newMessages = [...messages, newMessage];

    // Update the message state
    setMessages(newMessages);

    // Save the new message to localStorage under the user-friend pair
    const chatKey = `chatHistory_${user.id}_${selectedFriend.id}`; // Unique key per user-friend pair
    localStorage.setItem(chatKey, JSON.stringify(newMessages));
  };

  return (
    <div className="app">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="chat-container">
          <FriendList onSelectFriend={handleFriendSelect} />
          
          <div className="chat-windows">
            {/* User's Chat Window */}
            <ChatWindow 
              title="You" 
              selectedFriend={selectedFriend} 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              message={userMessage}
              setMessage={setUserMessage}
              sender="user"
            />
            
            {/* Friend's Chat Window */}
            <ChatWindow 
              title={`${selectedFriend ? selectedFriend.name : 'Friend'}`} 
              selectedFriend={selectedFriend} 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              message={friendMessage}
              setMessage={setFriendMessage}
              sender="friend"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
