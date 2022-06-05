import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function StartQuiz() {
    const router = useRouter();
    const quizCode = router.query.id;

    const sendData = () => {
        console.log('go');
        let nickname = document.getElementById('nickname').value;
        if (!nickname) return;
        localStorage.setItem("nickname", nickname);
        router.push({
            pathname: '/solveQuiz/[quizCode]',
            query: { quizCode: quizCode },
        })
    }

    const loadData = (idx, data) => {
        pass;
    }

    return (
        <Box component='Container' sx={{
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