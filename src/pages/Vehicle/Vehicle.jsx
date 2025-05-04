import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Vehicles() {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);

    // Fetch vehicles from the backend (assuming an API endpoint like /api/vehicles)
    useEffect(() => {
    axios.get('http://localhost:8080/api/vehicles',{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}` //
      }
    })
        .then(res => {
        console.log(res);
        
        })
        .catch(err => {
        alert(err);
        });
    }, []);

    function handleDelete(vehicleId){
    // Handle vehicle deletion (call API)
    axios.delete(`http://localhost:8080/api/vehicles/${vehicleId}`)
        .then(() => {
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
        })
        .catch(err => {
        alert(err);
        });
    };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vehicle Management
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => {navigate('/vehicles/add')}}
      >
        Add New Vehicle
      </Button>

      {/* Vehicle Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle No</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.vehicleNo}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
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
      </TableContainer>
    </Container>
  );
}

export default Vehicles;
