import Link from 'next/link'
import { MatchEventType } from '../types'
import styles from './styles.module.css'


interface PropsType {
    event: MatchEventType,
    isVisitor: boolean
}

const EventItem = ({ event, isVisitor }: PropsType) => {
    return <div className={`${styles.event_item} ${isVisitor ? styles.event_item_visitor : ''}`}>
        {event.minute}'
        <img src={`https://localhost:44326/api/logo/GetById?id=${event.logoId}`} />
        <Link href={`/players/${event.playerId}`}>
            {event.playerName}
        </Link>
    </div>
}

export default EventItem