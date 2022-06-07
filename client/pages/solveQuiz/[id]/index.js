import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useRouter } from 'next/router';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function SolveQuiz() {
    let quizList;
    let quizFilter;
    let quizCode;

    const router = useRouter();

    if (typeof window !== 'undefined') {
        quizCode = localStorage.getItem("quizCode");
    }

    const [posts, setQuizList] = useState(null);
    const [thisQuiz, setQuiz] = useState(null);
    const [selected, setSelection] = useState(-1);
    const [idx, setIdx] = useState(1);
    const [score, setScore] = useState(0);

    const NextQuiz = () => {

        if (idx >= posts.length) {
            const nickname = localStorage.getItem("nickname");

            const scoreInfo = {
                nickname: nickname,
                score: score,
                quizLen: posts.length
            };

            axios.post(LOCAL_SERVER_URL + '/api/scores/saveScore', scoreInfo)
                .then(response => {
                    if (response.data.success) {
                        console.log(`Succeed to save score info`)
                    } else {
                        alert('Failed to save user')
                    }
                });

            localStorage.setItem('score', score);
            window.location.href = '/leaveMessage';
        } else {
            console.log(posts);
            if (selected == thisQuiz.selected) setScore(score + 1);
            setIdx(idx + 1);
            setQuiz(posts[idx]);
            setSelection(-1);
            console.log(score);
        }
    }

    const sendData = () => {
        console.log(posts);
    }

    const loadData = (idx, data) => {
        posts[idx] = data;
    }

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    quizList = response.data.quiz
                    quizFilter = quizList.filter(quiz => quiz.quizCode == quizCode).map(quiz => { return quiz.quizBundle }).flat();
                    setQuizList(quizFilter);
                    setQuiz(quizFilter[0]);
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);

    if (posts === null) {
        return null;
    }
    else if (thisQuiz === null) {
        return null;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    bgcolor: '#fff',
                    boxShadow: 8,
                    borderRadius: 5,
                    p: '2%',
                    marginTop: 20,
                    minWidth: 360,
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="main"
                    maxWidth="xs"
                    sx={{
                        marginBottom: 2
                    }}
                >
                    <Box
                        sx={{
                            mt: '10%', mb: '8%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>
                            Question {idx}
                        </Typography>
                        <Typography variant="h6">
                            {thisQuiz.question}
                        </Typography>
                    </Box>
                    {thisQuiz.options.map((value, idx) => (
                        <Stack key={idx} direction="row" spacing={0} mb="5px">
                            <Button variant={selected == idx ? "contained" : "outlined"}
                                fullWidth
                                onClick={() => { setSelection(idx) }}>
                                {value}
                            </Button>
                        </Stack>
                    ))}
                </Box>
                <Button
                    variant='contained'
                    size="small"
                    onClick={NextQuiz}
                > Next
                </Button>
            </Box>
        </Box>
    )
}