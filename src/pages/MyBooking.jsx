import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';


const MyBookings = () => {

  const {id} = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch(`http://localhost:8080/api/shipments/user/${id}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
      console.log(data);
      setBookings(data);
      console.log(bookings);
      
      setLoading(false);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    });
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>

      {loading ? (
        <CircularProgress />
      ) : bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings.map((booking,index)=> (
          <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Shipment ID: {booking.shipmentNumber}</Typography>
            <Typography>Origin: {booking.origin}</Typography>
            <Typography>Destination: {booking.destination}</Typography>
            <Typography>Status: {booking.status}</Typography>
            <Typography>Vehicle: {booking.vehicle?.registrationNumber || 'Not Assigned'}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => window.location.href = `/track`}
            >
              Track Shipment
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyBookings;