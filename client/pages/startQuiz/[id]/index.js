import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { AppContext } from '../../../context/AppContext';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';

export default function StartQuiz() {
    const router = useRouter();

    // Get data from context API
    const { quizCode, setQuizNickname } = useContext(AppContext);

    const handleSubmit = () => {
        const nickname = document.getElementById('nickname').value;

        // Check nickname is valid
        if (!nickname) {
            alert("Please set nickname!")
        }
        else {
            setQuizNickname(nickname);
            router.push({
                pathname: '/solveQuiz/[id]',
                query: { id: quizCode },
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ maxWidth: '444px' }}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '90%',
                margin: 'auto'
            }}>
                <Typography component="h1" variant="h5" className='bauh' style={{ fontFamily: 'BAUHS93', fontSize: '2em', marginBottom: '0.8em', width: '500px' }}>
                    NICKNAME
                </Typography>
                {<input
                    id="nickname"
                    label="Nickname"
                    placeholder="Nickname"
                />}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="unBtn unBtn2"
                >
                    START
                </button>
            </Box>
        </Container>
    )
}