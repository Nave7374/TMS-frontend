import {
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

function EditDriver() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState("firstname");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/driver/update/${id}`, {
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
    fetch("http://localhost:8080/api/driver/update", {
      method: "PUT",
      headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
      },
      body: JSON.stringify(driver),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error("Network Response Error");
        return response.text();
      })
      .then((data) => {
        alert(data)
        navigate('/drivers');
      })
      .catch((error) => console.error(error));
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
        </Box>
      </Paper>
    </Container>
  );
}

export default EditDriver;
