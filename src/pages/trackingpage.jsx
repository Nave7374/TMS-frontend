import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Box, Typography, Button, CircularProgress, TextField } from '@mui/material';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 12.9716,
  lng: 77.5946,
};

function TrackingPage() {
  const [shipmentid, setShipmentid] = useState('');
  const [location, setLocation] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [appear, setAppear] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBJJznBv5mvYDMAiiM_UL2KottmR-X0ZhE', // Replace with your key
  });

  const fetchLocation = () => {
    fetch(`http://localhost:8080/api/tracking/get/${shipmentid}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Network response Error');
        return response.json();
      })
      .then(data => {
        console.log(data);
        setLocation({ lat: data.latitude, lng: data.longitude });
        setVehicle(data?.shipment?.vehicle);
        setLoading(false);
        setAppear(true);
      })
      .catch(error => console.error(error));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchLocation();
  };

  return (
    <Box sx={{ padding: 2 }}>
      {!appear ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Shipment Number"
            name="shipmentid"
            value={shipmentid}
            onChange={(e) => setShipmentid(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary">
            Track
          </Button>
        </form>
      ) : (
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
      )}
    </Box>
  );
}

export default TrackingPage;
