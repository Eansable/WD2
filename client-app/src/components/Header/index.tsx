import Link from "next/link"
import styles from "./header.module.css"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect } from "react";
import { refreshUserDataAction } from "../Account/store/actions";

const Header = () => {
    const dispatch = useAppDispatch();
    const { user, roles } = useAppSelector(state => state.accountReducer)

    useEffect(() => {
        if (!user?.id) {
            dispatch(refreshUserDataAction())
        }
    }, [dispatch])

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
                        href='/teams'
                        className={styles.link}
                    >
                        <p>Команды</p>
                    </Link>
                    <Link
                        href='/championats'
                        className={styles.link}
                    >
                        <p>Турниры</p>
                    </Link>
                    <Link href='/tables'
                        className={styles.link}
                    >
                        <p>Таблицы</p>
                    </Link>

                    <Link href='/predictions'
                        className={styles.link}
                    >
                        <p>Конкурс прогнозов</p>
                    </Link>
                    {roles.length ?
                        <Link href='/account'
                            className={styles.link}
                        >
                            <p>Личный кабинет</p>
                        </Link> :
                        <Link href='/login'
                            className={styles.link}
                        >
                            <p>Вход</p>
                        </Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header