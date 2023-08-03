import { MatchType } from "./types"
import styles from "./styles.module.css"
import Link from "next/link"
import moment from "moment"

interface PropsType {
    match: MatchType
}
const MatchItem = ({ match }: PropsType) => {
    return <Link href={`/match/${match.id}`} className={styles.match__wrapper}>

            <div className={styles.match__team}>
                {match?.home.teamLogo ? <img src={`https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}`}></img> : <img src='./defaultLeague.png' />}
                <p>{match.home.teamName}</p>
            </div>
        <p className={styles.match__result}> {match?.score ? match.score : "vs"} </p>
            <div className={styles.match__team}>
                {match?.visitor.teamLogo ? <img src={`https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}`}></img> : <img src='./defaultLeague.png' />}
                <p>{match.visitor.teamName}</p>
            </div>
        <div className={styles.match__date}>
            <p>
                {moment(new Date(match.date)).format("DD-MM-YYYY HH:mm")}
            </p>
        </div>
        {match.isLive ? <div className={styles.live}>Live</div> : null}

    </Link >
}

export default MatchItem