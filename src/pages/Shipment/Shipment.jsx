import { useEffect, useState } from 'react';
import { Button, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import { useNavigate } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import axios from 'axios';
import FullpageLoader from '../../components/FullPageLoader';

function ShipmentPage() {
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true);
  const [msg,setMsg] = useState("");
  const [errmsg,setErrMsg] = useState("");

  useEffect(() => {

    fetch('http://localhost:8080/api/shipments', {
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
      setShipments(data);
      setLoading(false);
    }).catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
    // Fetch the list of shipments from backend
  }, [setShipments]);

  // Handle delete shipment
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/shipments/${id}`, {
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setMsg(response.data);
      setErrMsg("");
      setShipments(shipments.filter(shipment => shipment.id !== id)); // Update state after delete
      setTimeout(()=>{
        setMsg("")
      },3000)
    }).catch((error) => {
      console.log(error);
      setErrMsg(error.response.data);
      setMsg("");
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shipments
      </Typography>

      {
        loading?<FullpageLoader />:<>
        <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => navigate('/shipments/add')}
      >
        Add New Shipment
      </Button>
      <Button
      variant='contained'
      color='primary'
      sx={{mb:3 , ml:4}}
      onClick={()=>navigate('shipmenthistory')}
      >Shipment History
      </Button>
        {msg && <Alert severity='success' sx={{mt:2}} >{msg}</Alert>}
        {errmsg && <Alert severity='error' sx={{mt:2}} >{errmsg}</Alert>}
      {shipments.length===0 ? <Typography>No Shipments Booked</Typography> : <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>VehicleNo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>{shipment.shipmentNumber}</TableCell>
                <TableCell>{shipment.origin}</TableCell>
                <TableCell>{shipment.destination}</TableCell>
                <TableCell>{shipment.status}</TableCell>
                <TableCell>{shipment.weight}</TableCell>
                <TableCell>{shipment.vehicle?shipment.vehicle.registrationNumber:<Button variant="outlined" color="success" onClick={()=>navigate(`vehicles/assign/${shipment.id}`)}>Assign</Button>}</TableCell>
                 <TableCell>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<ShareLocationIcon />}
                    onClick={() => navigate(`/shipments/track/${shipment.shipmentNumber}`)}
                  >
                    Track
                  </Button>
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
      </TableContainer></>}</>}
    </Container>
  );
}

export default ShipmentPage;