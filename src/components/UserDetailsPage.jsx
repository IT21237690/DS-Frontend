import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token to extract user details
        const decodedToken = jwtDecode(token);
        const sid = decodedToken.sid; // Extract sid from the decoded token

        // Make a request to the API endpoint to get user details using sid
        axios.get(`http://localhost:5000/api/user/getuser/${sid}`)
          .then(response => {
            setUserDetails(response.data);
          })
          .catch(error => {
            setError('Error fetching user details: ' + error.message);
          });
      } catch (error) {
        setError('Error decoding token: ' + error.message);
      }
    } else {
      setError('Token not found in local storage');
    }
  }, []);

  const handleHome = () => {
    navigate('/home'); 
  }

  const handleViewCourses = () => {
    navigate('/allcourses');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <img src="/profile.jpg" alt="User Profile" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute top-4 left-4">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleHome}>
          Home
        </button>
      </div>
      <div className="absolute top-4 right-4">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={handleViewCourses}>
          View Courses
        </button>
      </div>
      <div className="relative max-w-md mx-auto shadow-lg rounded-lg overflow-hidden z-10 bg-gray-200 bg-opacity-70 p-6 w-96">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">USER DETAILS</h2>
        </div>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : userDetails ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 items-center">
              <span className="font-bold text-gray-700">Username </span>
              <span className="bg-white p-2 rounded-2xl shadow-sm text-gray-700">{userDetails.username}</span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span className="font-bold text-gray-700">Role </span>
              <span className="bg-white p-2 rounded-2xl shadow-sm text-gray-700">{userDetails.role}</span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span className="font-bold text-gray-700">SID </span>
              <span className="bg-white p-2 rounded-2xl shadow-sm text-gray-700">{userDetails.sid}</span>
            </div>
            <div>
              <span className="font-bold text-lg text-gray-700">Enrolled Courses </span>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                {userDetails.enrolledCourses.map(course => (
                  <li key={course.courseCode} className="bg-white p-2 rounded-2xl shadow-sm text-gray-700">
                    {course.courseCode}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No user details available</p>
        )}
      </div>
    </div>
  );  
};

export default UserDetailsPage;
