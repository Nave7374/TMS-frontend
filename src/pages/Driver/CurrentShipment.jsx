import { Alert, Box, Button, Chip, CircularProgress, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Currentshipment = ()=>{

    const [Shipment,setShipment] = useState(null);
    const [vehicle , setVehicle] = useState(null);
    const [loading,setLoading] = useState(true);
    const [driver,setDriver] = useState(null);
    const [updating,setUpdating] = useState(false);
    const [intervalId,setIntervalId] = useState(null);
    const [latitude , setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location,setLocation] = useState(null);
    const [msg,setMsg] = useState(null);
    const [errmsg,setErrmsg] = useState(null);
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        fetch(`http://tms-backend-production-f4d1.up.railway.app/api/driver/${id}`,{
            method:'GET',
            headers:{
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if(!response.ok){
                throw new Error('Network response error');
            }
            return response.json();
        }).then(data => {
            console.log("Driver Details");
            console.log(data);
            setDriver(data);
            setVehicle(data?.vehicle);
            setShipment(data?.vehicle?.shipment);
            setLoading(false);
        }).catch(error => console.error(error));
        // const driver = JSON.parse(localStorage.getItem('user'));
        // console.log(driver);
        // const vehicle = driver?.vehicle;
        // setVehicle(vehicle);
        // const shipment = vehicle?.shipment;
        // setShipment(shipment);
        // console.log(vehicle);
        // setLoading(false);
        // console.log(shipment);
        // setDriver(driver);
    },[id]);

    const depositeLocation = () => {
        if(!navigator.geolocation){
            alert('Navigator Not allowed by this Browser')
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
        
            const currentlatitude = position.coords.latitude;
            const currentlongitude = position.coords.longitude;

            setLatitude(currentlatitude);
            setLongitude(currentlongitude);

            console.log(currentlatitude);
            console.log(currentlongitude);

            fetch(`http://tms-backend-production-f4d1.up.railway.app/api/shipments/location/${Shipment?.shipmentNumber}`,{
                method:'POST',
                headers:{
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({latitude,longitude})
            }).then(response => {
                if(!response.ok){
                    throw  new Error("Network response Error");
                }
                return response.json();
            }).then(data => {
                console.log(data);
                const curr = data;
                setLocation(curr);
            }).catch(error => console.error(error))
        },(error)=>{
            console.error(error.message);
        })
    };

    const handleDelivered = ()=>{
        if(updating){
            alert("Please Stop Updating Before delivering");
            return;
        }
        axios.delete(`http://tms-backend-production-f4d1.up.railway.app/api/tracking/${location?.id}`,{
                headers:{
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                console.log(response);
                setErrmsg("");
                setMsg("Shipment Delivered");
                setTimeout(() => {
                    navigate('/profile');
                }, 4000);
        }).catch(error =>{
            console.error(error)
            setErrmsg(error.response.data);
            setMsg("");
        })
    }

    const handleUpdate = ()=>{
        depositeLocation();
        const id = setInterval(depositeLocation,7000);
        setIntervalId(id);
        setUpdating(true);
    }
    const handleStopUpdate = ()=>{
        clearInterval(intervalId);
        setUpdating(false);
    }

    return (<Box p={3}>
        <Typography variant="h4" gutterBottom>
            Current Shipment
        </Typography>

        { loading ? <CircularProgress /> : (
            driver?.vehicle?.shipment==null ? <Typography>No Current Shipment </Typography> : 
            <>
                <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h5">Vehicle No : {vehicle?.registrationNumber}</Typography>
                    <Typography variant="h6">Shipment ID : {Shipment?.shipmentNumber}</Typography>
                    <Typography variant="h6">Origin : {Shipment?.origin}</Typography>
                    <Typography variant="h6">Destination : {Shipment?.destination}</Typography>
                </Paper>
                {!updating ? 
                <Button variant="contained" onClick={handleUpdate} color="primary">UpdateLocation</Button> :
                <Button variant="outlined" color="error" onClick={handleStopUpdate}>Stop Updating</Button>}
                <br/>
                {!loading && (
                    <Chip
                        label={updating ? "Live Tracking Active" : "Tracking Stopped"}
                        color={updating ? "success" : "default"}
                        variant="outlined"
                        sx={{ mt: 2,
                            mb:2,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            px: 1.5,
                            py: 1,
                            borderRadius: "16px",
                            boxShadow: updating ? "0 0 8px rgba(0,255,0,0.4)" : "none",
                            backgroundColor: updating ? "#e6f5ea" : "#f0f0f0",
                            color: updating ? "#2e7d32" : "#555",
                         }}
                    />
                )}
                <br/>
                <Button sx={{mt:3}} disabled={updating} variant="contained" color="" onClick={handleDelivered}>Delivered</Button>
                {msg && <Alert severity="success" sx={{mt:2}} >{msg}</Alert>}
                {errmsg && <Alert severity="error" sx={{mt:2}} >{errmsg}</Alert>}
            </>
        )}
    </Box>);
}

export default Currentshipment;