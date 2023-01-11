import { useState, useContext } from "react";
import { GlobalContext } from '../context/Context';
import { Alert, Button, Snackbar, Stack, styled, TextField, Typography } from '@mui/material';
import axios from "axios";
import { Box, height, padding } from "@mui/system";
import { Link } from "react-router-dom";


const Cont = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
})
const FieldCont = styled(Box)({
    border: "3px solid gray",
    padding: "30px 70px 30px 70px",
    margin: "10px",
    height: "350px",
    marginBottom: "100px",
    borderRadius: "20px"


})

function ForgetPassword() {

    const [result, setResult] = useState("");
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsSentOtp, setIsSentOtp] = useState(false);
    const [otp, setOtp] = useState('');
    const [opens, setOpens] = useState(false);
    const [mtype, setMtype] = useState("")
    const [messages, setMessages] = useState("")
    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/api/v1/forget-password`, {
                email: email,
            }, {
                withCredentials: true
            })
            setOpens(true);
            setMtype("success")
            setMessages('OTP send Successfully')
            setIsSentOtp(true)

        } catch (e) {
            console.log("e: ", e);
            setOpens(true);
            setMtype("error")
            setMessages(e.response.data.message)
        }

        // e.reset();
    }
    const updatePassword = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/api/v1/forget-password-2`, {
                email: email,
                otp: otp,
                password: password
            }, {
                withCredentials: true
            })
            setOpens(true);
            setMtype("success")
            setMessages(response.data.message)
            setIsSentOtp(true)
            console.log("e: ", response);

        } catch (e) {
            console.log("e: ", e);
            setOpens(true);
            setMtype("error")
            setMessages(e.response.data.message)
        }

        // e.reset();
    }
    const handleClose = (event, reason) => {
        // e.preventDefault();
        if (reason === 'clickaway') {
            return;
        }

        setOpens(false);
    };


    return (
        <div>
            <Cont>
                <FieldCont>
                    <Typography variant="h5"
                        sx={{
                            mt: "10px",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >Forget Password</Typography>


                    {(IsSentOtp === false) ?
                        <form onSubmit={loginHandler} className="loginForm">

                            <TextField
                                sx={{ mt: "50px" }}
                                className="TextField"
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="username"
                                autoComplete="username"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <br />
                            <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
                                <Button variant="outlined" type="submit">Send OTP</Button>
                            </Box>

                        </form>
                        :
                        <form onSubmit={updatePassword}>
                            <Typography variant="h5" sx={{ mt: "50px" }}>{email} </Typography>
                            <TextField
                                sx={{ mt: "30px" }}
                                className="TextField"
                                id="otp"
                                label="OTP"
                                variant="outlined"
                                name="otp"
                                autoComplete="otp"
                                onChange={(e) => { setOtp(e.target.value) }}
                            />
                            <br />
                            <TextField
                                sx={{ mt: "20px" }}
                                className="TextField"
                                id="new-password"
                                label="New Password"
                                variant="outlined"
                                type="password"
                                name="new-password"
                                autoComplete="new-password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
                                <Button variant="outlined" type="submit">Update Password</Button>
                            </Box>

                        </form>
                    }



                    <p>{result}</p>
                </FieldCont>
            </Cont>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={opens} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={mtype} sx={{ width: '100%' }}>
                        {messages}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    )
}

export default ForgetPassword;