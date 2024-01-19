import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const apiURL = `https://feature-request-backend.onrender.com`||'http://localhost:8000';
  const handleLogin = async () => {
    const data = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(`${apiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // Login successful
        const responseData = await response.json();

        if (responseData && responseData.id && responseData.username && responseData.data) {
          const userId = responseData.id;
          const userEmail = responseData.username;
          console.log(userId+" == "+userEmail);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('token', responseData.data);

          if (userEmail === "admin") {
            navigate('/admin');
          } else {
            navigate(`/profile/${userId}`);
          }


        } else {
          // Handle unexpected response data
          console.error('Unexpected response data:', responseData);
          alert('Login failed. Please try again.');
        }
      } else {
        // Login failed
        console.error('Login failed. Status:', response.status);
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show error message)
      alert('Login failed. Please try again.');
    }
  };


  return (
    <div className="log-register-form">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
