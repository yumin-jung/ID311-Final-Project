import '../styles/globals.css'
import Layout from '../components/Layout'
import CssBaseline from "@mui/material/CssBaseline";

function App({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App;
