import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';
import Nav from '../components/Nav';

const theme = createTheme();
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let userList = [];

export default function SignIn() {
    const router = useRouter()

    const { setIsUser, setQuizCode } = useContext(AppContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // Input text by user
        const userInput = {
            username: data.get('username'),
            password: data.get('password')
        }

        // Find user data in DB
        const findUserInfo = userList.filter((user) => user.username == userInput.username)[0];

        // Check input is valid
        if (findUserInfo == false) {
            alert('Not registered user');
        }
        else {
            if (userInput.password == findUserInfo.password) {
                setIsUser(true);
                setQuizCode(findUserInfo.quizCode);

                // Go to personal page
                router.push({
                    pathname: '/personalPage/[id]',
                    query: { id: findUserInfo.quizCode },
                })
            }
            else {
                alert('Incorrect password!');
            }
        }
    };

    // Get user data from DB
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    userList = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode };
                    })
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography component="h1" variant="h5" className='bauh'>
                        SIGN IN
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={1.4}>
                            <Grid item xs={12}>
                                <input
                                    margin="normal"
                                    required
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    placeholder='Username'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    margin="normal"
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder='Password'
                            />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1.4, mb: 2 }}
                            className="unBtn unBtn2"
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}