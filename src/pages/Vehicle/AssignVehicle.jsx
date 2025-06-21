import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AssignVehicle() {
    const {id} = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const navigate = useNavigate();
    const [msg,setMsg] = useState("")
    const [errmsg,setErrmsg] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/vehicles/status/available',{
        method:'GET',
        headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    }).then(response =>{
        if(!response.ok){
            throw new Error('Network Response Error');
        }
        return response.json();
    }).then(data=>{
        console.log(data);
        setVehicles(data);
        // console.log(vehicles);
    }).catch(error => {
        console.error(error);
    })
  }, [setVehicles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
        shipmentID:id,
        vehicleID:vehicleId
    }
    axios.post('http://localhost:8080/api/vehicles/assign',parameters,{
        headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    }).then(response => {
        console.log(response);
        setMsg(response.data);
        console.log(response.data);
        setErrmsg("")
        setTimeout(() => {
          navigate('/shipments');
        }, 2000);
        // Optionally reset form or show success
    })
    .catch(error => {
      console.log(error);
      setErrmsg(error.response.data);
      setMsg("");
      setTimeout(() => {
        setErrmsg("")
      }, 6000);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Assign Vehicle to Shipment
        </Typography>

        {errmsg && <Alert severity='error' sx={{m:2}} >{errmsg}</Alert>}
        {msg && <Alert severity='success' sx={{m:2}} >{msg}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Select Shipment"
            value={id}
            margin="normal"
            required
          >
          </TextField>

          <TextField
            select
            fullWidth
            label="Select Vehicle"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            margin="normal"
            required
          >
            { vehicles ? vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                #{vehicle.id} - {vehicle.registrationNumber} - {vehicle.type}
              </MenuItem>
            )): <MenuItem key={1} value="No Vehicles Free">No Vehicles Free</MenuItem>}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Assign Vehicle
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AssignVehicle;
