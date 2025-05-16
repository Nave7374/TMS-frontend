import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function AddShipment() {

  const [shipment , setShipment] = useState({
    origin: '',
    destination: '',
    status: '',
    vehicleType: '',
    shipmentDate:null
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

  
    const formattedShipment = {
      ...shipment,
      shipmentDate: shipment.shipmentDate
        ? dayjs(shipment.shipmentDate).format('YYYY-MM-DD')
        : null,
    };

    fetch('http://localhost:8080/api/shipments', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedShipment),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      alert("Shipment added successfully!");
      setShipment({ origin: '', destination: '', status: '', vehicleType: '', shipmentDate:null }); // Reset form fields
      navigate('/shipments'); // Redirect to shipments list
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      alert("Error adding shipment");
    });
    // Post new shipment data to backend
  };

  function handleDateChange(newDate){
    setShipment({
      ...shipment,
      shipmentDate:newDate
    })
  } 

  function handleChange(e) {
    const { name, value } = e.target;  
    setShipment({
      ...shipment,
      [name]: value
    });
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Shipment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Origin"
            name='origin'
            variant="outlined"
            value={shipment.origin}
            onChange={handleChange}
            required
          />
          <TextField
            label="Destination"
            variant="outlined"
            name='destination'
            value={shipment.destination}
            onChange={handleChange}
            required
          />
          <TextField
            label="Vehicle Type"
            name='vehicleType'
            variant="outlined"
            value={shipment.vehicleType}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Shipment Date"
              value={shipment.shipmentDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>
          <TextField
            label="Status"
            name='status'
            variant="outlined"
            value={shipment.status}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add Shipment
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddShipment;


// private String shipmentNumber;
// private String origin;
// private String destination;
// private String status;  e.g., 'in transit', 'delivered', etc.