import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InsLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/user/login', {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response && response.data && response.data.token) {
        const token = response.data.token;
        // Save the token to local storage or session storage
        localStorage.setItem('token', token); // Save token to local storage

        // Redirect the user to the user details page
        navigate('/Insdetails');
        console.log('Login successful');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.response.data.message || 'An error occurred');
    }
  };


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default InsLoginPage;
