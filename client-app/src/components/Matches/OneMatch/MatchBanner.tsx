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
            <p>{match.homeName}</p>
            <img
                src={match.homeLogo ? `https://localhost:44326/api/logo/GetById?id=${match.homeLogo}` : './defaultLeague.png'}
                alt={match.homeName}
            />
        </div>
        <div className={styles.baner__info}>
            <Link 
            href={`/stadiums/${match.stadiumId}`} 
            className={styles.stadiums}>
                {match.stadiumName}
            </Link>
            <div className={styles.baner__date}>
                <footer>
                   {moment(match.date).format("DD-MM-YYYY")} 
                </footer>
                <header>
                   {moment(match.date).format("HH:mm")} 
                </header>
            </div>
        </div>
        <div className={styles.visitor}>
            <img
                src={match.visitorLogo ? `https://localhost:44326/api/logo/GetById?id=${match.visitorLogo}` : './defaultLeague.png'}
                alt={match.visitorName}
            />
            <p>{match.visitorName}</p>
        </div>
    </section> : <>{LocalLoading}</>
}

export default MatchBanner