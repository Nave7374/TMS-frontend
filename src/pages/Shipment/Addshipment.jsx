import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddShipment() {

  const [shipment , setShipment] = useState({
    origin: '',
    destination: '',
    status: '',
    vehicleType: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Post new shipment data to backend
    axios.post('http://localhost:8080/api/shipments', shipment)
      .then(() => {
        navigate('/shipments'); // Redirect to shipments list
      })
      .catch((err) => {
        alert(err);
      });
  };

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