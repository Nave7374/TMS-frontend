import { CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Shipmenthistory(){

    const {id} = useParams();

    const [historys,setHistorys] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:8080/api/driver/shipmenthistory/${id}`, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if(!response.ok){
                throw new Error("network response error");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setLoading(false);
            setHistorys(data);
        }).catch(error => console.error(error))
    },[]);

    return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Driver Shipment History
      </Typography>

      {
        loading?<CircularProgress />:<>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>ShipmetID</TableCell>
              <TableCell>Date</TableCell>
              {/* <TableCell>VehicleNo</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {historys.map((item,index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.origin}</TableCell>
                <TableCell>{item.destination}</TableCell>
                <TableCell>{item.shipmentnumber}</TableCell>
                <TableCell>{item.date.substring(0,10)}</TableCell>
                {/* <TableCell>{item.vehicleno}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></>}
    </Container>)

}

export default Shipmenthistory;