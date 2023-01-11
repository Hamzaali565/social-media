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

function ChangePassword() {

    const [result, setResult] = useState("");
    let { state, dispatch } = useContext(GlobalContext);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [opens, setOpens] = useState(false);
    const [mtype, setMtype] = useState("")
    const [messages, setMessages] = useState("")
    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.post(`${state.baseUrl}/api/v1/change-password`, {
                currentPassword: currentPassword,
                newPassword: newPassword
            }, {
                withCredentials: true
            })
            setOpens(true);
            setMtype("success")
            setMessages(response.data.message)

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
                    >Change Your Password</Typography>

                    <form onSubmit={loginHandler} className="loginForm">


                        <TextField
                            sx={{ mt: "50px" }}
                            className="TextField"
                            id="current-password"
                            label="current password"
                            variant="outlined"
                            type="password"
                            name="current password"
                            autoComplete="current password"
                            onChange={(e) => { setCurrentPassword(e.target.value) }}
                        />


                        <br />

                        <TextField
                            sx={{ mt: "10px" }}
                            className="TextField"
                            id="new-password"
                            label="New Password"
                            variant="outlined" 
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />

                        <br />
                        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
                            <Button variant="outlined" type="submit">Change Password</Button>
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

export default ChangePassword;