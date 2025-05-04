import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';

function EditableProfile(){
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: '', email: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:8080/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data);
      setForm({ username: res.data.username, email: res.data.email });
      setLoading(false);
    })
    .catch((err) => {
      console.error('Failed to fetch profile:', err);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    axios.put('http://localhost:8080/api/user/update', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setEditMode(false);
    })
    .catch(err => console.error("Update failed", err));
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
