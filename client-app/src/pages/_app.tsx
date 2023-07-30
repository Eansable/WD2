import '../styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RightPanel from '../components/RightPanel'
import { Provider } from 'react-redux'
import { store } from '../store'
import { ConfigProvider } from 'antd'
import ru from 'antd/locale/ru_RU';

const App = ({ Component, pageProps }: { Component: any, pageProps: any}) => {

    return (
        <>
            <Provider store={store}>
                <ConfigProvider
                    locale={ru}
                >

                <Header />
                <div className='wrapper'>
                    <Component {...pageProps} />
                    <RightPanel />
                </div>
                <Footer />
                </ConfigProvider>
            </Provider>
        </>
    )
}

export default App