import ChampionatStatsType from "./types"
import styles from "./styles.module.css"

interface PropsType {
    table: ChampionatStatsType[]
}

const ChampionatTable = ({ table }: PropsType) => {
    return <div className={styles.table__wrapper}>
        <div className={styles.green__cell}>№</div>
        <div className={styles.green__cell}>Название</div>
        <div className={styles.green__cell}>И</div>
        <div className={styles.green__cell}>В</div>
        <div className={styles.green__cell}>Н</div>
        <div className={styles.green__cell}>П</div>
        <div className={styles.green__cell}>МЗ:МП</div>
        <div className={styles.green__cell}>Очки</div>
        {table.map((stand, index) => {
            return <>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{index + 1}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.teamName}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.draw + stand.win + stand.lose}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.win}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.draw}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.lose}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.goals}:{stand.goalsConceded}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.points}</div>
            </>
        })}
    </div>
}

export default ChampionatTable