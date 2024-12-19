import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FriendList.css';

const FriendList = ({ onSelectFriend }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch 10 random users from the Random User API
    const fetchFriends = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=10'); // Fetch 10 random users
        const fetchedFriends = response.data.results.map((friend) => ({
          id: friend.login.uuid,
          name: `${friend.name.first} ${friend.name.last}`,
          picture: friend.picture.thumbnail,
        }));
        setFriends(fetchedFriends);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) {
    return <div>Loading friends...</div>;
  }

  return (
    <div className="friend-list">
      <h3>Friends</h3>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} onClick={() => onSelectFriend(friend)} className="friend-item">
            <img src={friend.picture} alt={friend.name} className="friend-avatar" />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
