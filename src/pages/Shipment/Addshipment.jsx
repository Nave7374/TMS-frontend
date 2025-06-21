import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios'

function AddShipment() {

  const [shipment , setShipment] = useState({
    origin: '',
    destination: '',
    status: '',
    vehicleType: '',
    shipmentDate:null,
  });
  const [msg,setMsg] = useState("");
  const [errmsg,setErrmsg] = useState("")
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const [userid,setUserid] = useState('');

  useEffect(()=>{
    axios.get('http://tms-backend-production-f4d1.up.railway.app/api/users/filterbyname',{
      headers:{
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setUsers(response.data);
      console.log(response);
      setErrmsg("");
      setMsg("");
    }).catch(error => {
      setErrmsg(error.response.data);
      console.log(error);
      setMsg("");
      setTimeout(() => {
        setErrmsg("");
      }, 4000);
    })
  },[setUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formattedShipment = {
      ...shipment,
      shipmentDate: shipment.shipmentDate
        ? dayjs(shipment.shipmentDate).format('YYYY-MM-DD')
        : null,
    };

    axios.post(`http://tms-backend-production-f4d1.up.railway.app/api/shipments/book/${userid}`,formattedShipment,{
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      }
    }).then(response => {
      console.log(response);
      setMsg("Shipment added successfully!");
      setErrmsg("")
      setShipment({ origin: '', destination: '', status: '', vehicleType: '', shipmentDate:null }); // Reset form fields
      setTimeout(()=>navigate('/shipments'),3000) // Redirect to shipments list)
    }).catch(error => {
      setErrmsg(error.response.data);
      setMsg("");
      console.log(error);
    })
  };

  function handleDateChange(newDate){
    setShipment({
      ...shipment,
      shipmentDate:newDate
    })
  } 

  function handleChange(e) {
    const { name, value } = e.target;  
    setShipment({
      ...shipment,
      [name]: value
    });
  }

  const handleChangeforUser = (e) => {
    console.log(e);
    setUserid(e.target.value.id);
    console.log(e.target.value.id);
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Shipment
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Origin"
            name='origin'
            variant="outlined"
            value={shipment.origin}
            onChange={handleChange}
            required
          />
          <TextField
            label="Destination"
            variant="outlined"
            name='destination'
            value={shipment.destination}
            onChange={handleChange}
            required
          />
          <TextField
            label="Vehicle Type"
            name='vehicleType'
            variant="outlined"
            value={shipment.vehicleType}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Shipment Date"
              value={shipment.shipmentDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} required />}
            />
          </LocalizationProvider>
          <TextField
            label="Status"
            name='status'
            variant="outlined"
            value={shipment.status}
            onChange={handleChange}
            required
          />
          <Select
            labelId='select-user'
            name='user'
            value={userid}
            label="Select User"
            onChange={handleChangeforUser}
            required
          >
            {users.map((item,index)=>{
                return (<MenuItem key={index} value={item} >{item.firstName} - {item.phoneNumber} - {item.email}</MenuItem>)
            })}
          </Select>
          <Button variant="contained" color="primary" type="submit">
            Add Shipment
          </Button>
          {msg && <Alert severity="success" sx={{mt:2}} >{msg}</Alert>}
          {errmsg && <Alert severity="error" sx={{mt:2}} >{errmsg}</Alert>}
        </Box>
      </form>
    </Container>
  );
}

export default AddShipment;


// private String shipmentNumber;
// private String origin;
// private String destination;
// private String status;  e.g., 'in transit', 'delivered', etc.