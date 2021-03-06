import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';
import Nav from '../components/Nav';
import CodeLogo from '../components/CodeLogo';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const DEPLOY_CLIENT_URL = 'https://id311.'
const LOCAL_CLIENT_URL = 'http://localhost:3000';

const theme = createTheme();
let quizList = [];

export default function Home() {
  const router = useRouter();
  const [codeInput, setcodeInput] = useState('');

  const { isUser, quizCode, setQuizCode } = useContext(AppContext);
  const [alertOn, setAlert] = useState(false);

  // Make quiz code upper case
  const makeUpperCase = (event) => {
    if (event.target.value.length <= 6) setcodeInput(event.target.value.toUpperCase());
  }

  // If user submit quiz code
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(alertOn);
    const quizFilter = quizList.filter((quiz) => quiz.quizCode == codeInput.toLowerCase());
    if (quizFilter.length == 0) {
      setAlert(true);
      setTimeout(() => setAlert(false), 1000);
    }
    else {
      console.log(quizFilter);
      const inputQuizCode = quizFilter[0].quizCode;
      setQuizCode(inputQuizCode);
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
          console.log(quizList);
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
            {alertOn ? <input
              id="code"
              label="Code"
              name="code"
              value='Invalid code'
              autoFocus
              className='alertCodeBox'
            /> : <input
              id="code"
              label="Code"
              name="code"
              value={codeInput}
              onChange={makeUpperCase}
              autoComplete="code"
              autoFocus
              placeholder='Input the code'
              className='inputCodeBox'
            />}

            {codeInput.length == 6 &&
              <Box sx={{ mt: 0, display: 'flex', alignItems: 'center' }} >
                <div className="line"></div>
                <button
                  type="submit"
                  variant="contained"
                  className='rightArrow'
                >
                </button>
              </Box>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}