import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function ShipmentHistory(){

    const [shipmenthistory,setShipmentHistory ]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:8080/api/shipments/user/shipment/history',{
            method:'GET',
            headers:{
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
        }).then(response => {
            if(!response.ok){
                throw new Error("Netwrok response Error");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setShipmentHistory(data);
        }).catch(error => console.error(error))
    },[]);

    return (<Container maxWidth="lg" sx={{mt:4}}>
        <Typography variant="h4" gutterBottom>
            Shipment History
        </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Origin</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>User Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        shipmenthistory.map((history,index)=>{
                            <TableRow key={index}>
                                <TableCell>{history.shipmentnumber}</TableCell>
                                <TableCell>{history.origin}</TableCell>
                                <TableCell>{history.destination}</TableCell>
                                <TableCell>{new Date(history.date).toLocaleDateString()}</TableCell>
                                <TableCell>{history.user.firstName+" "+history.user.lastName}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Container>);

}

export default ShipmentHistory;