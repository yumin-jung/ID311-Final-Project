import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { AppContext } from '../../../context/AppContext';

export default function StartQuiz() {
    const router = useRouter();

    // Get data from context API
    const { quizCode, setQuizNickname } = useContext(AppContext);

    const sendData = () => {
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    bgcolor: '#f8f8f8',
                    boxShadow: 8,
                    borderRadius: 8,
                    p: '2%',
                    minWidth: 360,
                    width: '40%',
                    marginTop: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {<TextField
                    id="nickname"
                    label="Nickname"
                    variant="outlined"
                    margin="normal"
                    sx={{
                        textAlign: 'center'
                    }}
                />}
                <Button
                    variant='contained'
                    onClick={sendData}
                > Start
                </Button>
            </Box>
        </Box>
    )
}