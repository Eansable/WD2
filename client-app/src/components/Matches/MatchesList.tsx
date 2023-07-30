import MatchItem from "./MatchItem"
import { MatchType } from "./types"
import styles from "./styles.module.css"

interface PropsType {
    matches: MatchType[],
    isResult: boolean
}

const MatchesList = ({ matches }: PropsType) => {
    return <div className={styles.match__list}>
        {matches.map(match => <MatchItem match={match}></MatchItem>)}
    </div>
}

export default MatchesList