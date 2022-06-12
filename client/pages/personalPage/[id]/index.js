import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Score from '../../../components/Score';
import Message from '../../../components/Message';
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';
import Logo from '../../../components/Logo';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let userList = [];
let quizList = [];
let scoreList = [];
let msgList = [];

export default function PersonalPage() {
    const router = useRouter();
    const { isUser, quizCode } = useContext(AppContext);

    // Check rendering
    const [isRenderUser, setIsRenderUser] = useState(false);
    const [isRenderQuiz, setIsRenderQuiz] = useState(false);
    const [isRenderScore, setIsRenderScore] = useState(false);
    const [isRenderMsg, setIsRenderMsg] = useState(false);

    useEffect(() => {
        // Get userlist from DB
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode };
                    })
                    userList = userListAll.filter((user) => user.quizCode == quizCode)
                    setIsRenderUser(true);
                } else {
                    alert('Failed to get users');
                }
            })

        // Get quizlist from DB
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz;
                    quizList = quizListAll.filter((quiz) => quiz.quizCode == quizCode)
                    setIsRenderQuiz(true);
                } else {
                    alert('Failed to get quizzes');
                }
            })

        // Get score data
        axios.post(DEPLOY_SERVER_URL + '/api/scores/getScore', null)
            .then(response => {
                if (response.data.success) {
                    const scoreListAll = response.data.scores.map((score) => {
                        return { quizCode: score.quizCode, nickname: score.nickname, score: score.score, quizLen: score.quizLen };
                    })
                    const scoreListFilter = scoreListAll.filter((score) => score.quizCode == quizCode)
                    scoreListFilter.sort(function compare(a, b) {
                        return b.score - a.score;
                    });
                    scoreList = scoreListFilter.slice(0, 8);
                    setIsRenderScore(true)
                }
                else {
                    alert('Failed to get scores');
                }
            })

        // Get message data
        axios.post(DEPLOY_SERVER_URL + '/api/messages/getMessage', null)
            .then(response => {
                if (response.data.success) {
                    const msgListAll = response.data.messages.map((msg) => {
                        return { quizCode: msg.quizCode, nickname: msg.nickname, message: msg.message };
                    })
                    msgList = msgListAll.filter((msg) => msg.quizCode == quizCode)
                    setIsRenderMsg(true)
                }
                else {
                    alert('Failed to get msgs');
                }
            })
    }, []);

    // Pause rendering until get data
    if (isRenderUser === false) {
        return null;
    }
    if (isRenderQuiz === false) {
        return null;
    }
    if (isRenderScore === false) {
        return null;
    }
    if (isRenderMsg === false) {
        return null;
    }

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz/[id]',
            query: { id: quizCode },
        })
    }

    console.log(scoreList, msgList)
    if (quizList.length == 0) {
        return (
            <>
                <Nav isUser={isUser} quizCode={quizCode} />
                <Container
                    component="main" 
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Logo size='0.9'></Logo>
                    <Button onClick={MakeQuiz}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5, mb: 2, backgroundColor: 'black', borderRadius: 0, fontSize: '1.3em', padding: '1em', width: '0.9'}} 
                        className='blackBtn'>
                        MAKE QUIZ
                    </Button>
                </Container>
            </>
        )
    }
    else {
        return (
            <>
                <Nav isUser={isUser} quizCode={quizCode} />
                <Container sx={{
                    width: '100%',
                    alignItems: 'center',
                }} >
                    <Box
                        sx={{
                            width: '40%',
                            p: 2,
                            minWidth: 400,
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant='h2'>Your Quiz</Typography>
                    </Box>
                    <Grid container direction="row" spacing={20} justifyContent="center" alignItems="center" >
                        <Grid item xs={5}
                            container
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}>
                            <Box
                                sx={{
                                    width: '100%',
                                    boxShadow: 12,
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
                                    {scoreList.map((score, idx) => (
                                        <Score key={idx} value={idx + 1} userName={score.nickname} score={score.score} quizLen={score.quizLen} />
                                    ))}
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
                                    boxShadow: 12,
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
                                    {msgList.map((msg, idx) => (
                                        <Message key={idx} userName={msg.nickname} comment={msg.message} quizCode={quizCode} />
                                    ))}
                                </List>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </>
        )
    }
}
