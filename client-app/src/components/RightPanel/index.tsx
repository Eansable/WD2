import styles from './right-panel.module.css'

const RightPanel = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.table}>Таблица</div>
            <div className={styles.next__game}>Следующие игры</div>

        </div>
    )
}

export default RightPanel