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
    fetch(`http://localhost:8080/api/users/username/${userData.username}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Data Saved");
    }).catch((error) => {
      console.error(error);
    });
    
  };

  const Driverlogin =(UserData) =>{
    console.log(UserData);
    fetch(`http://localhost:8080/api/driver/username/${encodeURIComponent(UserData.username)}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if(!response.ok){
        throw new Error("Network response Error");
      }
      return response.json();
    }).then(data => {
      console.log(data);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      console.log("Data Saved");
    }).catch((error) => {
      console.error(error);
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLogedin');
    navigate('/login');
  };

  const isAuthenticated = user !== null;
  const isLogedin = localStorage.getItem('isLogedin')==="true";
  const isAdmin = user&&user.role === 'admin';
  const isDriver = user&&user.role === 'driver';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated,isLogedin, isAdmin, isDriver, Driverlogin , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
