import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';


const MyBookings = () => {

  const {id} = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipmenthistory , setShipmenthistory] = useState([]);
  const [shipmenthistoryloading,setShipmenthistoryloading] = useState(true);

  useEffect(() => {
    
    fetch(`http://localhost:8080/api/shipments/user/${id}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
        // const filtered = data.filter(item => typeof item === 'object' && item.shipmentNumber);
        // console.log(filtered);
        // setBookings(filtered);
      console.log(data);
      data.forEach((item, i) => console.log(i, typeof item, item));
      const newdata = data;
      setBookings(newdata);
      console.log(newdata);
      // console.log(bookings);
      setLoading(false);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    });
  },[id]);

  useEffect(()=>{
    fetch(`http://localhost:8080/api/users/shipmenthistory/${id}`,{
      method:'GET',
      headers:{
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      // console.log(response);
      if(!response.ok){
        throw new Error("Network response error");
      }
      return response.json();
    }).then(data => {
      const update = data;
      setShipmenthistoryloading(false);
      console.log("Shipmenthistory");
      setShipmenthistory(update);
      console.log(update);
      // console.log("Update");
      // console.log(shipmenthistory);
      // console.log(shipmenthistory);
      // console.log("Updated Shipmenthistory");
    }).catch(error => {
      console.error(error)
      setShipmenthistoryloading(false);
  });
  },[id])

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>My Bookings</Typography>

      {loading ? 
        <CircularProgress />
       : bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings.map((booking,index)=> (
          <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Shipment ID: {booking.shipmentNumber}</Typography>
            <Typography>Origin: {booking.origin}</Typography>
            <Typography>Destination: {booking.destination}</Typography>
            <Typography>Status: {booking.status}</Typography>
            <Typography>Vehicle: {booking.vehicle?.registrationNumber || 'Not Assigned'}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => window.location.href = `/track`}
            >
              Track Shipment
            </Button>
          </Paper>
        ))
      )}
      <Typography sx={{mt:3 , mb:2}} variant='h5'>Shipment History</Typography>
      {
        !shipmenthistoryloading && shipmenthistory.map((item,index) => (
          <Paper key={index} elevation={3} sx={{p:2 , mb:2}}>
            <Typography variant='h5'>Shipment Id : {item.shipmentnumber}</Typography>
            <Typography>Origin: {item.origin}</Typography>
            <Typography>Destination: {item.destination}</Typography>
            <Typography>Date : {new Date(item.date).toLocaleDateString()}</Typography>
          </Paper>
        ))
      }
    </Box>
  );
};

export default MyBookings;