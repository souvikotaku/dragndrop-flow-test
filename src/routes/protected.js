import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // replace with actual auth logic
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
