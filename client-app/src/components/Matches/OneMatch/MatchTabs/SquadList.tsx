import { MatchType } from "../../types"
import styles from "./styles.module.css"

interface PropsType {
    match: MatchType
}

const SquadList = ({ match }: PropsType) => {
    return <div>
        <div
            className={styles.team_choose}
        >
            <button
            >
                <img src={match.home.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}` : './defaultLeague.png'} />
                {match.home.teamName}
            </button>
            <button
            >
                <img src={match.visitor.teamLogo ? `https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}` : './defaultLeague.png'} />
                {match.visitor.teamName}
            </button>

        </div>
        <div
            className={styles.team_list}
        ></div>
    </div>
}

export default SquadList