import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Failed to fetch profile:', err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  function handleEdit() {
    // navigate('/profile/edit', { state: { user } });
    alert('Edit Profile functionality is not implemented yet.');
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user?.username}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Name: {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Phone: {user?.phoneNumber}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Email: {user?.email}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Role: {user?.role}
        </Typography>

        <Button sx={{ mt: 3 }} variant="contained" color="primary" onClick={handleEdit}>
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
