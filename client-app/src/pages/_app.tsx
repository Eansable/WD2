import '../styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RightPanel from '../components/RightPanel'
import { Provider } from 'react-redux'
import { store } from '../store'


const App = ({ Component, pageProps }: { Component: any, pageProps: any}) => {
    return (
        <>
            <Provider store={store}>
                <Header />
                <div className='wrapper'>
                    <Component {...pageProps} />
                    <RightPanel />
                </div>
                <Footer />
            </Provider>
        </>
    )
}

export default App