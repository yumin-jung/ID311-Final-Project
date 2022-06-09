import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useRouter } from 'next/router';
import { AppContext } from '../../../context/AppContext';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function SolveQuiz() {
    const router = useRouter();
    const { quizCode, quizNickname, setScore } = useContext(AppContext);

    let quizListFromDB;
    let quizFilterFromDB;

    const [quizList, setQuizList] = useState(null);
    const [thisQuiz, setQuiz] = useState(null);
    const [selected, setSelection] = useState(-1);
    const [idx, setIdx] = useState(1);
    const [quizScore, setQuizScore] = useState(0);

    const NextQuiz = () => {

        if (idx >= quizList.length) {

            const scoreInfo = {
                quizCode: quizCode,
                nickname: quizNickname,
                score: quizScore,
                quizLen: quizList.length
            };

            // Save score to DB
            axios.post(LOCAL_SERVER_URL + '/api/scores/saveScore', scoreInfo)
                .then(response => {
                    if (response.data.success) {
                        console.log(`Succeed to save score info`)
                    } else {
                        alert('Failed to save user')
                    }
                });

            // Save score in context API
            setScore(quizScore);

            // Go to leave message page
            router.push({
                pathname: '/leaveMessage/[id]',
                query: { id: quizCode },
            })
        }
        else {
            // Set next quiz
            if (selected == thisQuiz.selected) setQuizScore(quizScore + 1);
            setIdx(idx + 1);
            setQuiz(quizList[idx]);
            setSelection(-1);
        }
    }

    // Get quiz data from DB
    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    quizListFromDB = response.data.quiz
                    quizFilterFromDB = quizListFromDB
                        .filter(quiz => quiz.quizCode == quizCode)
                        .map(quiz => { return quiz.quizBundle })
                        .flat();

                    setQuizList(quizFilterFromDB);
                    setQuiz(quizFilterFromDB[0]);
                }
                else {
                    alert('Failed to get users');
                }
            })
    }, []);

    // Pause rendering until get data
    if (quizList === null) {
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