import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Signup() {
  const [cpassword, setCpassword] = useState('');
  const [showpassword, setShowpassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  function handleChange(e){
    const {name , value} = e.target;
    if(name ==="cpassword") setCpassword(value);
    setFormData({
      ...formData,
      [name]: value
    });
  };

  function handleSubmit(e){
    if(formData.password !== cpassword){
      alert("Password and Confirm Password do not match");
      return;
    }else if(formData.password.length < 8){
      alert("Password must be at least 8 characters long");
      return;
    }
    else submit(e); // call the async function to submit the form
  };

  function submit(e) {
    e.preventDefault();
    
      fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
          setFormData({
            firstname: '',
            lastname: '',
            phonenumber: '',
            username: '',
            email: '',
            password: '',
            role: ''
          });
          setCpassword('');
          alert(data);
          if(data==='User registered successfully!') navigate('/login'); // Redirect to home page
      })
      .catch((error) => {
        console.error(error);
        alert("Signup failed");
      });
  }

  return (
    <Container maxWidth="xs">
      <Typography variant='h5' align="center" >
        Sign Up Here
      </Typography>
        <form method='POST' onSubmit={handleSubmit}>
          <TextField label="First name" onChange={handleChange} value={formData.firstname} name="firstname" fullWidth  margin="normal" type="text" required />
          <TextField label="Last name" onChange={handleChange} value={formData.lastname} name="lastname" fullWidth  margin="normal" type="text" required />
          <TextField label="E-mail" onChange={handleChange} value={formData.email} name="email" type="email" fullWidth  margin="normal" required />
          <TextField label="Phone number" onChange={handleChange} value={formData.phonenumber} name="phonenumber" type="text" fullWidth  margin="normal" required />
          <TextField label="Username" onChange={handleChange} value={formData.username} name="username" fullWidth type="text"  margin="normal" required />
          <TextField label="Password" onChange={handleChange} value={formData.password} name="password" fullWidth type={showpassword?"text":"password"}  margin="normal" required 
          InputProps={{
            endAdornment: (
            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
              {showpassword ? <VisibilityOffIcon onClick={()=>setShowpassword(!showpassword)} /> : <VisibilityIcon onClick={()=>setShowpassword(!showpassword)} />}
            </InputAdornment>
            ),
          }} />
          <TextField label="Confirm Password" onChange={handleChange} value={cpassword} name="cpassword" type={showcpassword?"text":"password"} fullWidth  margin="normal" required 
          InputProps={{
            endAdornment: (
            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
              {showcpassword ? <VisibilityOffIcon onClick={()=>setShowcpassword(!showcpassword)} /> : <VisibilityIcon onClick={()=>setShowcpassword(!showcpassword)} />}
            </InputAdornment>
            ),
          }} />
          <InputLabel id="role-label">Role</InputLabel>
          <Select fullWidth
              labelId="role-label"
              name="role"
              value={formData.role}
              label="Role"
              onChange={handleChange}
              required
              >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              {/* <MenuItem value="driver">Driver</MenuItem> */}
          </Select>
          <Button type="submit" variant="contained" style={{margin:"20px 0"}} color="primary" fullWidth>Sign Up</Button>  
        </form>
    </Container>
  );
};

export default Signup;