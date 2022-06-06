import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

let codes = [];
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'

export default function ShareLink() {
    const [quizCode, setquizCode] = useState(null);

    useEffect(() => {
        setquizCode(sessionStorage.getItem('userCode'));
    }, []);


    const GoLink = (event) => {
        // <Link 
        //     as={`&{userInfo.firstName}/quiz`}
        //     href={{
        //         pathname: 'makeQuiz',
        //         query: { quiz: { question: userInfo.quizCode}}
        //     }}
        // >
        // <a>{quiz.title}</a>
        // </Link>
    }

    return (
        <Container maxWidth="xs" sx={{ mt: 10 }}>
            <Typography align='center' variant='h2'>
                {quizCode}
            </Typography>
            <Button fullWidth onClick={GoLink}>
                Share your quiz
            </Button>
        </Container>
    )
}