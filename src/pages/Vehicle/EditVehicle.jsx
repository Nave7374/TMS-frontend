import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
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
        // Fetch the vehicle data from the backend using the ID
        axios.get(`http://localhost:8080/api/vehicles/${id}`)
          .then((res) => {
            setVehicle(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, [id]);

    function handleSubmit(e){
    e.preventDefault();
    // Update vehicle data on the backend
    axios.put(`http://localhost:8080/api/vehicles/${id}`, vehicle)
      .then(() => {
        navigate('/vehicles'); // Redirect to vehicles list
      })
      .catch(err => {
        console.log(err);
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
