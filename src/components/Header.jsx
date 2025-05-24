import { useContext, useEffect } from 'react';
import { LoginContext } from '../utils/context';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';

function Header(){

  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
  const {isLogedin,setisLogedin} = useContext(LoginContext);

  function handleLogout(){
    navigate('/login');
    logout();
    localStorage.removeItem('token'); // Clear the token from local storage
    setisLogedin(false);
  };

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    setisLogedin(user ? true : false);
  },[setisLogedin]);

  function handleLogin() {
    navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        {/* Logo or App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => isLogedin && navigate('/dashboard')}>
          TMS
        </Typography>

        {/* Menu Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={()  => isLogedin && navigate('/dashboard')} >Dashboard</Button>
          <Button color="inherit" onClick={() => isLogedin && navigate('/profile')}>Profile</Button>
          {isLogedin ? <Button color="inherit" onClick={handleLogout}>Logout</Button> : <Button color="inherit" onClick={handleLogin}>Login</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
