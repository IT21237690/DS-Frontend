import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const [validationError, setValidationError] = useState(false);
  //const [message, setMessage] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    if (username.length === 0 || password.length === 0) {
      setValidationError(true);
    } else {
      try {
        // Check if the username and password are both 'admin'
        if (username === 'admin' && password === 'admin') {
          // Redirect to the admin page
          navigate('/admin');
          console.log('Admin login successful');
          return; // Exit the function to prevent further execution
        }
  
        // If not 'admin', proceed with the regular login process
        const response = await axios.post(
          'http://localhost:9080/api/user/login',
          {
            username: username,
            password: password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response && response.data && response.data.token) {
          const token = response.data.token;
          // Save the token to local storage or session storage
          localStorage.setItem('token', token); // Save token to local storage
  
          // Redirect the user to user details page
          navigate('/userdetails');
          console.log('Login successful');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        setError(error.response.data.message || 'An error occurred');
      }
    }
  };
  
  
  
  const handleRegister = () => {
    navigate('/register'); 
  };

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center min-h-screen bg-gray-200 bg-gradient-to-r from-white to-blue-500">

      <div className="sm:flex">
        <img src="../../public/login.jpg" alt="E-learning platform" className="w-full h-full object-cover rounded-xl m-4" />
      </div>

      <div className="w-full md:w-1/2 mx-auto p-8 m-4 space-y-4 bg-white rounded-xl drop-shadow-2xl backdrop-blur-md">

        <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back!</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>

          <div className="flex items-center border-b border-gray-200 py-2">
            <i className="fas fa-user text-gray-400 mr-2"></i>  
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" />            
          </div>
          {validationError && username.length<=0?<label htmlFor="username" className='text-red-500'>*Username field cannot be empty</label>:""}

          <div className="flex items-center border-b border-gray-200 py-2">
            <i className="fas fa-lock text-gray-400 mr-2"></i>  
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"/>
          </div>
          {validationError && password.length<=0?<label htmlFor="username" className='text-red-500'>*Password field cannot be empty</label>:""}

          <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Login</button>

        </form>
        <a href="/Inslogin" className="text-sm text-center text-red-600 hover:text-blue-500" style={{ display: 'block', margin: 'auto', marginTop: '10px' }}>Instructor Login</a>
        <button type="button" onClick={handleRegister} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Register</button>
      </div>
    </div>
  );
};

export default LoginPage;
