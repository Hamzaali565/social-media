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

function Login() {

    const [result, setResult] = useState("");
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [opens, setOpens] = useState(false);
    const [mtype, setMtype] = useState("")
    const [messages, setMessages] = useState("")
    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/api/v1/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            dispatch({
                type: 'USER_LOGIN',
                payload: response.data.profile
            })

            console.log("login successful");
            setResult("login successful")

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
                    >Sign-in</Typography>

                    <form onSubmit={loginHandler} className="loginForm">


                        <TextField
                            sx={{ mt: "50px" }}
                            className="TextField"
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="username"
                            placeholder="email"
                            autoComplete="username"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />


                        <br />

                        <TextField
                            sx={{ mt: "10px" }}
                            className="TextField"
                            id="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="current-password"
                            autoComplete="current-password"
                            placeholder="password"
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                        <Box sx={{display: "flex", justifyContent:"flex-end", marginTop:'10px'}}><Link to={'/forgetPassword'} >forgetPassword?</Link></Box>
                        <br />
                        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
                            <Button variant="outlined" type="submit">Sign-in</Button>
                        </Box>
                        <Box sx={{ mt: "10px" }}>
                            <Typography variant="p">Don't have an account? <Link to={`/signup`}>Signup</Link></Typography>
                        </Box>
                    </form>


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

export default Login;