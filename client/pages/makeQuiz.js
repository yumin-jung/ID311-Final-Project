import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import MakeOneQuestion from '../components/MakeOneQuestion';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com'
const LOCAL_SERVER_URL = 'http://localhost:8080'

export default function MakeQuiz() {
    const router = useRouter();
    const qBundle = [];
    let userList = [];
    const quizCode = router.pathname.slice(1, 7);

    useEffect(() => {
        axios.post(LOCAL_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    userList = response.data.users.map((user) => {
                        return { makerName: user.firstName, quizCode: user.quizCode };
                    })
                    console.log(userList);
                } else {
                    alert('Failed to get users');
                }
            })
    }, []);

    //preset questions
    qBundle.push({ question: '소영(이)가 좋아하는 색깔은?', options: ['blue', 'red', 'green'], selected: 0 });
    qBundle.push({ question: '소영(이)가 좋아하는 스포츠는?', options: ['basketball', 'running', 'badminton'], selected: 0 });
    qBundle.push({ question: '소영(이)의 나이는?', options: ['19', '21', '25'], selected: 0 });
    const [questionList, setquestionList] = useState(qBundle);

    const AddQuestion = () => {
        let questions = [...questionList];
        questions.push({ question: '유민(이)의', options: [''], selected: 0 });
        setquestionList(questions);
    }

    const sendData = (event) => {
        event.preventDefault();
        const makerInfo = userList.filter((user) => user.quizCode == quizCode);

        const quizData = {
            makerName: makerInfo[0].makerName,
            quizCode: makerInfo[0].quizCode,
            quizBundle: qBundle,
            quizLength: qBundle.length,
        }
        axios.post(LOCAL_SERVER_URL + '/api/quizzes/saveQuiz', quizData)
            .then(response => {
                if (response.data.success) {
                    console.log(`Succeed to save ${response.data.quiz}`)
                } else {
                    alert('Failed to save user')
                }
            });
        // router.push('/shareLink', undefined, { shallow: true });
        // }
    }

    const loadData = (idx, data) => {
        qBundle[idx] = data;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box
                sx={{
                    p: '2%',
                    minWidth: 360,
                    width: '40%',
                }}
            >
                {questionList.map((bundles, idx) => (
                    <MakeOneQuestion key={idx}
                        order={idx + 1}
                        question={bundles.question}
                        presetOptions={bundles.options}
                        presetRadio={bundles.selected}
                        loadData={loadData} />
                ))}
                <Button
                    onClick={AddQuestion}
                    fullWidth
                > + Add a question
                </Button>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={sendData}
                > Submit
                </Button>
            </Box>
        </Box>
    )
}
