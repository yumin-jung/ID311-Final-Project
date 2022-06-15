import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';
import BauIcon from '../../../components/BauIcon';
import Box from '@mui/material/Box'

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

let FilteredSolvers;
let userList = [];
let quizList;


export default function LeaveMessage() {
    let patterns = new Array(12).fill().map((e) => Math.floor(Math.random() * 5));
    const router = useRouter();
    const { quizNickname, score } = useContext(AppContext);
    const quizCode = 'cu5k5m';
    const nickname = quizNickname;

    // Check rendering
    const [isRenderSolver, setIsRenderSolver] = useState(false);
    const [isRenderUser, setIsRenderUser] = useState(false);
    const [firstInput, setFirstInput] = useState(false);

    // Choose color and location of patterns
    const [order, setOrder] = useState(-1);
    const [formPopup, setPopup] = useState(false);

    // nickname : string, score : string ('4/13'), message : string

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const solverResult = {
            info: [{ nickname: nickname, color: Math.floor(Math.random() * 4), order: Math.floor(Math.random() * 12) }],
            quizCode: quizCode,
            message: data.get('message'),
            score: score,
            quizLen: quizList[0].quizLen
        }
        console.log(solverResult);

        axios.post(DEPLOY_SERVER_URL + '/api/solvers/saveSolver', solverResult)
            .then(response => {
                if (response.data.success) {
                    // Go to leave message page
                    router.push({
                        pathname: '/personalPage/[id]',
                        query: { id: quizCode },
                    })
                } else {
                    alert('Failed to save message')
                }
            });
    };

    // Get score and message data from DB
    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { quizCode: user.quizCode, firstName: user.firstName };
                    })
                    userList = userListAll.filter((user) => user.quizCode == quizCode);
                    console.log(userList);
                    setIsRenderUser(true);
                } else {
                    alert('Failed to get users');
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz.map((quiz) => {
                        return { quizCode: quiz.quizCode, patterns: quiz.patterns, quizLen: quiz.quizLength };
                    })
                    quizList = quizListAll.filter((quiz) => quiz.quizCode == quizCode);
                    console.log(quizList);
                    if (quizList != 0) patterns = quizList[0].patterns.reduce((acc, e) => acc.concat(e), []).filter((e, idx) => idx < 12);
                } else {
                    alert('Failed to get quizzes');
                }
            })
        axios.post(DEPLOY_SERVER_URL + '/api/solvers/getSolver', null)
            .then(response => {
                if (response.data.success) {
                    const allSolvers = response.data.solvers.map((solver) => {
                        return { quizCode: solver.quizCode, nickname: solver.info.nickname, score: solver.score, totScore: solver.quizLen, message: solver.message };
                    })
                    FilteredSolvers = allSolvers.filter((solver) => solver.quizCode == quizCode)
                    setIsRenderSolver(true);
                    // console.log(allSolvers);
                }
                else {
                    alert('Failed to get msgs');
                }
            })

    }, []);

    // Pause rendering until get data
    if (isRenderSolver === false) {
        return null;
    }
    if (isRenderUser === false) {
        return null;
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
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
            }}>{`${score}/${quizList[0].quizLen}`}</div>
            <div className="msgUsername">{userList[0].firstName}</div>
            <div>
                <div className={'msgBlock bigInput ' + (firstInput ? '' : 'hidden')}>
                    <div>
                        <div className='msgNick'>{nickname}</div>
                        <div className='msgScore'>{score + '/' + quizList[0].quizLen}</div>
                    </div>
                    <div>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{
                                width: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                display: 'flex'
                            }}>
                            <textarea
                                margin="normal"
                                id="message"
                                name="message"
                                label="Message"
                                className="msgInput"
                            />
                            <button
                                type="submit"
                                className="msgSave"
                            >
                                SAVE
                            </button>
                        </Box>
                    </div>
                </div>
                <div className='msgGrid'>
                    {patterns.map((pattern, idx) => (
                        <BauIcon key={idx} idx={idx} patternNum={pattern} rotate={(idx * 7) % 4} colorNum={(idx * 17) % 4} nickname={idx % 2 ? nickname : ''} score={score} totScore={quizList[0].quizLen} />
                    ))}
                </div>
            </div>
        </Box >
    )
}