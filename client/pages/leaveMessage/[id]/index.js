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

let FilteredSolvers;
let userList = [];

export default function LeaveMessage() {
    let patterns = new Array(12).fill().map((e) => Math.floor(Math.random() * 5));
    const [bauArr, setBauArr] = useState([]);
    const router = useRouter();
    const { quizCode, quizNickname, score } = useContext(AppContext);

    // Check rendering
    const [isRenderSolver, setIsRenderSolver] = useState(false);
    const [isRenderMsg, setIsRenderMsg] = useState(false);

    // Choose color and location of patterns
    const [color, setColor] = useState(false);
    const [order, setOrder] = useState(false);
    const [formPopup, setPopup] = useState(false);


    // Get score and message data from DB
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode, firstName: user.firstName};
                    })
                    userList = userListAll.filter((user) => user.quizCode == quizCode);
                } else {
                    alert('Failed to get users');
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz.map((quiz) => {
                        return { quizCode: quiz.quizCode, patterns: quiz.patterns };
                    })
                    const quizList = quizListAll.filter((quiz) => quiz.quizCode == quizCode);
                    if(quizList!=0) patterns = quizList[0].patterns.reduce((acc,e)=>acc.concat(e),[]).filter((e,idx)=> idx<12);
                    console.log(patterns);
                } else {
                    alert('Failed to get quizzes');
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/solvers/getSolver', null)
            .then(response => {
                if (response.data.success) {
                    const allSolvers = response.data.solvers.map((solver) => {
                        return { quizCode: solver.quizCode, nickname: solver.info.nickname, score: solver.score, totScore: solver.quizLen, message: solver.message  };
                    })
                    FilteredSolvers = allSolvers.filter((solver) => solver.quizCode == quizCode)
                    setIsRenderSolver(true);
                    console.log(allSolvers);
                }
                else {
                    alert('Failed to get msgs');
                }
            })

    }, []);

    // Pause rendering until get data
    if (isRenderMsg === false) {
        return null;
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}} >
            <Nav></Nav>
            <div style={{
                fontSize: '1.25em',
                fontWeight: '600',
                position: 'absolute',
                top: '3.5em'
            }}>COLOR YOURS</div>
            <div style={{
                fontSize: '1em',
                fontWeight: '600',
                letterSpacing: '0.25em',
                position: 'absolute',
                top: '7em'
            }}>4/13</div>
            <div className="msgUsername">{userList[0].username}</div>
            <div>
                <div className='msgGrid'>
                    {patterns.map((pattern, idx) => (
                        <BauIcon key={idx} patternNum={pattern} rotate={(idx * 7) % 4} colorNum={(idx * 13) % 5} isLeavingMsg={true} resultNick='asv' resultScore='2/18' quizCode={quizCode}/>
                    ))}
                </div>
            </div>
                <div className='colorPalette someColorPicked'>
                    <div className='colorPick black'></div>
                    <div className='colorPick blue' id="picked"></div>
                    <div className='colorPick yellow'></div>
                    <div className='colorPick red'></div>
                </div>
        </Box >
    )
}