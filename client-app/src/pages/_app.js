import '../styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RightPanel from '../components/RightPanel'


const App = ({ Component, pageProps }) => {
    return (
        <>
            <Header />
            <div className='wrapper'>
                <Component {...pageProps} />
                <RightPanel />
            </div>
            <Footer />
        </>
    )
}

export default App