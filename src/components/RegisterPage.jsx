/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const [validationError, setValidationError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (name.length == 0 || username.length == 0 || password.length == 0 || confirmPassword.length == 0 || role.length == 0) {
      setValidationError(true);
    }

    if (password != confirmPassword) {
      setPasswordMismatchError(true);
    } else {
      // if (password !== confirmPassword) {
      //   setError('Passwords do not match');
      //   return;
      // }
  
      try {
        const response = await axios.post('http://localhost:9080/api/user/register', { name, username, password, role,email, phone});
        // Handle successful registration, e.g., redirect to login page
        console.log(response.data);
        Swal.fire({
          title: "User Registered Successfully",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login"; // Redirect to the login page
          }
        });
        
      } catch (err) {
        setError(err.response.data.message || 'An error occurred');
      }
    }    
  };

  return (
    // <div>
    //   <h2>Register</h2>
    //   <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
    //   <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
    //   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    //   <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
    //   <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
    //   <button onClick={handleRegister}>Register</button>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>


<div className="grid lg:grid-cols-2 sm:grid-cols-1 items-center min-h-screen overflow-hidden bg-gray-200 bg-gradient-to-r from-white to-blue-500">  <div className="sm:flex">
        <img src="../../public/signup.jpg" alt="E-learning platform" className="h-fit  object-cover rounded-xl m-4" />
      </div>
  <div className="w-full max-w-md mx-auto p-8 space-y-4 bg-white rounded-xl shadow-md">

    <h2 className="text-2xl font-semibold text-center text-gray-800">REGISTER NOW</h2>

    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

    <form className="flex flex-col space-y-4">

      <div className="flex items-center border-b border-gray-200 py-2">
        <i className="fas fa-user text-gray-400 mr-2"></i>  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      {validationError && name.length<=0?<label className='text-red-500'>*Name filed can't be empty</label>:''}

      <div className="flex items-center border-b border-gray-200 py-2">
        <i className="fas fa-at text-gray-400 mr-2"></i>  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      {validationError && username.length<=0?<label className='text-red-500'>*<Username></Username> filed can't be empty</label>:''}

      <div className="flex items-center border-b border-gray-200 py-2">
        <i className="fas fa-lock text-gray-400 mr-2"></i>  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      {validationError && password.length<=0?<label className='text-red-500'>*Password filed can't be empty</label>:''}

      <div className="flex items-center border-b border-gray-200 py-2">
        <i className="fas fa-lock text-gray-400 mr-2"></i>  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" />
      </div>
      {validationError && confirmPassword.length<=0?<label className='text-red-500'>*Password Confirmation filed can't be empty</label>:''}
      {passwordMismatchError && password !== confirmPassword?<label className='text-red-500'>*Confirmation Password should be same as Password.</label>:''}

      <div className="flex items-center border-b border-gray-200 py-2">
          <i className="fas fa-phone text-gray-400 mr-2"></i>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+123456789"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        {validationError && phone.length <= 0 && (
          <label className="text-red-500">*Phone field can't be empty</label>
        )}

        <div className="flex items-center border-b border-gray-200 py-2">
          <i className="fas fa-envelope text-gray-400 mr-2"></i>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>
        {validationError && email.length <= 0 && (
          <label className="text-red-500">*Email field can't be empty</label>
        )}


      <div className="flex items-center">
        {/* <label for="role" class="text-gray-700 mr-2">Role:</label> */}
        <select id="role" placeholder='role' value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring text-gray-500 focus:ring-blue-500 focus:ring-opacity-50">
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
      {validationError && role.length<=0?<label className='text-red-500'>*Role filed can't be empty</label>:''}

      <button type="submit" onClick={handleRegister} className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">Register</button>
      <a href="/login" className="text-sm text-center text-gray-600 hover:text-blue-500">Back to login</a>

    </form>
  </div>
</div>

  );
};

export default RegisterPage;
