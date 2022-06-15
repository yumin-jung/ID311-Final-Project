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
    const { isUser, quizCode } = useContext(AppContext);
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
                    console.log(userInfo);

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
            const { scrollTop } = outerDivRef.current;
            const pageHeight = window.innerHeight;
      
            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >=0 && scrollTop < pageHeight) {
                    outerDivRef.current.scrollTop({
                        top: pageHeight,
                        left: 0,
                        behavior: 'smooth',
                    })
                }
            } else {
                // 스크롤 올릴 때
                if (scrollTop >=pageHeight && scrollTop < pageHeight*2) {
                    outerDivRef.current.scrollTop({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                    })
                }
            }
        };
        const outerDivRefCurrent = outerDivRef.current;
        outerDivRefCurrent ? outerDivRefCurrent.addEventListener("wheel", wheelHandler) : null;
        return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
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

        const quizData = {
            makerName: userInfo.makerName,
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
            {/* <Nav isUser={isUser} quizCode={quizCode} /> */}
            <button
                    onClick={sendData}
                    className='checkBtn'
            ></button>
            <div ref={outerDivRef} className='outer'>
                <div className='inner'>
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
                            
                            
                        </Box>
                    </Box>
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
