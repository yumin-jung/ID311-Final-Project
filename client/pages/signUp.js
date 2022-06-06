import React, { useEffect, useState } from 'react';
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

const theme = createTheme();
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'
let userList = [];
let codes = [];


export default function SignUp() {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    const router = useRouter()
    
=======
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
    const router = useRouter();

>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const characters = 'abcdefghijklmnopqrstuvwxyz';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        
        //avoid overlapped quizCode
        function makeRandomCode(){
            let codeList = new Array(6).fill();
            let randomCode = codeList.map((e)=>characters.charAt(Math.floor(Math.random()*characters.length))).join('')
            while (codes.includes(randomCode)) randomCode = codeList.map((e)=>characters.charAt(Math.floor(Math.random()*characters.length))).join('')
            return randomCode;
        }
        
=======
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a

        //avoid overlapped quizCode
        function makeRandomCode() {
            let codeList = new Array(6).fill();
            let randomCode = codeList.map((e) => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
            while (codes.includes(randomCode)) randomCode = codeList.map((e) => characters.charAt(Math.floor(Math.random() * characters.length))).join('')
            return randomCode;
        }

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
=======
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
        const userInfo = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            username: data.get('username'),
            password: data.get('password'),
            quizCode: makeRandomCode()
        };
        
        if (userList.includes(userInfo.username)) {
            alert('User already exists');
        } else {
            axios.post(LOCAL_SERVER_URL + '/api/users/saveUser', userInfo)
<<<<<<< HEAD
            .then(response => {
                if (response.data.success) {
                    console.log(`Succeed to save ${response.data.user.username}'s info`)
                    console.log(userInfo);
                } else {
                    alert('Failed to save user')
                }
            });
=======
                .then(response => {
                    if (response.data.success) {
                        console.log(`Succeed to save ${response.data.user.username}'s info`)
                        console.log(userInfo);
                    } else {
                        alert('Failed to save user')
                    }
                });
>>>>>>> 1ff74b50a864c50bec0c3e61c138bdfc81512e8a
            router.push('/signIn', undefined, { shallow: true });
        }
    };
    
    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    userList = response.data.users.map((user) => {
                        return user.username;
                    })
                    codes = response.data.users.map((user) => {
                        return user.quizCode;
                    })
                    console.log(userList);
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
                        marginTop: 8,
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
                    <Typography>Do you have an account? <Link
                        href='/signIn'
                        variant='body2'
                        underline='hover'>Sign In</Link>
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}