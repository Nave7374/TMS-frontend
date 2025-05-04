import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // assuming userId is stored in localStorage
    axios.get(`http://localhost:8080/api/bookings/user/${userId}`)
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
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
        bookings.map((booking) => (
          <Paper key={booking.id} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Shipment ID: {booking.shipmentId}</Typography>
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