import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

export default function PersonalPage() {
    const router = useRouter();
    const quizCode = window.location.pathname.slice(1);

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz', 
            query: {quizCode: quizCode},
        }, `/${quizCode}/makeQuiz`);
    }

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    let quizList = response.data
                    console.log(quizList);
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);


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
