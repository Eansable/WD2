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
                {match?.homeLogo ? <img src={`https://localhost:44326/api/logo/GetById?id=${match.homeLogo}`}></img> : <img src='./defaultLeague.png' />}
                <p>{match.homeName}</p>
            </div>
        <p className={styles.match__result}> vs </p>
            <div className={styles.match__team}>
                {match?.visitorLogo ? <img src={`https://localhost:44326/api/logo/GetById?id=${match.visitorLogo}`}></img> : <img src='./defaultLeague.png' />}
                <p>{match.visitorName}</p>
            </div>
        <div className={styles.match__date}>
            <p>
                {moment(new Date(match.date)).format("DD-MM-YYYY HH:mm")}
            </p>
        </div>

    </Link >
}

export default MatchItem