import { useAppSelector } from "@/helpers/hooks"
import MatchItem from "../Matches/MatchItem"
import styles from "./styles.module.css"

const Overview = () => {
    const { onePlayer } = useAppSelector(state => state.PlayersReducer)

    return <section className={styles.overview}>
        Общие
        {onePlayer?.lastMatch ? <MatchItem match={onePlayer?.lastMatch} isManagment={false} /> : null}
        <div>
            Количество матчей:
            {onePlayer?.matchCount}
        </div>
    </section>
}

export default Overview
