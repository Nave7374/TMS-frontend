import React, { useState } from 'react';
import { TextField, Button, Typography, Container, InputAdornment, InputLabel, Select, MenuItem, Alert, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

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
  const [errmsg,setErrmsg] = useState("")
  const [msg,setMsg] = useState("")

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
      setErrmsg("Password and Confirm Password do not match");
      return;
    }else if(formData.password.length < 8){
      setErrmsg("Password must be at least 8 characters long");
      return;
    }
    else submit(e); // call the async function to submit the form
  };

  function submit(e) {
    e.preventDefault();
    
      axios.post('http://tms-backend-production-f4d1.up.railway.app/api/auth/signup',formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        console.log(response.data);
        setMsg(response.data)
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
          setTimeout(()=>{
            navigate('/login'); // Redirect to home page
          },2000);
      })
      .catch((error) => {
        console.log(error);
        setErrmsg(error.response.data)
        setMsg('')
        setTimeout(()=>{
          setErrmsg("")
        },6000)
      });
  }

  return (
    <Container maxWidth="xs">
      <Typography variant='h5' align="center" sx={{mt:2}}>
        Sign Up Here
      </Typography>
        {msg && <Alert severity='success' sx={{m:2}} >{msg}</Alert>}
        {errmsg && <Alert severity='error' sx={{mt:2}} >{errmsg}</Alert>}
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
          <FormControl fullWidth margin="normal" required>
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
              {/* <MenuItem value="admin">Admin</MenuItem> */}
              <MenuItem value="user">User</MenuItem>
              {/* <MenuItem value="driver">Driver</MenuItem> */}
          </Select>
          </FormControl>
          <Button type="submit" variant="contained" style={{margin:"20px 0"}} color="primary" fullWidth>Sign Up</Button>  
        </form>
    </Container>
  );
};

export default Signup;