import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function EditVehicleForm() {
      const { id } = useParams(); // Get vehicle ID from URL
       const [vehicle , setVehicle] = useState({
              model: '',
              status: '',
              company:'',
              year:'',
              registrationNumber:'',
              type:''
          });
      const navigate = useNavigate();

      useEffect(() => {

        fetch(`http://localhost:8080/api/vehicles/${id}`, {
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
          console.log("Vehicle Data");
          console.log(data);
          setVehicle(data);
        }).catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });

        // Fetch the vehicle data from the backend using the ID
      }, [id]);

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
      setVehicle({ model: '', status: '', company:'', year:'', registrationNumber:'',type:'' }); // Reset form fields
      navigate('/vehicles')
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
    // Update vehicle data on the backend
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
        Edit Vehicle
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
            label="Status"
            variant="outlined"
            name="status"
            value={vehicle.status}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Update Vehicle
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditVehicleForm;
