import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
    const [msg,setMsg] = useState("")
    const [errmsg,setErrMsg] = useState("")

  useEffect(() => {
    fetch(`http://tms-backend-production-f4d1.up.railway.app/api/shipments/${id}`, {
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
  }, [id]);

    function handleSubmit(e) {
    e.preventDefault();
    const newShipment =  {
      ...shipment,
      status: status
    };

    axios.put(`http://tms-backend-production-f4d1.up.railway.app/api/shipments/${id}`,newShipment,{
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }}).then(response => {
        console.log(response)
        setMsg("Shipment updated successfully!");
        setErrMsg("");
        setStatus(''); // Reset form fields
        setTimeout(()=>navigate('/shipments'),3000) // Redirect to shipments list
      }).catch((error) => {
        console.log(error);
        setErrMsg(error.response.data);
        setMsg("");
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
          {msg && <Alert severity='success' sx={{mt:2}} >{msg}</Alert>}
          {errmsg && <Alert severity='error' sx={{mt:2}} >{errmsg}</Alert>}
        </Box>
      </form>
    </Container>
  );
}

export default EditShipmentForm;
