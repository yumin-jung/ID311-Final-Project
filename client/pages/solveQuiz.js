import React, { useState } from 'react';
import LoadOneQuiz from '../components/LoadOneQuiz';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function SolveQuiz() {
    const qBundle = [];
    let i = 1;
    let ss = 0;
    

    //preset questions
    qBundle.push({ question: '소영(이)가 좋아하는 색깔은?', options: ['blue', 'red', 'green'], selected: 0 });
    qBundle.push({ question: '소영(이)가 좋아하는 스포츠는?', options: ['basketball', 'running', 'badminton'], selected: 2 });
    qBundle.push({ question: '소영(이)의 나이는?', options: ['19', '21', '25'], selected: 1 });
    const quiz = qBundle[0];
    const [thisQuiz, setQuiz] = useState(quiz);

    let s = -1;
    const [selected, setSelection] = useState(s);
    const [idx, setIdx] = useState(i);
    const [score, setScore] = useState(ss);

    const NextQuiz = () =>{
        if(idx >= qBundle.length) {
            const nickname = localStorage.getItem("nickname");
            console.log(nickname, score);
            window.location.href = '/scoreBoard';
            localStorage.setItem('score', score);
        } //quizend
        console.log(qBundle);
        if(selected == thisQuiz.selected) setScore(score+1);
        setIdx(idx+1);
        setQuiz(qBundle[idx]);
        setSelection(-1);
        console.log(score);
    }

    const sendData = () => {
        console.log(qBundle);
    }

    const loadData = (idx, data) => {
        qBundle[idx] = data;
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
                <Container 
                    component="main" 
                    maxWidth="xs"
                    sx={{
                        marginBottom: 2
                    }}
                    >
                        <Box
                            sx={{
                                mt: '10%', mb:'8%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems:'center',
                            }}
                        >
                            <Typography>
                                Question {idx}
                            </Typography>
                            <Typography
                                variant="h6">
                                {thisQuiz.question}
                            </Typography>
                        </Box>
                            {thisQuiz.options.map((value,idx) => (
                                <Stack key={idx} direction="row" spacing={0} mb = "5px">
                                    <Button variant={selected == idx? "contained":"outlined"}
                                            fullWidth
                                            onClick={()=>{setSelection(idx)}}>
                                        {value}
                                    </Button>
                                </Stack>
                            ))}
                </Container>
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