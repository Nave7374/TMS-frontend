import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, CircularProgress, TextField, Select, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function EditProfile(){

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();
  const [selectedField,setSelectedField] = useState('firstName');

  // const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/update/${id}`, {
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
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/users/update/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      alert("Usr Details Updated");
      localStorage.setItem('user',JSON.stringify(data));
      navigate('/profile');
    })
    .catch((error) => {
      console.error( error);
    });
  };

  function handleFieldChange(e) {
    setSelectedField(e.target.value);
  }

  function handleValueChange(e) {
    const { value } = e.target;
    setUser((prev) => ({
      ...prev,
      [selectedField]: value,
    }));
  }


  return  loading ?( <CircularProgress />):(
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{user.username[0]}</Avatar>
        <Select
          name="property"
          value={selectedField}
          onChange={handleFieldChange}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="firstName">First Name</MenuItem>
          <MenuItem value="lastName">Last Name</MenuItem>
          <MenuItem value="phoneNumber">Phone</MenuItem>
          <MenuItem value="email">E-mail</MenuItem>
          <MenuItem value="username">Username</MenuItem>
          {/* <MenuItem value="password">Password</MenuItem> */}
        </Select>
        <TextField
          label={`Edit ${selectedField}`}
          name={selectedField}
          value={user[selectedField] || ""}
          onChange={handleValueChange}
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Update 
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
