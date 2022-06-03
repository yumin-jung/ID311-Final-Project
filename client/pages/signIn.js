import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MakeQuiz from '../pages/makeQuiz';

const theme = createTheme();
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let userList = [];

export default function SignIn() {
    const router = useRouter()

    useEffect(() => {
        console.log('render')
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userInfo = {
            username: data.get('username'),
            password: data.get('password')
        }

        //find user data from DB
        const savedUserInfo = userList.filter((user) => user.username==userInfo.username );

        if (savedUserInfo == false) alert('Not registered user');
        else {
            if(userInfo.password==savedUserInfo[0].password) {
                router.push({
                    pathname: '/personalPage', 
                    query: {quizCode: savedUserInfo[0].quizCode},
                }, `/${savedUserInfo[0].quizCode}`);
            }
            else alert('Incorrect password!');
        }
    };

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    userList = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode };
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}