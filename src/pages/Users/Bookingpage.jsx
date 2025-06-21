import React, { useState } from 'react';
import {  Box, Button, MenuItem, Select, TextField, Typography, Alert} from '@mui/material';
import { useParams } from 'react-router-dom';
import FullpageLoader from '../../components/FullPageLoader';
import axios from 'axios';


const vehicleTypes = ['Truck', 'Van', 'Mini Lorry']; // This can be fetched from backend too

function BookingPage() {

  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const [errmsg,setErrmsg] = useState("");
  const [loading,setLoading] = useState(false);
  const [shipmentdetails , setShipmentdetails] = useState({
    origin: '',
    destination: '',
    shipmentDate: '',
    vehicleType: '',
    weight: '',
  });

  // private String vehicleType;
  //   private Double weight;
  //   private String origin;
  //   private String destination;
  //   private Date shipmentDate;
	

  function handleBooking(e){
    e.preventDefault();
    setLoading(true);
    axios.post(`http://localhost:8080/api/shipments/book/${id}`,shipmentdetails, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      setLoading(false);
      setMsg("Shipment booked successfully!");
      setErrmsg("");
      setShipmentdetails({ origin: '', destination: '', shipmentDate: '', vehicleType: '', weight: '' }); // Reset form fields
      setTimeout(() => {
        setMsg("")
      }, 3000);
    }).catch((error) => {
      setLoading(false);
      console.log(error);
      setMsg("");
      setErrmsg("Error booking shipment", error.response.data );
      setTimeout(() => {
        setErrmsg("")
      }, 3000);
    });
    // Post new shipment data to backend
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setShipmentdetails({
      ...shipmentdetails,
      [name]: value
    });
  }

  return (<>
  {loading && <FullpageLoader />}
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
        fullWidth displayEmpty name="vehicleType" value={shipmentdetails.vehicleType} onChange={handleChange}
        sx={{ mt: 2 }} required
      >
        <MenuItem value=""  disabled>Select Vehicle Type</MenuItem>
        {vehicleTypes.map((type, index) => (
          <MenuItem key={index}  value={type}>{type}</MenuItem>
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
      
      {msg && <Alert severity="success" sx={{mt:2}}>{msg}</Alert>}
      {errmsg && <Alert severity='error'sx={{mt:2}}>{errmsg}</Alert>}
    </Box>
    </>
  );
}

export default BookingPage;
