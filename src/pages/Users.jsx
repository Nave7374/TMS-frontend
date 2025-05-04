import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';

function User(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    const deleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
          await axios.delete(`http://localhost:8080/api/users/${userId}`);
          setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };

    return (
        <Box p={3}>
        <Typography variant="h4" gutterBottom>User Management</Typography>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.firstname} {user.lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default User;