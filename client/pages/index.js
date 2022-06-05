import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const theme = createTheme();

let quizList;

export default function Home() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCode = data.get('code');

    const quizFilter = quizList.filter(quiz => quiz.quizCode == userCode);
    console.log(quizFilter)

    router.push({
      pathname: '/startQuiz/[quizCode]',
      query: { quizCode: userCode },
    })
  };

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
            marginTop: 40,
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
              autoComplete="code"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}