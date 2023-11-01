import { useAppSelector } from "@/helpers/hooks"
import MatchItem from "../../Matches/MatchItem"
import styles from "../styles.module.css"

const Overview = () => {
    const { onePlayer } = useAppSelector(state => state.PlayersReducer)

    return <section className={styles.overview}>
        <div className={styles.last_match}>
            <h3>Предыдущий матч:</h3>
            {onePlayer?.lastMatch ? <MatchItem match={onePlayer?.lastMatch} isManagment={false} /> : null}
        </div>
        <div>
            Количество матчей:
            {onePlayer?.matchCount}
        </div>
    </section>
}

export default Overview
