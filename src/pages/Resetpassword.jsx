import { Alert, Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

function ResetPassword(){

    const [password,setPassword] = useState('');
    const [confirmpass,setConfirmpass] = useState('');
    const [showpassword,setShowpassword] = useState(false);
    const [showconpassword,setShowconpassword] = useState(false);
    const [msg,setMSG] = useState('');
    const [errmsg,setErrmsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const querryparam = new URLSearchParams(location.search);
    const token = querryparam.get('token');

    function handleSubmit(e){
        e.preventDefault();

        if(password!==confirmpass){
            setErrmsg("password does not match");
            setMSG("");
            return;
        }

        axios.put(`http://tms-backend-production-f4d1.up.railway.app/api/password/reset?token=${token}&password=${password}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            setMSG(response.data);
            setErrmsg("");
            setTimeout(() => {
                navigate('/login')
            }, 3000);
        }).catch(error => {
            setErrmsg(error.response.data);
            setMSG("");
            console.log(error);
        })
    }

    return (<Container maxWidth="xs" style={{ marginTop: '100px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Box sx={{
            m:4,
        }}>
            <Typography variant="h5" gutterBottom>
                Reset Your Password
            </Typography>

            {msg && <Alert severity="success" sx={{mt:2}} >{msg}</Alert>}
            {errmsg && <Alert severity="error" sx={{mt:2}}>{errmsg}</Alert>}

            <Box component="form" onSubmit={handleSubmit} sx={{mt:3}} >
                <TextField
                    label="new Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    type={showpassword?"text":"password"}
                    InputProps={{
                            endAdornment: (
                            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                                {showpassword ? <VisibilityOffIcon onClick={()=>setShowpassword(!showpassword)} /> : <VisibilityIcon onClick={()=>setShowpassword(!showpassword)} />}
                            </InputAdornment>
                        ),
                    }}
                 />
                 <TextField
                    label="Confirm Password"
                    value={confirmpass}
                    onChange={(e)=> setConfirmpass(e.target.value)}
                    margin="normal"
                    required
                    fullWidth
                    type={showconpassword?"text":"password"}
                    InputProps={{
                            endAdornment: (
                            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                                {showconpassword ? <VisibilityOffIcon onClick={()=>setShowconpassword(!showconpassword)} /> : <VisibilityIcon onClick={()=>setShowconpassword(!showconpassword)} />}
                            </InputAdornment>
                        ),
                    }}
                 />
                 <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{mt:2}}
                 >Reset Password</Button>
            </Box>
        </Box>
    </Container>);

}

export default ResetPassword;