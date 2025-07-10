import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

 const ProtectedRoute = ({ children, blockCompany = false }) => {
  const location = useLocation();

  const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const isAuthenticated = () => {
    const token = getToken();
    const user = getUser();
    return !!(token && user);
  };

  const getUserRole = () => {
    const user = getUser();
    return user?.role || null;
  };

  if (blockCompany && isAuthenticated() && getUserRole() === 'company') {
    return <Navigate to="/company_dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
