import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Home() {
  let quizCode =false;
  const [codeValue, setcodeValue] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCode = data.get('code')
    console.log(userCode);
  };

  React.useEffect(() => {
    console.log(sessionStorage.getItem('quizCode'));
    quizCode = sessionStorage.getItem('quizCode');
  },[]);

  //make quizcode uppercase & 6 digit limit
  const MakeUpperCase = (event) => {
    if(event.target.value.length<=6) setcodeValue(event.target.value.toUpperCase());
  }

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
              autoComplete="code"
              value={codeValue}
              onChange={MakeUpperCase}
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


// // SSR
// export const getServerSideProps = async () => {
//   const res = await fetch(`http://localhost:8080/api/posts`)
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     }
//   }
// }

// // SSG
// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`)
//   const posts = await res.json();

//   return {
//     props: {
//       posts
//     },
//     revalidate: 20 // incremental static regeneration
//   }
// }