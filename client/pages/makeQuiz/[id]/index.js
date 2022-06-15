import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import MakeOneQuiz from '../../../components/MakeOneQuiz';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';
import Logo from '../../../components/Logo';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'
let userList = [];
let userInfo = [];

export default function MakeQuiz() {
    const router = useRouter();
    const { isUser, quizCode } = useContext(AppContext);
    const qBundle = [];
    const [idx, setIdx] = useState(0);

    const [questionList, setquestionList] = useState(null);

    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode };
                    })
                    userInfo = userListAll.filter((user) => user.quizCode == quizCode)[0]

                    // Preset questions
                    qBundle.push({ question: `${userInfo.username}(이)가 좋아하는 색깔은?`, options: ['blue', 'red', 'green'], selected: 0 });
                    qBundle.push({ question: `${userInfo.username}(이)가 좋아하는 스포츠는?`, options: ['basketball', 'running', 'badminton'], selected: 0 });
                    qBundle.push({ question: `${userInfo.username}(이)의 나이는?`, options: ['19', '21', '25'], selected: 0 });

                    setquestionList(qBundle)
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);

    // Add question
    const AddQuestion = () => {
        let questions = [...questionList];
        questions.push({ question: `${userInfo.username}(이)의`, options: [''], selected: 0 });
        setquestionList(questions);
        setIdx(idx + 1);
    }

    // Send quiz data
    const sendData = (event) => {
        event.preventDefault();

        const quizData = {
            makerName: userInfo.username,
            quizCode: userInfo.quizCode,
            quizBundle: qBundle,
            quizLength: qBundle.length,
            //5 types of shapes -> make array
            patterns: new Array(24).fill().map((e) => Math.floor(Math.random()*5))
        }

        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/saveQuiz', quizData)
            .then(response => {
                if (response.data.success) {
                    // Go to shareLink oage with query
                    router.push({
                        pathname: '/shareLink/[id]',
                        query: { id: userInfo.quizCode },
                    })
                    console.log(`Succeed to save ${response.data.quiz}`)
                    console.log(quizData);
                } else {
                    alert('Failed to save user')
                }
            });
    }

    const loadData = (idx, data) => {
        qBundle[idx] = data;
    }

    // Check rendering
    if (questionList == null) return null;

    return (
        <>
            <Nav isUser={isUser} quizCode={quizCode} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100vh'
            }}>
                
                <Box
                    sx={{
                        p: '2%',
                        minWidth: 360,
                        width: '40%',
                    }}
                >
                    
                    <MakeOneQuiz key={idx}
                        order={idx + 1}
                        question={questionList[idx].question}
                        presetOptions={questionList[idx].options}
                        presetRadio={questionList[idx].selected}
                        loadData={loadData} />
                    
                    
                    {/* <Button
                        variant='contained'
                        fullWidth
                        onClick={sendData}
                    > Submit
                    </Button> */}
                </Box>
            </Box>
            <button
                onClick={AddQuestion}
                className='addQuestionBtn'
            > ADD QUESTION
            </button>
            <button
                onClick={sendData}
                className='addQuestionBtn'
                style={{
                    bottom: '1em'
                }}
            > FINISH
            </button>
        </>
    )
}
