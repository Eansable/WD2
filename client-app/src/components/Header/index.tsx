import Link from "next/link"
import styles from "./header.module.css"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>

                <Link href='/' >
                <div className={styles.logo}></div>
                </Link>
                <div className={styles.menu}>
                    <Link
                        href='/news'
                        className={styles.link}
                    >
                        <p>Новости</p>
                    </Link>
                    <Link
                        href='/club'
                        className={styles.link}
                    >
                        <p>Клуб</p>
                    </Link>
                    <Link
                        href='/squad'
                        className={styles.link}
                    >
                        <p>Состав</p>
                    </Link>
                    <Link href='/tables'
                        className={styles.link}
                    >
                        <p>Таблицы</p>
                    </Link>
                    <Link href='/galery'
                        className={styles.link}
                    >
                        <p>Галерея</p>
                    </Link>
                    <Link href='/predictions'
                        className={styles.link}
                    >
                        <p>Конкурс прогнозов</p>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Header