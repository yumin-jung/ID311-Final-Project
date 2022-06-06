import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Score from '../components/Score';
import Message from '../components/Message';
import List from '@mui/material/List'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function PersonalPage() {
    let quizResult = [];
    let scoreList = [];
    let msgList = [];
    const router = useRouter();

    useEffect(() => {
        const savedCode = sessionStorage.getItem('quizCode');
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizList = response.data.quiz;
                    quizResult = quizList.filter((e) => e.quizCode == savedCode);
                    console.log(quizResult);
                } else {
                    alert('Failed to get users');
                }
            })
        if (quizResult != []) {
            axios.post(LOCAL_SERVER_URL + '/api/scores/getScore', null)
                .then(response => {
                    if (response.data.success) {
                        scoreList = response.data.score
                        // scoreList = response.data.scores.map((score) => {
                        //     return { quizCode: score.quizCode, nickname: score.nickname, score: score.score, quizLen:score.quizLen};
                        // })
                        console.log(scoreList);
                    }
                })
            axios.post(LOCAL_SERVER_URL + '/api/messages/getMessages', null)
                .then(response => {
                    if (response.data.success) {
                        // msgList = response.data.messages.map((msg) => {
                        //     return { quizCode: msg.quizCode, nickname: msg.nickname, message: msg.message};
                        // })
                        // console.log(msgList)
                    }
                })

        }
    }, []);

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz',
        }, `/${savedCode}/makeQuiz`);
    }

    if (quizResult == []) {
        return (
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Button onClick={MakeQuiz}>Make Your Quiz</Button>
            </Container>
        )
    }
    else {
        return (
            <Box sx={{
                mt: '20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box>
                    <Typography variant='h2'>Your Quiz</Typography>
                </Box>
                <Grid container
                    spacing={10}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginTop: 5, display: { xs: 'none', md: 'flex' } }}>
                    <Grid item xs={5}
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <Box
                            sx={{
                                width: '100%',
                                borderRadius: 4,
                                p: 2,
                                minWidth: 360,
                                marginTop: '5%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            <Typography component="h1" variant="h3">
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
            </Box>
        )
    }
}
