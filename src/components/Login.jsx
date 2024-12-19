import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    setLoading(true);
    try {
      onLogin({ id: '6022', name: 'Gautham' });
    } catch (error) {
      console.error('Error fetching user data', error);
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <h1>Login to Messenger</h1>
      <button onClick={handleLoginClick} disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
