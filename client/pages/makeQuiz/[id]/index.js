import React, { useState, useEffect, useContext, useRef } from 'react';
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
    const quizCode = router.query.id;
    const isUser = router.query.isUser;
    const qBundle = [];
    const [idx, setIdx] = useState(0);

    const [questionList, setquestionList] = useState(null);

    const outerDivRef = useRef(null);

    useEffect(() => {
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { makerName: user.firstName, password: user.password, quizCode: user.quizCode };
                    })
                    userInfo = userListAll.filter((user) => user.quizCode == quizCode)[0]
                    console.log(userInfo, quizCode);

                    // Preset questions
                    qBundle.push({ question: `${userInfo.makerName}(이)가 좋아하는 색깔은?`, options: ['blue', 'red', 'green'], selected: 0 });
                    qBundle.push({ question: `${userInfo.makerName}(이)가 좋아하는 스포츠는?`, options: ['basketball', 'running', 'badminton'], selected: 0 });
                    qBundle.push({ question: `${userInfo.makerName}(이)의 나이는?`, options: ['19', '21', '25'], selected: 0 });

                    setquestionList(qBundle)
                } else {
                    alert('Failed to get users');
                }
            });
        // scroll wheel handler setting
        const wheelHandler = (e) => {
            e.preventDefault();
            const { deltaY } = e;

            console.log(idx);
            if (deltaY > 0 && idx < questionList.length - 1) {
                console.log(deltaY);
                // setIdx(idx+1);
            } else if (deltaY < 0 && idx > 1) {
                console.log('sdf');
                setIdx(idx - 1);
            }
        };
        // console.log(outerDivRef.current==null, 'outer');
        if (outerDivRef.current == null) return;
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent.addEventListener('wheel', wheelHandler);
        return () => {
            outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
        };
    }, []);



    // Add question
    const AddQuestion = () => {
        console.log(questionList[idx].options, questionList)
        if (questionList[idx].options.includes('')) {
            alert('write the option');
            return;
        }
        else {
            let questions = [...questionList];
            questions.push({ question: `${userInfo.makerName}(이)의`, options: [''], selected: 0 });
            setquestionList(questions);
            setIdx(idx + 1);
        }
    }

    // Send quiz data
    const sendData = (event) => {
        event.preventDefault();

        const quizData = {
            makerName: userInfo.makerName,
            quizCode: userInfo.quizCode,
            quizBundle: qBundle,
            quizLength: qBundle.length,
            //5 types of shapes -> make array
            patterns: new Array(24).fill().map((e) => Math.floor(Math.random() * 5))
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

    const ChangePage = (e) => {
        console.log(e.target.scrollTop, 'scroll');
    }

    const loadData = (idx, data) => {
        qBundle[idx] = data;
    }

    // Check rendering
    if (questionList == null) return null;

    return (
        <>
            {/* <Nav isUser={isUser} quizCode={quizCode} /> */}
            <style jsx global>{`
                body {
                    overflow: scroll;
                }
                `}</style>
            <div>
                <button
                    onClick={sendData}
                    className='checkBtn'
                ></button>
            </div>
            <div className='scroll_body'>
                <div>
                    {questionList.map((e, index) => (
                        <Box key={index} sx={{
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <MakeOneQuiz key={index}
                                order={index + 1}
                                question={questionList[index].question}
                                presetOptions={questionList[index].options}
                                presetRadio={questionList[index].selected}
                                loadData={loadData} />
                        </Box>
                    ))}
                    <button
                        onClick={AddQuestion}
                        className='addQuestionBtn'
                    > ADD QUESTION
                    </button>
                </div>
            </div>
        </>
    )
}
