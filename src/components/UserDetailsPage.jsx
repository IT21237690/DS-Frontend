import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode instead of default

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token to extract user details
        const decodedToken = jwtDecode(token); // Using jwtDecode instead of jwt_decode
        setUserDetails(decodedToken);
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
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>No user details available</p>
      )}
    </div>
  );
};

export default UserDetailsPage;
