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
      fetch(`http://localhost:8080/api/password/forgot-password/${email.trim()}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      }).then(response => {
        if(!response.ok){
            throw new Error('Network response error');
        }
        return response.text();
      }).then(data => {
        setLoading(false);
        setSuccessMsg( data);
        setErrorMsg('');
      }).catch(error => {
        setLoading(false);
        setErrorMsg(error);
        setSuccessMsg('');
        console.error(error);
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
