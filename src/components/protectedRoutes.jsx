import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';


const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, isAdmin, isDriver } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'driver' && !isDriver) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
