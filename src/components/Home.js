import { Box, Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GetUserDataApi } from "../services/Api";
import { Oval } from "react-loader-spinner";
import { getUserdata, logoutUser } from "../services/Local-storage";
import { isAuthenticate } from "../services/Auth";
import { Navigate } from "react-router-dom";

function HomePage() {
    const boxStyle = {
        height: "100vh",
        width: "100vw",
        backgroundColor: "#222831",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const paperStyle = {
        height: '40vh',
        width: '50vw',
        padding: '60px 20px',
        backgroundColor: '#EEEEEE',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

    console.log(process.env);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        userId: "",
        userCreatedAt: "",
    });
    const [loginState, setLoginState] = useState(true);

    const convertTimestamp = (timeStamp) => {
        const date = new Date(parseInt(timeStamp));
        return date.toLocaleString();
    }

    const handleLogoutButton = () => {
        logoutUser(getUserdata());
        setLoginState(false)
    }

    useEffect(() => {
        GetUserDataApi().then((response) => {
            setUserData({
                name: response.data.users[0].displayName,
                email: response.data.users[0].email,
                userId: response.data.users[0].localId,
                userCreatedAt: convertTimestamp(response.data.users[0].createdAt),
            })
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    if (!loginState) {
        return (
            <>
                <Box sx={boxStyle}>
                    <Box textAlign="center">
                        <Button
                            sx={{ marginBottom: '15px'}}
                            variant="contained"
                            color="success"
                            href="/login"
                        >Login</Button>
                        <Button
                            sx={{ display: 'block' }}
                            variant="contained"
                            color="success"
                            href="/register"
                        >Register</Button>
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <>
            <Box sx={boxStyle}>
                <Paper sx={paperStyle}>
                    <Typography mb={5} variant="h3" >DASHBOARD</Typography>
                    {userData.name && userData.email && userData.userId ?
                        <Typography mb={5}>
                            User Name : {userData.name}
                            <br />
                            User Email : {userData.email}
                            <br />
                            User Localid : {userData.userId}
                            <br />
                            Created At : {userData.userCreatedAt}
                        </Typography>
                        : <Box mb={5}>
                            <Oval
                                height="20"
                                width="40"
                                radius="9"
                                color="black"
                                ariaLabel="loading"
                            />
                        </Box>
                    }
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogoutButton}
                    >
                        Logout
                    </Button>
                </Paper>
            </Box>
        </>
    )

}

export default HomePage;