import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Score from '../components/Score';
import Message from '../components/Message';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';


export default function PersonalPage() {
    const [quizResult, setquizResult] = useState(null);
    let scoreList = [];
    let msgList = [];
    let savedCode;
    const router = useRouter();
    
    useEffect(() => {
        savedCode = sessionStorage.getItem('userCode');
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizList = response.data.quiz;
                    console.log(quizList);
                    setquizResult(quizList.filter((e) => e.quizCode == savedCode));
                    console.log('quiz', quizResult);
                } else {
                    alert('Failed to get users');
                }
            })
        if(quizResult!=[]){
            axios.post(LOCAL_SERVER_URL + '/api/scores/getScore', null)
                .then(response => {
                    if(response.data.success) {
                        // scoreList = response.data.scores
                        scoreList = response.data.scores.map((score) => {
                            return { quizCode: score.quizCode, nickname: score.nickname, score: score.score, quizLen:score.quizLen};
                        })
                        // console.log(scoreList);
                    }
                })
            axios.post(LOCAL_SERVER_URL + '/api/messages/getMessage', null)
            .then(response => {
                    if(response.data.success) {
                        msgList = response.data.messages.map((msg) => {
                            return { quizCode: msg.quizCode, nickname: msg.nickname, message: msg.message};
                        })
                        // console.log(msgList);
                    }
                })

        } 
    }, []);

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz',
        }, `/${savedCode}/makeQuiz`);
    }

    // if(quizResult===null){
    //     console.log('rerender');
    //     return null;
    // }

    if(quizResult==null || quizResult.length==0){
        console.log('sdf');
        return(
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Button onClick={MakeQuiz}>Make Your Quiz</Button>
            </Container> 
        )
    }
    else{
        console.log(quizResult);
        return(
            <Container sx={{ 
                width: '100%', 
                alignItems: 'center'}} >
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
                                bgcolor: '#fff',
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
                                bgcolor: '#fff',
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
                                    <Message key={idx} userName={msg.nickname} comment={msg.message} />
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}
