import React, { useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

let codes = [];
const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'

export default function ShareLink() {
    const code = 'abcedf';

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    codes = response.data.quizData.map((quiz) => {
                        return quiz.quizCode;
                    })
                    console.log(codes);
                } else {
                    alert('Failed to get users');
                }
            })
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
                {code}
            </Typography>
            <Button fullWidth onClick={GoLink}>
                Share your quiz
            </Button>
        </Container>
    )
}