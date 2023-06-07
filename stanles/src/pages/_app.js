import '../styles.css'
import Header from '../components/Header'


const App = ({ Component, pageProps }) => {
    return (
    <>
        <Header />
        <Component {...pageProps} />
    </>
    )
}

export default App