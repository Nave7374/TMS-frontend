import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Alert
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AssignDriver() {
    const {id} = useParams();
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState('');
    const [msg,setMsg] = useState("");
    const [errmsg,setErrmsg] = useState("");
    const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://tms-backend-production-f4d1.up.railway.app/api/vehicles/status/assigned',{
      headers:{
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      setVehicles(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [setVehicles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameters = {
        driverID:id,
        vehicleID:vehicleId
    }

    axios.post('http://tms-backend-production-f4d1.up.railway.app/api/vehicles/assign/driver',parameters,{
      headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      setErrmsg("");
      setMsg(response.data);
      setTimeout(()=>navigate('/drivers') ,3000);
    }).catch(error => {
      console.log(error);
      setErrmsg(error.response.data);
      setMsg("")
    })
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Assign Vehicle to Driver
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Select Driver"
            value={id}
            margin="normal"
            required
          >
          </TextField>

          <TextField
            select
            fullWidth
            label="Select Vehicle"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            margin="normal"
            required
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                #{vehicle.id} - {vehicle.registrationNumber} {vehicle.type}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            fullWidth
          >
            Assign Vehicle
          </Button>
        </form>
        {msg && <Alert severity='success' sx={{mt:2}}>{msg}</Alert>}
        {errmsg && <Alert severity='error' sx={{mt:2}} >{errmsg}</Alert>}
      </Box>
    </Container>
  );
};

export default AssignDriver;
