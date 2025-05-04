import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
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
    axios.get(`http://localhost:8080/api/shipments/${id}`)
      .then((res) => {
        setShipment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

    function handleSubmit(e) {
    e.preventDefault();
    const newShipment =  {
      ...shipment,
      status: status
    };
    axios.put(`http://localhost:8080/api/shipments/${id}`,newShipment) 
      .then(() => {
        navigate('/shipments');
      })
      .catch((err) => {
        console.log(err);
      });
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
