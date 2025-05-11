import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography, Button, CircularProgress, TextField } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Helper component to move map center smoothly
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

function TrackingPage() {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState([12.955261, 77.688870]);
  const [tracking, setTracking] = useState(false);
  const [showMap,setShowmap] = useState(false);
  const [shipmentid, setShipmentid] = useState(null);


  const intervalRef = useRef(null);

  useEffect(() => {
    // Initial fetch
    fetch('http://localhost:8080/api/vehicle',{
    method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`, //
          'Content-Type': 'application/json',
        }
    }).then((response)=>{
      if(!response.ok){
        throw new Error('Network Error');
      } 
      return response.json();
    }).then((data)=>{
      console.log(data);
      setVehicle(data);
      setLoading(false);
    }).catch(error =>{
      alert(error);
      console.log(error);
      setLoading(false);
    })
  }, []);

  const startRealTimeTracking = () => {
    if (intervalRef.current) return; // already tracking

    setTracking(true);

    intervalRef.current = setInterval(() => {

      fetch('http://localhost:8080/api/vehicles',{
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`, //
          'Content-Type': 'application/json',
        }
      }).then(response =>{
        console.log(response);
        if(!response.ok){
          throw new Error('Network Error');
        }
        return response.json();
      }).then(data =>{
        console.log(data);
        if(data){
          setLocation([data.location.lat , data.location.lng]);
        }
      }).catch(error=>{
        console.log(error);
      })
    }, 5000); // Fetch every 5 seconds
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTracking(false);
    }
  };

  const handleChange = (e) => {
    setShipmentid(e.target.value);
  }

  const handleSubmit = (e) => {

    fetch(`http://localhost:8080/api/vehicle/track/${shipmentid}`,{
        method: 'GET',
        headers: {
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`, //
          'Content-Type': 'application/json',
        }
      }).then(response =>{
        console.log(response);
        if(!response.ok){
          throw new Error('Network Error');
        }
        return response.json();
      }).then(data =>{
        console.log(data);
        if(data){
          setVehicle(data);
          showMap(true);
        }
      }).catch(error=>{
        alert("Enter a Valid Shipment id", error);
        console.log(error);
      })
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : ( <>{!showMap && <form onSubmit={handleSubmit} style={{ margin:'auto'}}>
          <TextField name='shipmentid' label="Enter Shipment ID" value={shipmentid} onChange={handleChange} required />
          <Button type='submit' variant="contained" color="primary" style={{marginTop:"10px"}} >Track</Button>
        </form>}
        {showMap &&
        <MapContainer center={location} zoom={13} style={{ height: '500px', width: '100%' }}>
          <ChangeView center={location} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <Marker position={location}>
            <Popup>
              Vehicle Location <br /> {vehicle?.model}
            </Popup>
          </Marker>
        </MapContainer>}</>
        )}

      {showMap &&<> <Box sx={{ marginTop: 3 }}>
        <Typography variant="h5">Vehicle Information</Typography>
        {vehicle && (
          <>
            <Typography>Model: {vehicle.model}</Typography>
            <Typography>Make: {vehicle.make}</Typography>
            <Typography>Registration Number: {vehicle.registrationNumber}</Typography>
          </>
        )}
      </Box>

      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        {!tracking ? (
          <Button variant="contained" onClick={startRealTimeTracking}>
            Start Real-Time Tracking
          </Button>
        ) : (
          <Button variant="outlined" color="error" onClick={stopTracking}>
            Stop Tracking
          </Button>
        )}
      </Box></>}
    </Box>
  );
}

export default TrackingPage;
