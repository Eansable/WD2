import { MatchType } from "../types"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import styles from "./styles.module.css"
import moment from "moment"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"

interface PropsType {
    match?: MatchType,

}

const MatchBanner = ({ match }: PropsType) => {
    return match ? <section className={styles.baner}>
        <div className={styles.home}>
            <Link href={`/teams/${match.home.teamId}`}>
                <p>{match.home.teamName}</p>
                <img
                    src={match.home.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}` : './defaultLeague.png'}
                    alt={match.home.teamName}
                />
            </Link>
        </div>
        <div className={styles.baner__info}>
            <Link
                href={`/stadiums/${match.stadiumId}`}
                className={styles.stadiums}>
                {match.stadiumName}
            </Link>
            {match?.isLive || match.isEnded ? <div className={styles.score}>
                {match?.score ? match.score : "0:0"}
            </div> : <div className={styles.baner__date}>
                <footer>
                    {moment(match.date).format("DD-MM-YYYY")}
                </footer>
                <header>
                    {moment(match.date).format("HH:mm")}
                </header>
            </div>}
        </div>
        <div className={styles.visitor}>
            <Link href={`/teams/${match.visitor.teamId}`}>
                <img
                    src={match.visitor.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}` : './defaultLeague.png'}
                    alt={match.visitor.teamName}
                />
                <p>{match.visitor.teamName}</p>
            </Link>
        </div>
        {match.isLive ? <div className={styles.live}>Live</div> : null}
    </section>
        :
        <>{LocalLoading}</>
}

export default MatchBanner