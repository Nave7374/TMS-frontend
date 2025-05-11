import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress, TextField } from '@mui/material';

function EditableProfile(){
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: '', email: '' });

  // const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/api/user', {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUser(data);
      setForm({ username: data.username, email: data.email });
      setLoading(false);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/user', {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUser(data);
      setEditMode(false);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{user.username[0]}</Avatar>

        {editMode ? (
          <>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="text" onClick={() => setEditMode(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Typography variant="h5">{user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Role: {user.role}</Typography>
            <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setEditMode(true)}>Edit Profile</Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EditableProfile;
