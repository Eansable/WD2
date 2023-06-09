import styles from './footer.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.wrapper}>
                <div className={styles.social}>
                    Instagram
                    Youtube
                    VK
                </div>
                <div className={styles.copyright}>
                    <p> Тарасевич Андрей Эдуардович 2023г</p>    
                </div>    
            </div>
        </footer>
    )
}

export default Footer