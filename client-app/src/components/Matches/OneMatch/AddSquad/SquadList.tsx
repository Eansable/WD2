import { useAppSelector } from "@/helpers/hooks"
import { MatchPlayer } from "../../types"
import SelectedPlayerCard from "./SelectedPlayerCard"
import styles from "./styles.module.css"
import { useState } from "react"

interface PropsType {
}

const SquadList = ({ }: PropsType) => {
    const { oneMatch } = useAppSelector(state => state.matchesReducer)
    const { roles } = useAppSelector(state => state.accountReducer)

    const [activeTeam, setActiveTeam] = useState(true)
    const [homeSquad, setHomeSquad] = useState({
        startSquad: [],
        subs: [],
        teamId: null
    })
    const [visitorSquad, setVisitorSquad] = useState({
        startSquad: [],
        subs: [],
        teamId: null
    })

    const getActiveTeam = () => activeTeam ? oneMatch?.home.teamPlayers : oneMatch?.visitor.teamPlayers
    const getActiveTeamSquad = () => activeTeam ? homeSquad : visitorSquad

    return <div className={styles.squad_list_wrapper}>
        <header className={styles.squad_list_switch}>
            <button
                className={activeTeam ? styles.active : ""}
                onClick={() => setActiveTeam(true)}
                disabled={!roles.includes("admin")}
            >
                {oneMatch?.home.teamName}
            </button>
            <button
                onClick={() => setActiveTeam(false)}
                className={!activeTeam ? styles.active : ""}
                disabled={!roles.includes("admin")}
            >
                {oneMatch?.visitor.teamName}
            </button>
        </header>
        {getActiveTeam()?.map(player => {
            return <SelectedPlayerCard
                player={player}
            />
        })}
        <footer>

        </footer>
    </div>
}

export default SquadList