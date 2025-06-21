import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVehicleForm() {
    const [vehicle , setVehicle] = useState({
        model: '',
        make:'',
        year:'',
        registrationNumber:'',
        type:''
    });
    const navigate = useNavigate();  
    const [errmsg,setErrmsg] = useState("")
    const [msg,setMsg] = useState("")

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('http://tms-backend-production-f4d1.up.railway.app/api/vehicles/add',vehicle, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
      setMsg("Vehicle Added");
      setErrmsg("")
      setVehicle({ model: '', make:'', year:'', registrationNumber:'',type:'' }); // Reset form fields
      setTimeout(() => {
        navigate('/vehicles');
      }, 4000); // Redirect to vehicles list
    }).catch((error) => {
      console.log(error);
      setErrmsg(error.response.data);
      setMsg("");
      setTimeout(() => {
        setErrmsg("");
      }, 4000);
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

      
      {msg && <Alert sx={{mb:2}} severity='success'>{msg}</Alert>}
      {errmsg && <Alert severity='error' >{errmsg}</Alert>}

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