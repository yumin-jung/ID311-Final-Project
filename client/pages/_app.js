import React, { useState, useEffect } from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import CssBaseline from "@mui/material/CssBaseline";
import { UserContext } from '../context/UserContext';

function App({ Component, pageProps }) {
  const [isUser, setIsUser] = useState(false)
  const [quizCode, setQuizCode] = useState(null);

  useEffect(() => {
    setIsUser(false);
    setQuizCode(null);
  }, [])

  return (
    <UserContext.Provider value={{ isUser, setIsUser, quizCode, setQuizCode }}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

export default App;
