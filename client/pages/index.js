import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';
import Nav from '../components/Nav';
import CodeLogo from '../components/CodeLogo';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const theme = createTheme();
let quizList = [];

export default function Home() {
  const router = useRouter();
  const [codeInput, setcodeInput] = useState('');

  const { isUser, quizCode, setQuizCode } = useContext(AppContext);

  // Make quiz code upper case
  const makeUpperCase = (event) => {
    if (event.target.value.length <= 6) setcodeInput(event.target.value.toUpperCase());
  }

  // If user submit quiz code
  const handleSubmit = (event) => {
    event.preventDefault();

    const quizFilter = quizList.filter((quiz) => quiz.quizCode == codeInput.toLowerCase());
    if (quizFilter.length < 1) {
      alert('Incorrect code!');
    }
    else {
      setQuizCode(quizFilter[0].quizCode)
      router.push({
        pathname: '/startQuiz/[id]',
        query: { id: codeInput.toLowerCase() },
      })
    }
  };

  // Get data from DB
  useEffect(() => {
    axios.post(DEPLOY_SERVER_URL + '/api/quizzes/getQuiz', null)
      .then(response => {
        if (response.data.success) {
          quizList = response.data.quiz
        }
        else {
          alert('Failed to get users');
        }
      })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Nav isUser={isUser} quizCode={quizCode} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CodeLogo></CodeLogo>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8, display: 'flex', alignItems: 'center' }} style={{ position: "relative" }}>
            <input
              id="code"
              label="Code"
              name="code"
              value={codeInput}
              onChange={makeUpperCase}
              autoComplete="code"
              autoFocus
              placeholder='Input the code'
              className='inputCodeBox'
            />
            <div className="line"></div>
            <button
              type="submit"
              variant="contained"
              className='rightArrow'
            >
            </button>
          </Box>
          {isUser === false &&
            <Typography>
              {`Want to make your quiz? `}
              <Link
                href='/signUp'
                variant='body2'
                underline='hover'>
                Sign Up
              </Link>
            </Typography>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}
