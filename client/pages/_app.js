import '../styles/globals.css'
import Layout from '../components/Layout'
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
