import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function AssignVehicle() {
    const {id} = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const navigate = useNavigate();
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
        console.log(vehicles);
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
    fetch('http://localhost:8080/api/vehicles/assign',{
        method:'POST',
        headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(parameters)
    }).then(response => {
        if (!response.ok) {
            throw new Error("Assignment failed");
        }
        return response.text();
    })
    .then(data => {
        console.log("Assignment successful:", data);
        alert(data);
        navigate('/shipments');
        // Optionally reset form or show success
    })
    .catch(error => {
        console.error("Error during assignment:", error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Assign Vehicle to Shipment
        </Typography>

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
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                #{vehicle.id} - {vehicle.registrationNumber} - {vehicle.type}
              </MenuItem>
            ))}
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
