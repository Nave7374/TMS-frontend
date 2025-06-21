import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

function User(){
    const [loading,setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    const [msg,setMsg] = useState("");
    const [errmsg , setErrMsg] = useState("");

    const fetchUsers = async () => {
          fetch('http://localhost:8080/api/users',{
            method:'GET',
      headers:{
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}` //
      }}).then((response)=>{
        if(!response.ok){
          throw new Error('Network Response Error');
        }
        return response.json();
      }).then((data)=>{
        console.log(data);
        setUsers(data);
        setLoading(false);
      })
      . catch(error=> {
          console.error('Error fetching users:', error);
        }
      )};

      
    useEffect(() => {
        fetchUsers();
    }, [setUsers]);

    function deleteUser(userId) {
      axios.delete(`http://localhost:8080/api/users/${userId}`,{
        headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
            'Content-Type': 'application/json',
        }}).then(response=>{
          setMsg(response.data);
          setUsers(users.filter(user => user.id !== userId));
          setErrMsg("")
          setTimeout(() => {
            setMsg("")
          }, 3000);
        }).catch(error =>{
          console.log(error);
          setErrMsg(error.response.data);
          setMsg("")
          setTimeout(()=>{
            setErrMsg("")
          },3000)
        })
      };

    return (
        <Box p={3}>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        <TableContainer component={Paper}>
          {errmsg && <Alert severity='error' sx={{m:2}} >{errmsg}</Alert>}
          {msg && <Alert severity='success' sx={{m:2}} >{msg}</Alert>}
          {loading?<CircularProgress />:
          <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.active?"Active":"Not Active"}</TableCell>
                    <TableCell>
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>}
        </TableContainer>
        </Box>
    );
};

export default User;