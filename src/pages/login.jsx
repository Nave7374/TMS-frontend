import React, { useContext, useState } from 'react';
import { LoginContext } from '../utils/context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {TextField , Button , Container , Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

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
      axios.post('http://localhost:8080/api/driver/login',data,{
        headers:{
          'Content-Type':'application/json',
        }
      }).then(response => {
        setisLogedin(true);
        console.log(response);
        setText(response.data);
        localStorage.setItem('isLogedin',"true");
        localStorage.setItem('token', response.data);
        Driverlogin({username,password,role}); // Call the login function from AuthContext
        navigate('/profile');
      }).catch(error => {
        setText(error.response.data);
        console.log(error);
      })
    }else{
        axios.post('http://localhost:8080/api/auth/login',data,{
          headers:{
            'Content-Type': 'application/json', 
          }
        }).then(response =>{
          setText(response.data);
          setisLogedin(true);
          localStorage.setItem('isLogedin',"true");
          localStorage.setItem('token', response.data);
          login({username,password,role}); // Call the login function from AuthContext
          console.log(response);
          role==='admin'? navigate('/dashboard') : navigate('/profile');
        }).catch(error => {
          setText(error.response.data)
          console.log(error);
        })
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
      <Typography variant="body2" sx={{mt:1}} onClick={()=>{ !isLogedin && navigate('/forgetpassword') }}>
        Forget Password? <span style={{cursor:'pointer' , color:'blue'}} > Reset password</span>
      </Typography>
    </Container>
  );

}

export default Login;




//  FOR DRIVER LOGIN

// fetch('http://localhost:8080/api/driver/login',{
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),  
      // }).then((response)=>{
      //   setStatus(response.status)
      //   if(!response.ok){
      //     throw new Error("Network response Error");
      //   }
      //   return response.text();
      // }).then(data => {
      //   console.log(data);
      //   const num = status
      //   console.log(num);
      //   if(num===400){
      //     setText(data)
      //   }
      //   else if (num===200) {
      //     localStorage.setItem('isLogedin',"true");
      //     localStorage.setItem('token', data);
      //     setText("Login Successfull");
      //     Driverlogin({username,password,role}); // Call the login function from AuthContext
      //     setisLogedin(true);
      //     navigate('/profile');
      //   } 
      //   else{
      //     setText(data);
      //   }
      // }).catch((error)=>{
      //   console.error(error);
      // });

// FOR USER OR ADMIN LOGIN

//   fetch('http://localhost:8080/api/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then((response) => {
    //   setStatus(response.status)
    //   if(response.status===400){
    //     console.log(response);
    //     return response.text();
    //   }
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   console.log(response);
    //   return response.text();
    // })
    // .then((data) => {
    //   console.log(data);
    //   console.log(status);
    //   const num = status
    //   console.log(num);
    //   if(num===400){
    //     setText(data)
    //   }
    //   else if (num===200) {
    //     localStorage.setItem('isLogedin',"true");
    //     login({username,password,role}); // Call the login function from AuthContext
    //     localStorage.setItem('token', data);
    //     setisLogedin(true);
    //     console.log("Running");
    //     setText("Login successful");
    //     role==='admin'? navigate('/dashboard') : navigate('/profile');
    //   } else {
    //     setText(data);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setText("Invalid credentials");
    // });