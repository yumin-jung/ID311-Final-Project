import React, { useEffect, useState } from 'react';
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

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const theme = createTheme();
let savedCode;
let quizList;

export default function Home() {
  const router = useRouter();
  const [codeInput, setcodeInput] = useState('');

  const MakeUpperCase = (event) => {
    if(event.target.value.length<=6) setcodeInput(event.target.value.toUpperCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const quizFilter = quizList.filter((quiz) => quiz.quizCode.toUpperCase() == codeInput);
    if (quizFilter.length < 1) {
      alert('Incorrect code!');
    } else {
      router.push({
        pathname: '/startQuiz/[id]',
        query: { id: codeInput.toLowerCase() },
      })
    }
  };

  React.useEffect(() => {
    console.log(sessionStorage.getItem('quizCode'));
    savedCode = sessionStorage.getItem('quizCode');
  },[]);
  useEffect(() => {
    axios.post(LOCAL_SERVER_URL + '/api/quizzes/getQuiz', null)
      .then(response => {
        if (response.data.success) {
          quizList = response.data.quizData
          console.log(quizList);
        } else {
          alert('Failed to get users');
        }
      })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography align="center" component="h1" variant="h3">
            Personal Quiz
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="code"
              label="Code"
              name="code"
              value={codeInput}
              onChange={MakeUpperCase}
              autoComplete="code"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              submit
            </Button>
          </Box>
          {/* need condition */}
            {true && 
              <Typography>Want to make your quiz? <Link
                href='/signUp'
                variant='body2'
                underline='hover'>Sign Up</Link>
              </Typography>
            }
        </Box>
      </Container>
    </ThemeProvider>
  );
}
