import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDriver,setIsDriver] = useState(false);
  const [isUser,setIsUser] = useState(false);
  // const token = localStorage.getItem('token');
 
  if(!user){
    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log('Stored User:', storedUser);

      setUser(storedUser);

      if (!storedUser?.role) {
        setIsDriver(true);
      } else {
        setIsUser(storedUser?.role === 'user');
      }
      if (storedUser) {
        setLoading(false);
      }
    }, 500);
}

  // useEffect(() => {

  //   fetch(`http://tms-backend-production-f4d1.up.railway.app/api/users/username/${username.username}`, {
  //     method: 'GET',
  //     headers: {
  //       // 'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }).then((response)=>{
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   }).then((data)=>{
  //     console.log(data);
  //     setUser(data);
  //     setLoading(false);
  //   }).catch((error)=>{
  //     console.error('There was a problem with the fetch operation:', error);
  //     setLoading(false);
  //   });
  //   //  Fetch user data from backend
  // }, []);

  if (loading) {
    return <CircularProgress />;
  }

  function handleEdit() {
    navigate(`/profile/edit/${user.id}`);
    // alert('Edit Profile functionality is not implemented yet.');
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
          {user.username.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Name: {isDriver? user.firstname: user.firstName} {isDriver? user.lastname:user.lastName }
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Phone: {isDriver? user.phone:user?.phoneNumber}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Email: {user.email}
        </Typography>
        {!isDriver && <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          Role: {user.role}
        </Typography>}

        {!isDriver && <Button sx={{ mt: 3 }} variant="contained" color="primary" onClick={handleEdit}>
          Edit Profile
        </Button>}

      {isUser && <>
        <Button sx={{mt:3}} variant='contained' color='primary' onClick={()=> navigate(`/booking/${user.id}`)} >Book Shipment</Button>
        <Button sx={{mt:3}} variant='contained' color='primary' onClick={()=> navigate(`/profile/mybookings/${user.id}`)} >MY Bookings</Button>
      </>}
      {isDriver && <><Button sx={{mt:3}} variant='contained' color='primary'onClick={()=>navigate(`/currentshipment/${user.id}`)}>Current Shipment</Button>
        <Button sx={{mt:3}} variant='contained' color='primary' onClick={()=>navigate(`/shipmenthistory/${user.id}`)}>Shipment History</Button></> }
      </Box>
    </Box>
  );
};

export default ProfilePage;
