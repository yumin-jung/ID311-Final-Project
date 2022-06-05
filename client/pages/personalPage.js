import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function PersonalPage({ match }) {
    let quizList;
    const { quizCode } = match.params;
    const router = useRouter();
    const quizResult = quizList.filter((e) => e.quizCode == quizCode);
    
    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    quizList = response.data
                    console.log(quizList);
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz',
            query: { quizCode: quizCode },
        }, `/${quizCode}/makeQuiz`);
    }

    if(!quizResult){
        return <Button onClick={MakeQuiz}>Make Your Quiz</Button>
    }
    else {
        return (
            <Typography variant='h2'>Your Quiz</Typography>
        )
    }




    return (
        <Box sx={{
            m:10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            Personal
            <Button onClick={MakeQuiz}>Make Your Quiz</Button>
        </Box>
    )
}
