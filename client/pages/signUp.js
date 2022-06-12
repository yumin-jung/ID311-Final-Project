import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
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
        // event.preventDefault();
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
                        console.log(userInfo);
                    } else {
                        alert('Failed to save user')
                    }
                });
            router.push('/signIn');
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Typography>
                        {`Do you have an account? `}
                        <Link
                            href='/signIn'
                            variant='body2'
                            underline='hover'>
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}