import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useCallback } from "react";

function ShipmentTrack(){

    const {id} = useParams();

    const containerStyle = {
    width: '100%',
    height: '500px',
    };

    const defaultCenter = {
    lat: 12.9716,
    lng: 77.5946,
    };

    const [location, setLocation] = useState(null);
    const [vehicle, setVehicle] = useState(null);
    const [tracking, setTracking] = useState(false);
    const [loading, setLoading] = useState(true);
    const [intervalId, setIntervalId] = useState(null);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBJJznBv5mvYDMAiiM_UL2KottmR-X0ZhE', // Replace with your key
    });

    const fetchLocation = useCallback(() => {
  fetch(`http://localhost:8080/api/tracking/get/${id}`, {
    method: 'GET',
    headers: {
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) throw new Error('Network response Error');
      console.log(response);
      console.log(response.status);
      if (response.status === 204) {
        alert('Vehicle Location Not updated yet');
        return;
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setLocation({ lat: data.latitude, lng: data.longitude });
      setVehicle(data?.shipment?.vehicle);
      setLoading(false);
    })
    .catch(error => console.error(error));
}, [id, setLocation, setVehicle, setLoading]);  // <-- include dependencies used inside

 useEffect(()=>{
        fetchLocation();
    },[fetchLocation]);
    
  const startTracking = () => {
    fetchLocation(); // Initial
    const id = setInterval(fetchLocation, 5000); // Poll every 5 sec
    setIntervalId(id);
    setTracking(true);
  };

  const stopTracking = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTracking(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
        <Box>
          {loading || !isLoaded ? (
            <CircularProgress />
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || defaultCenter}
              zoom={15}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          )}

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h5">Vehicle Information</Typography>
            {vehicle ? (
              <>
                <Typography>Model: {vehicle.model}</Typography>
                <Typography>Make: {vehicle.make}</Typography>
                <Typography>Registration Number: {vehicle.registrationNumber}</Typography>
              </>
            ) : (
              <Typography>No vehicle data found.</Typography>
            )}
          </Box>

          <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
            {!tracking ? (
              <Button variant="contained" onClick={startTracking}>
                Start Real-Time Tracking
              </Button>
            ) : (
              <Button variant="outlined" color="error" onClick={stopTracking}>
                Stop Tracking
              </Button>
            )}
          </Box>
        </Box>
    </Box>
  );

}

export default ShipmentTrack;