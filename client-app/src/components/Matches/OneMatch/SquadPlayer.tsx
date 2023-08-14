'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { MatchPlayer, MatchType } from "../types"
import styles from "./styles.module.css"
import { AddCardAction, AddGoalAction } from "../store/actions"
import { useEffect, useState } from "react"
import CustomInput from "@/components/CustomElement/Input"

interface PropsType {
    player: MatchPlayer,
    match: MatchType,
    isVisitor: boolean
}

const SquadPlayer = ({ player, match, isVisitor }: PropsType) => {
    const dispatch = useAppDispatch()
    const { isLoading, changed } = useAppSelector(state => state.matchesReducer)
    const [goalInput, setGoalInput] = useState(false)

    useEffect(() => {
        if (changed) {
            setGoalInput(false)
        }
    }, [changed])
    return <div className={styles.player_item}>
        {player.playerName}
        <div className={styles.player_manage}>
            {goalInput ?
                <CustomInput
                    disabled={isLoading}
                    type="number"
                    pattern="[0-9]*"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            
                            dispatch(AddGoalAction({
                                playerId: player.playerId,
                                matchId: match.id,
                                teamId: isVisitor ? match.visitor.teamId : match.home.teamId,
                                minute: e.currentTarget.value,
                                eventId: 1
                            }))
                        }
                    }}
                /> :
                <button
                    onClick={() => setGoalInput(true)}
                >
                    <img src="/goal.svg" alt="goal" />
                </button>}

            <button
                onClick={() => dispatch(AddCardAction({
                    playerId: player.playerId,
                    matchId: match.id,
                    eventId: 2
                }))}
            >
                <img src="/YellowCard.svg" alt="yellow" />
            </button>
            <button
                onClick={() => dispatch(AddCardAction({
                    playerId: player.playerId,
                    matchId: match.id,
                    eventId: 3
                }))}
            >
                <img src="/RedCard.svg" alt="red" />
            </button>

        </div>
    </div>
}


export default SquadPlayer