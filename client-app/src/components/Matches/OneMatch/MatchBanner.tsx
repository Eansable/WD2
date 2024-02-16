import { MatchType } from "../types"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import styles from "./styles.module.css"
import moment from "moment"
import Link from "next/link"
import EventItem from "./EventItem"

interface PropsType {
    match?: MatchType,

}

const MatchBanner = ({ match }: PropsType) => {
    return match ? <section className={styles.baner}>
        <div className={styles.match_info}>
            Тур {match.round}
        </div>
        <div className={styles.home}>
            <Link href={`/teams/${match.home.teamId}`}>
                <p>{match.home.teamName}</p>
                <img
                    src={match.home.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}` : '../defaultClub.png'}
                    alt={match.home.teamName}
                />
            </Link>
        </div>
        <div className={styles.baner__info}>

            {match?.isLive || match.isEnded ? <div className={styles.score}>
                {match?.score ? match.score : "0:0"}
            </div> : <div className={styles.baner__date}>
                <footer>
                    {match.date ? moment(new Date(match.date)).format("DD-MM-YYYY") : "Не установлено"}
                </footer>
                <header>
                    {match.date ? moment(new Date(match.date)).format("HH:mm") : ""}
                </header>
            </div>}
        </div>
        <div className={styles.visitor}>
            <Link href={`/teams/${match.visitor.teamId}`}>
                <img
                    src={match.visitor.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}` : '../defaultClub.png'}
                    alt={match.visitor.teamName}
                />
                <p>{match.visitor.teamName}</p>
            </Link>
        </div>

        {match?.matchEvents?.length ?
            <div className={styles.match_events_wrapper}>
                <div className={styles.match_events_list}>
                    {match.matchEvents.map(event => {
                        return <EventItem
                            event={event}
                            isVisitor={event.teamId === match.visitor.teamId}
                        />
                    })}
                </div>
            </div>
            : null}
    </section>
        :
        <>{LocalLoading}</>
}

export default MatchBanner