import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Paper, Typography, TextField, Button, Box, Stack, InputAdornment, IconButton, Snackbar } from "@mui/material";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

function LoginContainer() {
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

    const [userLoginValues, setUserLoginValues] = useState({
        email: "",
        password: "",
    });
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState();
    const [isloading, setIsLoading] = useState(false);
    const [buttonState, setButtonState] = useState(false);

    const handleUserLoginValues = (event) => {
        setUserLoginValues({ ...userLoginValues, [event.target.name]: event.target.value })
    }

    const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnack(false)
    }

    const handleSigninButton = () => {
        if (!userLoginValues.email || !userLoginValues.password) {
            setSnackMsg('Enter valid details');
            setSnack(true)
        } else {
            setIsLoading(true)
            setButtonState(true)
        }
    }

    return (
        <>
            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography variant="h4" align="center">Log in</Typography>

                    <Stack gap={3}>
                        <TextField
                            type="text"
                            variant="outlined"
                            label="Email"
                            required
                            name="email"
                            onChange={handleUserLoginValues}
                        />
                        <TextField
                            type={passwordVisibility ? "password" : "text"}
                            variant="outlined"
                            label="Password"
                            required
                            name="password"
                            onChange={handleUserLoginValues}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                            {passwordVisibility ? <Visibility /> : <VisibilityOff />}
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
                        onClick={handleSigninButton}
                        disabled={buttonState}
                        startIcon={
                            isloading ? <Oval
                                height="20"
                                width="40"
                                radius="9"
                                color="white"
                                ariaLabel="loading"
                            /> : null
                        }
                    >
                        Sign in
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

export default LoginContainer;