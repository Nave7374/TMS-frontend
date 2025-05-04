import React, { useState } from 'react';
import {
  Box, Button, MenuItem, Select, TextField, Typography, Snackbar, Alert
} from '@mui/material';
import axios from 'axios';

const vehicleTypes = ['Truck', 'Van', 'Mini Lorry']; // This can be fetched from backend too

function BookingPage() {
  
  const [success, setSuccess] = useState(false);

  const [shipmentdetails , setShipmentdetails] = useState({
    origin: '',
    destination: '',
    shipmentDate: '',
    vehicleType: '',
    weight: '',
  });

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/bookings', shipmentdetails).then((res) => {
        console.log(res.data);
      });
      console.log('Booking successful:', response.data);
      setSuccess(true);
      // Reset form
      setShipmentdetails({
        origin: '',
        destination: '',
        shipmentDate: '',
        vehicleType: '',
        weight: ''
      });
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setShipmentdetails({
      ...shipmentdetails,
      [name]: value
    });
  }

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Book a Shipment</Typography>
      <form onSubmit={handleBooking} method='POST'>
      <TextField
        fullWidth label="Origin" margin="normal" name="origin" value={shipmentdetails.origin}
        onChange={handleChange} required
      />
      <TextField
        fullWidth label="Destination" margin="normal" name="destination" value={shipmentdetails.destination}
        onChange={handleChange} required
      />
      <TextField
        fullWidth type="date" label="Shipment Date" margin="normal" name="shipmentDate"
        InputLabelProps={{ shrink: true }}
        value={shipmentdetails.shipmentDate} onChange={handleChange} required
      />
      <Select
        fullWidth displayEmpty value={shipmentdetails.vehicleType} onChange={handleChange}
        sx={{ mt: 2 }} required
      >
        <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
        {vehicleTypes.map((type, index) => (
          <MenuItem key={index} value={type}>{type}</MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth label="Weight (kg)" margin="normal" type="number" name="weight"
        value={shipmentdetails.weight} onChange={handleChange} required
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type='submit'>
        Book Now
      </Button>
      </form>
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Shipment booked successfully!</Alert>
      </Snackbar>
    </Box>
  );
}

export default BookingPage;
