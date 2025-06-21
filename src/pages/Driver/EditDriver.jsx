import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function EditDriver() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [msg,setMsg] = useState("");
  const [errmsg,setErrmsg] = useState("")
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState("firstname");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://tms-backend-production-f4d1.up.railway.app/api/driver/update/${id}`, {
      method: "GET",
      headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response Error");
        return response.json();
      })
      .then((data) => {
        setDriver(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  function handleFieldChange(e) {
    setSelectedField(e.target.value);
  }

  function handleValueChange(e) {
    const { value } = e.target;
    setDriver((prev) => ({
      ...prev,
      [selectedField]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.put('http://tms-backend-production-f4d1.up.railway.app/api/driver/update',driver,{
      headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
      }
    }).then(response =>{
      setMsg(response.data);
      setErrmsg("")
      setTimeout(() => {
        navigate('/drivers')
      }, 3000);
    }).catch(error =>{
      console.log(error);
      setMsg("")
      setErrmsg(error.response.data);
    })
  }

  return loading ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Edit Driver Field
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Dropdown to select a property */}
          <Select
            name="property"
            value={selectedField}
            onChange={handleFieldChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="firstname">First Name</MenuItem>
            <MenuItem value="lastname">Last Name</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
            <MenuItem value="email">E-mail</MenuItem>
            <MenuItem value="age">Age</MenuItem>
            <MenuItem value="username">Username</MenuItem>
          </Select>

          {/* Field to edit the selected property */}
          <TextField
            label={`Edit ${selectedField}`}
            name={selectedField}
            value={driver[selectedField] || ""}
            onChange={handleValueChange}
            fullWidth
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Update Driver
          </Button>
          {msg && <Alert severity="success" sx={{mt:2}} >{msg}</Alert>}
          {errmsg && <Alert severity="error" sx={{mt:2}} >{errmsg}</Alert>}
        </Box>
      </Paper>
    </Container>
  );
}

export default EditDriver;
