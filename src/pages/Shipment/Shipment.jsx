import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ShipmentPage() {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of shipments from backend
    axios.get('http://localhost:8080/api/shipments')
      .then((res) => {
        setShipments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle delete shipment
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/shipments/${id}`)
      .then(() => {
        setShipments(shipments.filter(shipment => shipment.id !== id)); // Update state after delete
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipments
      </Typography>

      {/* <Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 3 }}
        onClick={() => navigate('/shipments/add')}
      >
        Add New Shipment
      </Button> */}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.id}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                 <TableCell>
                  {/*<Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/shipments/edit/${shipment.id}`)}
                  >
                    Edit
                  </Button>*/}
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(shipment.id)}
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

export default ShipmentPage;