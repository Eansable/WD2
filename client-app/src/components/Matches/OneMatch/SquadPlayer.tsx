import { useAppDispatch } from "@/helpers/hooks"
import { MatchPlayer, MatchType } from "../types"
import styles from "./styles.module.css"
import { AddGoalAction } from "../store/actions"

interface PropsType {
    player: MatchPlayer,
    match: MatchType, 
    isVisitor: boolean
}

const SquadPlayer = ({player, match, isVisitor}: PropsType) => {
    const dispatch = useAppDispatch()
    return <div className={styles.player_item}>
        {player.playerName}
        <div className={styles.player_manage}>
            <button
                onClick={() => dispatch(AddGoalAction({
                    playerId: player.playerId,
                    matchId: match.id,
                    teamId: isVisitor ? match.visitor.teamId : match.home.teamId,
                    minute: 1,
                    eventId: 1
                }))}
            >
                <img src="/goal.svg" alt="goal" />
            </button>
            <button>
                <img src="/YellowCard.svg" alt="yellow" />
            </button>
            <button>
                <img src="/RedCard.svg" alt="red" />
            </button>

        </div>
    </div>
}


export default SquadPlayer