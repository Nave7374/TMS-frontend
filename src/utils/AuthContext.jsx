import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated on load (get token from localStorage)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = user !== null;

  const isAdmin = user&&user.role === 'admin';
  const isDriver = user&&user.role === 'driver';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isDriver, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
