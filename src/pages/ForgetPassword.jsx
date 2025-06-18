import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Paper
} from '@mui/material';
import FullpageLoader from '../components/FullPageLoader';
import axios from 'axios';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMsg('Email is required');
      setSuccessMsg('');
      return;
    }
    setLoading(true);
    
    axios.post(`http://localhost:8080/api/password/forgot-password/${email.trim()}`,{
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      setLoading(false);
      setSuccessMsg(response.data);
      setErrorMsg("");
    }).catch(error => {
      setErrorMsg(error.response.data);
      setLoading(false);
      console.log(error);
      setSuccessMsg("");
    })
  };

  return <>
    {loading && <FullpageLoader />}
      <Container maxWidth="sm">    
        <Paper elevation={3} sx={{ padding: 4, marginTop: 10 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Forgot Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Registered Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Send Reset Link
            </Button>

            {successMsg && (
              <Alert severity="success" sx={{ mt: 3 }}>
                {successMsg}
              </Alert>
            )}
            {errorMsg && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {errorMsg}
              </Alert>
            )}
          </Box>
        </Paper>
      </Container>
    </>
};

export default ForgotPassword;
