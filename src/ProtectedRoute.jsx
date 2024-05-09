import { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Decode the JWT token to extract the user's role
    const decodedToken = jwt_decode(token);
    if (decodedToken && decodedToken.role === 'instructor') {
      setAuthorized(true);
    }
  }, []);

  return authorized ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
