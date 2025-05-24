import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function Vehicles() {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading,setLoading] = useState(true);

    // Fetch vehicles from the backend (assuming an API endpoint like /api/vehicles)
    useEffect(() => {

      fetch('http://localhost:8080/api/vehicles', {
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
        console.log(data);
        const sortedData = data.sort((a, b) => a.id - b.id);
        console.log(sortedData);
        setVehicles(sortedData);
        setLoading(false);
      }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }, []);

    function handleDelete(vehicleId){
    // Handle vehicle deletion (call API)
      fetch(`http://localhost:8080/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
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
        alert(data);
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId)); // Update state after delete
      }).catch((error) => {
        console.error( error);
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
              {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
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
