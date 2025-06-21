import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Vehicles() {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errmsg,setErrmsg] = useState("");
    const [msg,setMsg] = useState("");

    // Fetch vehicles from the backend (assuming an API endpoint like /api/vehicles)
    useEffect(() => {

      axios.get('http://localhost:8080/api/vehicles', {
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        setMsg("");
        setErrmsg("");
        console.log(response);
        setVehicles(response.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setErrmsg(error.response.data);
        setMsg("");
        setTimeout(() => {
          setErrmsg("")
        }, 4000);
      });
    }, [setVehicles]);

    function handleDelete(vehicleId){
    // Handle vehicle deletion (call API)
    axios.delete(`http://localhost:8080/api/vehicles/${vehicleId}`, {
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        setMsg(response.data);
        console.log(response.data);
        setErrmsg("");
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId)); // Update state after delete
        setTimeout(() => {
          setMsg("");
        }, 4000);
      }).catch((error) => {
        console.log(error);
        setErrmsg(error.response.data);
        setMsg("");
        setTimeout(() => {
          setErrmsg("");
        }, 4000);
      });
    };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vehicle Management
      </Typography>
      {loading?<CircularProgress />:<>

      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => {navigate('/vehicles/add')}}
      >
        Add New Vehicle
      </Button>

        {msg && <Alert severity='success'>{msg}</Alert>}
        {errmsg && <Alert severity='error' >{errmsg}</Alert>}
      {/* Vehicle Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle No</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {vehicles.map((vehicle,index) => (
              <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>{vehicle.registrationNumber}</TableCell>
                <TableCell>{vehicle.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<EditIcon />} 
                    sx={{ mr: 1 }}
                    onClick={() => {navigate(`/vehicles/edit/${vehicle.id}`)}}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></>}
    </Container>
  );
}

export default Vehicles;
