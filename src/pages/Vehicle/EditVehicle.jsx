import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, MenuItem, Select } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function EditVehicleForm() {
      const { id } = useParams(); // Get vehicle ID from URL
       const [vehicle , setVehicle] = useState(null);
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);
      const [selectedField, setSelectedField] = useState("registrationNumber");

      useEffect(() => {

        fetch(`http://localhost:8080/api/vehicles/update/${id}`, {
          method: 'GET',
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        }).then((data) => {
          console.log("Vehicle Data");
          console.log(data);
          setVehicle(data);
          setLoading(false);
        }).catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });

        // Fetch the vehicle data from the backend using the ID
      }, [setVehicle]);

    function handleSubmit(e){
    e.preventDefault();

    fetch(`http://localhost:8080/api/vehicles/${id}`, {
      method: 'PUT',
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
      alert("Vehicle updated successfully!");
      navigate('/vehicles')
    }).catch((error) => {
      console.error(error);
    });
    // Update vehicle data on the backend
  };

  function handleFieldChange(e){
    setSelectedField(e.target.value);
  }

  function handleChange(e) {
    const { value } = e.target;
    setVehicle({
      ...vehicle,
      [selectedField]: value
    });
  }

  return loading ? (<CircularProgress />) :(
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Vehicle
      </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Select
            name="property"
            value={selectedField}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="registrationNumber">Registration Number</MenuItem>
            <MenuItem value="make">Company</MenuItem>
            <MenuItem value="model">Model</MenuItem>
            <MenuItem value="type">Vehicle Type</MenuItem>
            <MenuItem value="year"> made Year</MenuItem>
            <MenuItem value="status">Vehicle Status</MenuItem>
          </Select>
          <TextField
            label={`Edit ${selectedField}`}
            variant="outlined"
            name={selectedField}
            value={vehicle[selectedField] || ""}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Update Vehicle
          </Button>
        </Box>
    </Container>)
  ;
}

export default EditVehicleForm;
