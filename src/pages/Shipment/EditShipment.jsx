import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function EditShipmentForm() {
    const { id } = useParams();
    const [status , setStatus] = useState('');
    const [shipment, setShipment] = useState({
        shipmentNumber: '',
        origin: '',
        destination: '',
        status: ''
        });
    const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/shipments/${id}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      setShipment(data);
      setStatus(data.status); // Set the initial status from the fetched shipment data
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
    // Fetch the shipment data from the backend using the ID
  }, [setShipment]);

    function handleSubmit(e) {
    e.preventDefault();
    const newShipment =  {
      ...shipment,
      status: status
    };

    fetch(`http://localhost:8080/api/shipments/${id}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShipment),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      alert("Shipment updated successfully!");
      setStatus(''); // Reset form fields
      navigate('/shipments'); // Redirect to shipments list
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
    // Post new shipment data to backend
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Shipment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Status"
            name='status'
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value )}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Update Shipment
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditShipmentForm;
