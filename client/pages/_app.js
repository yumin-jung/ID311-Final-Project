import React, { createContext } from 'react';
import '../styles/globals.css'
import Layout from '../components/Layout'
import CssBaseline from "@mui/material/CssBaseline";

export const AppContext = createContext();

function App({ Component, pageProps }) {
  const user = {
    quizCode: ''
  }

  return (
    <>
      <AppContext.Provider value={user}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export default App;
