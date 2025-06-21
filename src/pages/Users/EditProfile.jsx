import React, { useEffect, useState } from 'react';
import { Box, Avatar, Button, CircularProgress, TextField, Select, MenuItem, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProfile(){

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {id} = useParams();
  const [msg,setMsg] =useState("")
  const [errmsg,setErrMsg] = useState("")
  const [selectedField,setSelectedField] = useState('firstName');

  // const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://tms-backend-production-f4d1.up.railway.app/api/users/update/${id}`, {
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
    axios.put(`http://tms-backend-production-f4d1.up.railway.app/api/users/update/${id}`,user, {
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      setMsg("User Details Updated");
      console.log(response);
      setErrMsg("")
      localStorage.setItem('user',JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      setErrMsg(error.response.data);
      setMsg("")
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
      {msg && <Alert severity='success' sx={{m:2}} >{msg}</Alert>}
      {errmsg && <Alert severity='error' sx={{m:2}} >{errmsg}</Alert>}
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
