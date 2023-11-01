import { useAppSelector } from "@/helpers/hooks"
import { OnePlayerType } from "../types"
import styles from "../styles.module.css"

interface PropsType {
}

const Stats = ({ }: PropsType) => {
    const { onePlayer } = useAppSelector(state => state.PlayersReducer)

    return <section>
        <h3>Статистика:</h3>
        <div className={styles.stats_wrapper}>
            <div className={styles.stats_item}>
                <p>
                    {onePlayer?.matchCount}
                </p>
                <p>
                    Количество матчей
                </p>
            </div>
            <div className={styles.stats_item}>
                <p>
                    {onePlayer?.goalCount}
                </p>
                <p>
                    Голов забито
                </p>
            </div>
            <div className={styles.stats_item}>
                <p>
                    {onePlayer?.yellowCardCount}
                </p>
                <p>
                    Жёлтых карточек
                </p>
            </div>
            <div className={styles.stats_item}>
                <p>
                    {onePlayer?.redCardCount}
                </p>
                <p>
                    Красных карточек
                </p>
            </div>
        </div>
    </section>
}

export default Stats

