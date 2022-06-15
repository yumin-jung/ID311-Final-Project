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
let isQuizExist;

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
                        return { makerName: user.firstName, password: user.password, quizCode: user.quizCode };
                    })
                    userInfo = userListAll.filter((user) => user.quizCode == quizCode)[0]
                    console.log(userInfo, quizCode);

                    // Preset questions
                    qBundle.push({ question: `${userInfo.makerName}'s favorite color?`, options: ['blue', 'red', 'green'], selected: 0 });
                    qBundle.push({ question: `${userInfo.makerName}'s favorite sport?`, options: ['basketball', 'running', 'badminton'], selected: 0 });
                    qBundle.push({ question: `${userInfo.makerName}'s age?`, options: ['19', '21', '25'], selected: 0 });
                    qBundle.push({ question: `${userInfo.makerName}'s major?`, options: ['industrial design', 'computer science', 'biology'], selected: 0});

                    setquestionList(qBundle);
                } else {
                    alert('Failed to get users');
                }
            });
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz.map((quiz) => {
                        return { quizCode: quiz.quizCode };
                    })
                    isQuizExist = quizListAll.some((e) => e.quizCode == quizCode);
                    console.log(isQuizExist);
                } else {
                    alert('Failed to get quizzes');
                }
            })
  }, []);



    // Add question
    const AddQuestion = () => {
        let questions = [...questionList];
        questions.push({ question: `${userInfo.makerName}(이)의`, options: [''], selected: 0 });
        setquestionList(questions);
        setIdx(idx + 1);
    }

    // Send quiz data
    const sendData = (event) => {
        event.preventDefault();
        const allOptions = qBundle.reduce((acc,e) => acc.concat(e.options),[]);

        if(isQuizExist) alert('You already made quiz');
        else if(allOptions.includes('')) alert('Fill up the options');
        else{
            const quizData = {
                makerName: userInfo.makerName,
                quizCode: userInfo.quizCode,
                quizBundle: qBundle,
                quizLength: qBundle.length,
                //5 types of shapes -> make array
                patterns: new Array(12).fill().map((e) => Math.floor(Math.random()*5))
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
