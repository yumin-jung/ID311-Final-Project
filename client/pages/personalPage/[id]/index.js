import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import Container from '@mui/material/Container';
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';
import Logo from '../../../components/Logo';
import BauIcon from '../../../components/BauIcon';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';
let userList = [];
let quizList = null;
let FilteredSolvers = [];
let patterns;

export default function PersonalPage() {
    const router = useRouter();
    const { isUser, quizCode } = useContext(AppContext);

    // Check rendering
    const [isRenderUser, setIsRenderUser] = useState(false);
    const [isRenderQuiz, setIsRenderQuiz] = useState(false);
    const [isRenderSolver, setIsRenderSolver] = useState(false);

    const [color, setColor] = useState(0);

    const setColorBlack = ()=>{
        setColor(0);
    }
    const setColorBlue = ()=>{
        setColor(1);
    }
    const setColorYellow = ()=>{
        setColor(2);
    }
    const setColorRed = ()=>{
        setColor(3);
    }


    useEffect(() => {
        // Get userlist from DB
        axios.post(DEPLOY_SERVER_URL + '/api/users/getUsers', null)
            .then(response => {
                if (response.data.success) {
                    const userListAll = response.data.users.map((user) => {
                        return { username: user.username, password: user.password, quizCode: user.quizCode, firstName: user.firstName};
                    })
                    userList = userListAll.filter((user) => user.quizCode == quizCode)
                    setIsRenderUser(true);
                } else {
                    alert('Failed to get users');
                }
            })

        // Get quizlist from DB
        axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
            .then(response => {
                if (response.data.success) {
                    const quizListAll = response.data.quiz.map((quiz) => {
                        return { quizCode: quiz.quizCode, patterns: quiz.patterns };
                    })
                    quizList = quizListAll.filter((quiz) => quiz.quizCode == quizCode);
                    if(quizList!=0) patterns = quizList[0].patterns.reduce((acc,e)=>acc.concat(e),[]).filter((e,idx)=> idx<12);
                    console.log(patterns);
                    setIsRenderQuiz(true);
                } else {
                    alert('Failed to get quizzes');
                }
            })

        // Get solvers data
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
    if (isRenderUser === false) {
        return null;
    }
    if (isRenderQuiz === false) {
        return null;
    }
    if (isRenderSolver === false) {
        return null;
    }

    const MakeQuiz = (event) => {
        router.push({
            pathname: '/makeQuiz/[id]',
            query: { id: quizCode, isUser: isUser },
        })
    }

    if (quizList==null) return null;
    else if (quizList.length == 0) {
        return (
            <>
                <style jsx global>{`
                body {
                    background: #EEDFCC;
                }
                `}</style>
                <Nav isUser={isUser} quizCode={quizCode} />
                <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Logo size='0.9'></Logo>
                    <button onClick={MakeQuiz}
                        sx={{ mt: 5, mb: 2, backgroundColor: 'black', borderRadius: 0, fontSize: '1.3em', padding: '1em', width: '0.9' }}
                        className='blackBtn'>
                        MAKE QUIZ
                    </button>
                </Container>
            </>
        )
    }
    else {
        return (
            <>
                <Nav isUser={isUser} quizCode={quizCode} />
                <div className="msgUsername">{userList[0].firstName}</div>
                <Container sx={{
                    width: '100%',
                    alignItems: 'center',
                }} >
                    <div className='msgGrid'>
                        {patterns.map((pattern, idx) => (
                            <BauIcon key={idx} patternNum={pattern} rotate={(idx * 7) % 4} colorNum={(idx * 13) % 5}  idx={idx}/>
                        ))}
                        
                    </div>
                </Container>
                <div className='colorPalette'>
                    <div onClick={()=>{setColorBlack()}} className='colorPick black'></div>
                    <div onClick={()=>{setColorBlue()}} className='colorPick blue'></div>
                    <div onClick={()=>{setColorYellow()}} className='colorPick yellow'></div>
                    <div onClick={()=>{setColorRed()}} className='colorPick red'></div>
                </div>
            </>
        )
    }
}
