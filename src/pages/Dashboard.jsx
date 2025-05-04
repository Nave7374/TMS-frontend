import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Transport Management System Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        
        {/* Vehicles Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Vehicles
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage registered vehicles.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" onClick={() => navigate('/vehicles')}>
                Go to Vehicles
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Shipments Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Shipments
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track and manage all shipment details.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="secondary" onClick={() => navigate('/shipments')}>
                Go to Shipments
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Tracking Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Live Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor live vehicle locations on the map.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="success" onClick={() => navigate('/track')}>
                Go to Tracking
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                User Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage user details.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="warning" onClick={() => navigate('/users')}>
                Go to User Details
              </Button>
            </CardActions>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Dashboard;
