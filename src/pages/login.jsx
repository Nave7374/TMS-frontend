import React, { useContext, useState } from 'react';
import { LoginContext } from '../utils/context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {TextField , Button , Container , Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

function Login() {

  const { isLogedin ,setisLogedin} = useContext(LoginContext);
  const [showpassword,setShowpassword] = useState(false);
  const [username,setUsername ]= useState("");
  const[password,setPassword]= useState("");
  const [role , setRole] = useState("");
  const navigate = useNavigate();
  const [text,setText] = useState("");
  const { login , Driverlogin } = useContext(AuthContext);

  function handleChange(e){
    
    const {name,value} = e.target;
    setUsername((name === "username" ? value : username));
    setPassword((name === "password" ? value : password));
  }

  function handleSubmit(e){
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      role: role
    }
    if(role==="driver"){
      fetch('http://localhost:8080/api/driver/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),  
      }).then((response)=>{
        if(!response.ok){
          throw new Error("Network response Error");
        }
        return response.text();
      }).then(data => {
        console.log(data);
        if (data==='Login Successfull!') {
          Driverlogin({username,password,role}); // Call the login function from AuthContext
          localStorage.setItem('token', data);
          setisLogedin(true);
          setText("Login Successfull");
          navigate('/profile');
        } 
        else{
          setText(data);
        }
      }).catch((error)=>{
        console.error(error);
      });
    }else{
      fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      if (data==='Login successful!') {
        login({username,password,role}); // Call the login function from AuthContext
        localStorage.setItem('token', data);
        setisLogedin(true);
        console.log("Running");
        setText("Login successful");
        role==='admin'&& navigate('/dashboard');
        role==='user' && navigate('/profile');
      } else {
        setText(data);
      }
    })
    .catch((error) => {
      console.log(error);
      setText("Invalid credentials");
    });
    }
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant='h5' >Login Here</Typography>
      <form onSubmit={handleSubmit} >
        <TextField label="Username" fullWidth name="username" type="text" margin="normal" value={username} onChange={handleChange} required/>
        <TextField label="Password" fullWidth name="password" type={showpassword?"text":"password"} margin="normal" value={password} onChange={handleChange} required 
        InputProps={{
          endAdornment: (
          <InputAdornment position="end" style={{ cursor: 'pointer' }}>
            {showpassword ? <VisibilityOffIcon onClick={()=>setShowpassword(!showpassword)} /> : <VisibilityIcon onClick={()=>setShowpassword(!showpassword)} />}
          </InputAdornment>
        ),
      }} />
      <FormControl fullWidth margin="normal" required>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            name="role"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="driver">Driver</MenuItem>
          </Select>
        </FormControl>
        <Button type='submit' variant="contained" color="primary" style={{marginTop:"10px"}} fullWidth>Login</Button>
        <span style={isLogedin ? {color:"green"}:{color:"red"}} >{text}</span>
      </form>
      <Typography variant="body2" onClick={() => !isLogedin && navigate('/signup')} style={{ marginTop: '10px' }}>
        Don't have an account? <span style={{ cursor: 'pointer',color:"blue"}}>Sign Up</span>
      </Typography>
    </Container>
  );

}

export default Login;