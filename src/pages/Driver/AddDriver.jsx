import { Box, Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";



function AddDriver(){

    const navigate = useNavigate();
    const [driver,setDriver] = useState({
        firstname:'',
        lastname:'',
        phone :'',
        gender:'',
        age:'',
        // Dob:null,
        email:'',
        username:'', 
        password:'',
    });

    const genders = ['Male','Female'];

    function handleChange(e){
        const {name , value} = e.target;
        setDriver({
            ...driver,
            [name]:value
          }
        );
    }

    // function handleDateChange(date) {
    // setDriver({
    //   ...driver,
    //   Dob: date
    // });
// }


    function handleSubmit(e){
        e.preventDefault();

        // const formattedDriver = {
        //   ...driver,
        //   Dob: driver.Dob ? dayjs(driver.Dob).format('YYYY-MM-DD') : null
        // };

        fetch('http://localhost:8080/api/driver/register',{
            method:'POST',
            headers:{
                 // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(driver),
        }).then(response => {
            if(!response.ok){
                throw new Error("Network response Error");
            }
            return response.text();
        }).then(data => {
            console.log((data));
            setDriver({
                firstname:'',
                lastname:'',
                phone :'',
                gender:'',
                age:'',
                Dob:null,
                email:'',
                username:'',
                password:'',
            })
            alert("Driver Added Successfully!");
            navigate("/drivers");
        }).catch(error => {
            console.error(error);
        })
    }

    return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New driver
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="firstname"
            name='firstname'
            variant="outlined"
            value={driver.firstname}
            onChange={handleChange}
            required
          />
          <TextField
            label="lastname"
            variant="outlined"
            name='lastname'
            value={driver.lastname}
            onChange={handleChange}
            required
          />
          <TextField
            label="phone"
            name='phone'
            variant="outlined"
            value={driver.phone}
            onChange={handleChange}
            required
          />
          <Select
            name="gender"
            value={driver.gender}
            onChange={handleChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>Select Gender</MenuItem>
            {genders.map((gender, index) => (
              <MenuItem key={index} value={gender}>{gender}</MenuItem>
            ))}
          </Select>

          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={driver.Dob}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} required />}
            />
          </LocalizationProvider> */}
          <TextField
            label="age"
            name='age'
            variant="outlined"
            value={driver.age}
            onChange={handleChange}
            required
          />
          <TextField
            label="email"
            name='email'
            variant="outlined"
            value={driver.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="username"
            name='username'
            variant="outlined"
            value={driver.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="password"
            name='password'
            variant="outlined"
            value={driver.password}
            onChange={handleChange}
            required
          />
          
          <Button variant="contained" color="primary" type="submit">
            Add driver
          </Button>
        </Box>
      </form>
    </Container>)

}

export default AddDriver;