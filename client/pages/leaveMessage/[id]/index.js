import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Score from '../../../components/Score';
import Message from '../../../components/Message';
import Quiz from '../../../components/Quiz';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';
import BauIcon from '../../../components/BauIcon';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

let filteredSolvers;

export default function LeaveMessage() {
    let patterns = new Array(12).fill().map((e) => Math.floor(Math.random() * 5));
    const router = useRouter();
    const { quizCode, quizNickname, score } = useContext(AppContext);

    // Check rendering
    const [isRenderScore, setIsRenderScore] = useState(false);
    const [isRenderMsg, setIsRenderMsg] = useState(false);

    // Choose color and location of patterns
    const [color, setColor] = useState(false);
    const [order, setOrder] = useState(false);
    const [formPopup, setPopup] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const solverResult = {
            solver: {nickname: quizNickname, color: color, order: order},
            quizCode: quizCode,
            message: data.get('message'),
            score: score,
            quizLen: 6,
        }

        axios.post(DEPLOY_SERVER_URL + '/api/solvers/saveSolver', solver)
            .then(response => {
                if (response.data.success) {
                    // Go to leave message page
                    // router.push({
                    //     pathname: '/scoreBoard/[id]',
                    //     query: { id: quizCode },
                    // })
                } else {
                    alert(`Failed to save solver's data`);
                }
            });
    };

    const PopupOpen = (event) => {
        console.log("hi");
        console.log(this.key);
    }

    // Get score and message data from DB
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/solvers/getSolver', null)
            .then(response => {
                if (response.data.success) {
                    const allSolvers = response.data.solvers.map((solver) => {
                        return { quizCode: solver.quizCode, nickname: solver.info.nickname, color: solver.info.color, order: solver.info.order, message: solver.message, score: solver.score, totScore: solver.quizLen };
                    })
                    filteredSolvers = allSolvers.filter((solver) => solver.quizCode == quizCode)
                }
                else {
                    alert('Failed to get solvers data');
                }
            }).then(() => {
                setIsRenderMsg(true);
            })
    }, []);

    // Pause rendering until get data
    if (isRenderScore === false) {
        return null;
    }
    else if (isRenderMsg === false) {
        return null;
    }

    return (
        <Box sx={{ width: '100%' }} >
            <Nav></Nav>
            <div>COLOR YOURS</div>
            <div>4/13</div>
            <div>
                <div className='msgGrid'>
                    {patterns.map((pattern, idx) => (
                        <BauIcon onClick={PopupOpen} key={idx} patternNum={pattern} rotate={(idx * 7) % 4} colorNum={(idx * 13) % 5} />
                    ))}
                </div>
            </div>
                
                {/* <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            width: '100%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                        <Typography component="h1" variant="h5">
                            Leave a Message
                        </Typography>
                        <TextField
                            margin="normal"
                            id="message"
                            name="message"
                            label="Message"
                            variant="outlined"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '5%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            {msgList.map((msg, idx) =>
                                <Message key={idx} userName={msg.nickname} comment={msg.message} quizCode={quizCode} />
                            )}
                        </List>
                    </Box>
                </Grid> */}
        </Box >
    )
}