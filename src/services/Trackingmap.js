import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import axios from 'axios';

const TrackingMap = ({ vehicleId }) => {
  const [location, setLocation] = useState(null);
  
  // Set your Google Maps API Key here
  const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Fetch the last known location for the vehicle from the backend
        const response = await axios.get(`/api/tracking/vehicle/${vehicleId}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location', error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // Fetch location every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [vehicleId]);

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = location ? { lat: location.latitude, lng: location.longitude } : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {location && (
          <Marker position={{ lat: location.latitude, lng: location.longitude }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default TrackingMap;
