import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress, MenuItem, Select, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditVehicleForm() {
      const { id } = useParams(); // Get vehicle ID from URL
       const [vehicle , setVehicle] = useState(null);
      const navigate = useNavigate();
      const [loading, setLoading] = useState(true);
      const [selectedField, setSelectedField] = useState("registrationNumber");
      const [errmsg,setErrmsg] = useState("")
      const [msg,setMsg] = useState("")

      useEffect(() => {

        axios.get(`http://tms-backend-production-f4d1.up.railway.app/api/vehicles/update/${id}`, {
          headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          console.log("Vehicle Data");
          console.log(response);
          setVehicle(response.data);
          setErrmsg("");
          setMsg("");
          setLoading(false);
        }).catch((error) => {
          console.log(error);
          setErrmsg(error.response.data);
          setMsg("");
          setTimeout(() => {
            setErrmsg("");
          }, 4000);
        });

        // Fetch the vehicle data from the backend using the ID
      }, [id]);

    function handleSubmit(e){
    e.preventDefault();

    axios.put(`http://tms-backend-production-f4d1.up.railway.app/api/vehicles/${id}`,vehicle, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      setMsg(response.data);
      setErrmsg("");
      setTimeout(() => {
        navigate('/vehicles');
      }, 4000);
    }).catch((error) => {
      console.log(error);
      setMsg("");
      setErrmsg(error.response.data);
      setTimeout(() => {
        setErrmsg("");
      }, 4000);
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
      
        {msg && <Alert severity='success'>{msg}</Alert>}
        {errmsg && <Alert severity='error' >{errmsg}</Alert>}
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
