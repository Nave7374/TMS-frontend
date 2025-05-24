import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AddVehicleForm() {
    const [vehicle , setVehicle] = useState({
        model: '',
        make:'',
        year:'',
        registrationNumber:'',
        type:''
    });
    const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:8080/api/vehicles/add', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      console.log(data);
      alert("Vehicle added successfully!");
      setVehicle({ model: '', make:'', year:'', registrationNumber:'',type:'' }); // Reset form fields
      navigate('/vehicles'); // Redirect to vehicles list
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      alert("Error adding vehicle");
    });
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setVehicle({
      ...vehicle,
      [name]: value
    });
  }


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Vehicle
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Vehicle No"
            name="registrationNumber"
            variant="outlined"
            value={vehicle.registrationNumber}
            onChange={handleChange}
            required
          />
          <TextField
            label="Model"
            name="model"
            variant="outlined"
            value={vehicle.model}
            onChange={handleChange}
            required
          />
          <TextField
            label="Year"
            variant="outlined"
            name="year"
            value={vehicle.year}
            onChange={handleChange} 
            required
          />
          <TextField
            label="Company"
            variant="outlined"
            name="make"
            value={vehicle.make}
            onChange={handleChange} 
            required
          />
          <Select name="type"  fullWidth displayEmpty value={vehicle.type} onChange={handleChange} sx={{ mt: 2 }} required>
            <MenuItem value="" disabled>Select Vehicle Type</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="Van">Van</MenuItem>
            <MenuItem value="Mini Lorry">Mini Lorry</MenuItem>
          </Select>
          <Button variant="contained" color="primary" type="submit">
            Add Vehicle
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddVehicleForm;


// private String registrationNumber;
//     private String make;
//     private String model;
//     private int year;