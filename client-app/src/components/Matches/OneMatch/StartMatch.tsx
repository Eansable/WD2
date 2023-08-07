import CustomButton from "@/components/CustomElement/Button"
import { useAppDispatch } from "@/helpers/hooks"
import { AddGoalAction, endMatchAction, startMatchAction } from "../store/actions"
import { MatchType } from "../types"
import styles from "./styles.module.css"
import SquadPlayer from "./SquadPlayer"

interface PropsType {
    match: MatchType
}

const StartMatch = ({ match }: PropsType) => {
    const dispatch = useAppDispatch()


    return (
        <div>
            Блок с управлением матча в прямом эфире:
            {!match?.isLive && !match?.isEnded ? <CustomButton
                onClick={() => dispatch(startMatchAction({ matchId: match.id }))}
            >Начать матч</CustomButton> : null}
            {match?.isLive ? <CustomButton
                onClick={() => dispatch(endMatchAction({ matchId: match.id }))}
            >Закончить матч</CustomButton> : null}
            <div className={styles.players_list}>
                <div className={styles.team_item}>
                    {match.home.teamPlayers?.length ?
                        match.home.teamPlayers.map(player => {
                            return <SquadPlayer
                                player={player}
                                match={match}
                                isVisitor={false}
                            />
                        }) :
                        <>Состав на матч не добавлен</>}
                </div>
                <div className={styles.visitor_team_item}>
                    {match.visitor.teamPlayers?.length ?
                        match.visitor.teamPlayers.map(player => {
                            return <SquadPlayer
                                player={player}
                                match={match}
                                isVisitor={true}
                            />
                        }) :
                        <>Состав на матч не добавлен</>}
                </div>
            </div>
        </div>)
}

export default StartMatch