import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Router from 'next/router'
import Score from '../components/Score';
import Message from '../components/Message';
import Quiz from '../components/Quiz';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let scoreList = [];
let msgList = [];

export default function LeaveMessage() {
    const router = useRouter();
    const pathname = router.pathname;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const message = {
            nickname: localStorage.getItem('nickname'),
            message: data.get('message')
        }

        console.log(message);

        axios.post(LOCAL_SERVER_URL + '/api/messages/saveMessage', message)
            .then(response => {
                if (response.data.success) {
                    console.log(`Succeed to save msg`)
                } else {
                    alert('Failed to save message')
                }
            });
        router.push('/scoreBoard');
    };

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/scores/getScore', null)
            .then(response => {
                if (response.data.success) {
                    scoreList = response.data.scores.map((score) => {
                        return { nickname: score.nickname, score: score.score, quizLen: score.quizLen };
                    })
                    console.log(scoreList);
                } else {
                    alert('Failed to get scores');
                }
            })
        axios.post(LOCAL_SERVER_URL + '/api/messages/getMessage', null)
            .then(response => {
                if (response.data.success) {
                    msgList = response.data.messages.map((msg) => {
                        return { nickname: msg.nickname, message: msg.message };
                    })
                    console.log(msgList);
                } else {
                    alert('Failed to get msgs');
                }
            })
        router.push('/leaveMessage', undefined, { shallow: true });
    }, []);


    return (
        <Box sx={{ width: '100%' }} >
            <Grid container
                spacing={10}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 5, display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <Box
                        sx={{
                            width: '40%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 400,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Quiz />
                    </Box>
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Score Board
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            {scoreList.map((score, idx) =>
                                <Score key={idx} value={idx + 1} userName={score.nickname} score={score.score} quizLen={score.quizLen} />
                            )}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                        <Typography component="h1" variant="h5">
                            Leave a Message
                        </Typography>
                        <TextField
                            margin="normal"
                            id="message"
                            name="message"
                            label="Message"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            {msgList.map((msg, idx) =>
                                <Message key={idx} userName={msg.nickname} comment={msg.message} />
                            )}
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 4, display: { xs: 'flex', md: 'none' } }}>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <Box
                        sx={{
                            width: '40%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 300,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Quiz />
                    </Box>
                </Grid>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">

                    <Box sx={{
                        width: '80%',
                        bgcolor: '#f8f8f8',
                        boxShadow: 8,
                        borderRadius: 4,
                        p: 2,
                        minWidth: 360,
                        marginTop: '5%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: { xs: 'flex', md: 'none' }
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            Score Board
                        </Typography>
                        <List sx={{ width: '80%', maxWidth: 360 }}>
                            {scoreList.map((score, idx) =>
                                <Score key={idx} value={idx + 1} userName={score.nickname} score={score.score} quizLen={score.quizLen} />
                            )}
                        </List>
                    </Box>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            width: '80%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                        <Typography component="h1" variant="h5">
                            Leave a Message
                        </Typography>
                        <TextField
                            margin="normal"
                            id="message"
                            name="message"
                            label="Message"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '80%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '8%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <List sx={{ width: '80%', maxWidth: 360 }}>
                            {msgList.map((msg, idx) =>
                                <Message key={idx} userName={msg.nickname} comment={msg.message} />
                            )}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}