import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; 


const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element {...rest} /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
