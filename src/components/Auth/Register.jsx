import React, { useState } from 'react';
import axios from 'axios';
import '../../style/LogRegister.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';
  const handleRegister = () => { 
    
    setMessage('');

    // Check if username and password are provided
    if (!username || !password) {
      setMessage('Please provide both username and password.');
      return;
    }

    // Send a POST request to your backend for user registration
    axios.post(`${apiURL}/auth/register`, { username, password })
      .then(response => {
        // Handle successful registration
        console.log('Registration successful', response.data);
        setMessage('Registration successful! You can now log in.');
        navigate(`/login`);

        
      })
      .catch(error => {
        // Handle registration error
        console.error('Registration error:', error.response.data.message);
        setMessage(error.response.data.message || 'Registration failed. Please try again.');
      });
  };

  return (
    <div className="log-register-form">
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>

      {message && (
        <div className={message.includes('successful') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
