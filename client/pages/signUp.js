import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../components/Nav';

const theme = createTheme();
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'

let userList = [];
let codeList = [];

export default function SignUp() {
    const router = useRouter()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // Avoid overlapped quizCode
        function makeRandomCode() {
            let randomCode = Math.random().toString(36).slice(2, 8);
            while (codeList.includes(randomCode)) {
                randomCode = Math.random().toString(36).slice(2, 8);
            }
            return randomCode;
        }

        const userInfo = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            username: data.get('username'),
            password: data.get('password'),
            quizCode: makeRandomCode()
        };

        // Check userInfo is valid
        if (userList.includes(userInfo.username)) {
            alert('User already exists');
        }
        else {
            axios.post(DEPLOY_SERVER_URL + '/api/users/saveUser', userInfo)
                .then(response => {
                    if (response.data.success) {
                        console.log(`Succeed to save ${response.data.user.username}'s info`)
                        router.push('/signIn');
                    } else {
                        alert('Failed to save user')
                    }
                });
        }
    };

    // Get user data from DB
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    userList = response.data.users.map((user) => {
                        return user.username;
                    })
                    codeList = response.data.users.map((user) => {
                        return user.quizCode;
                    })
                }
                else {
                    alert('Failed to get users');
                }
            })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Nav />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '90%',
                        margin: 'auto'
                    }}
                >
                    <Typography component="h1" variant="h5" className='bauh' style={{ fontFamily: 'BAUHS93' }}>
                        SIGN UP
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                        <Grid container spacing={1.4}>
                            <Grid item xs={12} sm={6}>
                                <input
                                    required
                                    autoComplete="given-name"
                                    name="firstName"
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    className='smallIn'
                                    placeholder='First Name'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <input
                                    required
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    placeholder='Last Name'
                                    className='smallIn'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    required
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    placeholder='Username'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    required
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    placeholder='Password'
                                />
                            </Grid>
                        </Grid>
                        <button
                            type="submit"
                            className="unBtn"
                        >
                            SIGN UP
                        </button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}