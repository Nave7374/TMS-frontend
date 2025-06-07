import { Box, CircularProgress, rgbToHex } from "@mui/material";

function FullpageLoader(){

    return (<Box
        sx={{
            position:"fixed",
            top:0,
            left:0,
            width:'100vw',
            height:'100vh',
            backgroundColor:'rgba(225,225,225,0.8)',
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            zIndex:1300
        }}
    >
        <CircularProgress size={60} />
    </Box>);

}

export default FullpageLoader;