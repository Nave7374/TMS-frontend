import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';


const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated,isLogedin, isAdmin, isDriver } = useContext(AuthContext);
  
  if(!isLogedin){
    return <Navigate to="/login" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/profile" />;
  }

  if (requiredRole === 'driver' && !isDriver) {
    return <Navigate to="/profile" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
