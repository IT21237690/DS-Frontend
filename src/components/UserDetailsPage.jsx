import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

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

  return (
    <div>
      <h2>User Details</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : userDetails ? (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Role: {userDetails.role}</p>
          <p>SID: {userDetails.sid}</p>
          <p>Enrolled Courses:</p>
          <ul>
            {userDetails.enrolledCourses.map(course => (
              <li key={course.courseCode}>{course.courseCode}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user details available</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
