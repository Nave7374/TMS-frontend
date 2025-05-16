import { Button, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


function Driver(){

    const [drivers,setDrivers] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:8080/api/driver',{
            method:'GET',
            headers:{
                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(!response.ok){
                throw new Error("Network response Error");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setDrivers(data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
        });
    },[]);

    function handleDelete(id){
        fetch('',{
            method:'DELETE',
            headers:{
                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if(!response.ok){
                throw new Error("Network reesponse Error");
            }
            return response.text();
        }).then(data=>{
            console.log(data);
            setDrivers(drivers.filter(driver => driver.id!==id));
        }).catch(error=>{
            console.error(error);
        });
    }

    return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Driver Details
      </Typography>

      {
        loading?<CircularProgress />:<>
        <Button 
        variant="contained" 
        color="primary" 
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => navigate('/drivers/add')}
      >
        Add New Driver
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>VehicleNo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.id}</TableCell>
                <TableCell>{driver.firstname+" "+driver.lastname}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.age}</TableCell>
                <TableCell>{driver.gender}</TableCell>
                <TableCell>{driver.username}</TableCell>
                <TableCell>{driver.vehicle?driver.vehicle.registrationNumber:<Button variant="outlined" color="success" onClick={()=>navigate(`vehicles/assign/${driver.id}`)}>Assign</Button>}</TableCell>
                 <TableCell>
                  {/* <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/drivers/edit/${driver.id}`)}
                  >
                    Edit
                  </Button> */}
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(driver.id)}
                  >
                    Delete
                  </Button>
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></>}
    </Container>
    );

}

export default Driver;

// private String firstname;
// private String lastname;
// private String phone;
// private String gender;
// private Integer age;
// private Date Dob;
// private String email;
// private String username;
// private String password; 