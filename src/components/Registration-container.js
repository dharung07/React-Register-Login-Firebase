import { useState } from "react";
import { Paper, Typography, TextField, Button, Stack, InputAdornment, IconButton, Snackbar, Box } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Oval } from 'react-loader-spinner';
import { RegisterApi } from "../services/Api";
import { storeId } from "../services/Local-storage";
import { isAuthenticate } from "../services/Auth";
import { Navigate } from "react-router-dom";

function RegistrationContainer() {
    const boxStyle = {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#222831",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const paperStyle = {
        height: '70vh',
        width: '30vw',
        padding: '30px 20px',
        backgroundColor: '#EEEEEE',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }

    const customButtonStyle = {
        backgroundColor: "#222831",
        color: '#EEEEEE',
        '&:hover': {
            backgroundColor: '#EEEEEE',
        },
    }

    const [userValues, setUserValues] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState();
    const [isloading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const handleUserValues = (event) => {
        setUserValues({ ...userValues, [event.target.name]: event.target.value })
    }

    const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnack(false)
    }

    const regButton = () => {
        if (!userValues.name || !userValues.email || !userValues.password) {
            setSnackMsg('Enter valid details')
            setSnack(true)
        } else {
            setButtonState(true)
            setIsLoading(true)
        }

        RegisterApi(userValues).then((response) => {
            storeId(response.data.idToken);
        }).catch((error) => {
            console.log(error);
            if (error.response.data.error.message === "EMAIL_EXISTS") {
                setSnackMsg('User already exist');
                setSnack(true);
            }
            if (String(error.response.data.error.message).includes('WEAK_PASSWORD')) {
                setSnackMsg('Password should be at least 6 characters');
                setSnack(true);
            }
        }).finally(() => {
            setIsLoading(false)
            setButtonState(false)
        })
    }

    if (isAuthenticate()) {
        return <Navigate to="/" />
    }

    return (
        <>
            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography variant="h4" align="center">Register</Typography>

                    <Stack gap={3}>
                        <TextField
                            name="name"
                            type="text"
                            variant="outlined"
                            label="Name"
                            required
                            onChange={handleUserValues}
                            error={!userValues.name}
                        />
                        <TextField
                            name="email"
                            type="text"
                            variant="outlined"
                            label="Email"
                            required
                            onChange={handleUserValues}
                            error={!userValues.email}
                        />
                        <TextField
                            name="password"
                            type={passwordVisibility ? "password" : "text"}
                            variant="outlined"
                            label="Password"
                            required
                            onChange={handleUserValues}
                            error={!userValues.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => {setPasswordVisibility(!passwordVisibility)}}>
                                            {passwordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        style={customButtonStyle}
                        onClick={regButton}
                        disabled={buttonState}
                        startIcon={
                            isloading ? <Oval
                                height="20"
                                width="40"
                                radius="9"
                                color="white"
                                ariaLabel="loading"
                            /> : null}
                    >
                        Register
                    </Button>
                </Paper>
                <Snackbar
                    message={snackMsg}
                    autoHideDuration={2000}
                    open={openSnack}
                    onClose={closeSnack}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                />
            </Box>
        </>
    )
}

export default RegistrationContainer;