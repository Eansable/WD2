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
    const [yellowCard, setYellowCard] = useState(false)
    const [redCard, setRedCard] = useState(false)


    useEffect(() => {
        if (changed) {
            setGoalInput(false)
            setYellowCard(false)
            setRedCard(false)
        }
    }, [changed])
    return <div className={styles.player_item}>
        {player.isDiscfal ? <div className={styles.player_item_disabled}></div> : null}
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
                        } else if (e.key === "Escape") {
                            setGoalInput(false)
                        }
                    }}
                /> :
                <button
                    onClick={() => {
                        setGoalInput(true)
                        setYellowCard(false)
                        setRedCard(false)
                    }}
                >
                    <img src="/goal.svg" alt="goal" />
                </button>}

            {yellowCard ?
                <CustomInput
                    disabled={isLoading}
                    type="number"
                    pattern="[0-9]*"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            dispatch(AddCardAction({
                                playerId: player.playerId,
                                matchId: match.id,
                                teamId: isVisitor ? match.visitor.teamId : match.home.teamId,
                                minute: e.currentTarget.value,
                                eventId: 2
                            }))
                        } else if (e.key === "Escape") {
                            setYellowCard(false)
                        }
                    }}
                />
                :
                <button
                    onClick={() => {
                        setYellowCard(true)
                        setRedCard(false)
                        setGoalInput(false)
                    }
                    }
                >
                    <img src="/YellowCard.svg" alt="yellow" />
                </button>}
            {redCard ?
                <CustomInput
                    disabled={isLoading}
                    type="number"
                    pattern="[0-9]*"
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            dispatch(AddCardAction({
                                playerId: player.playerId,
                                matchId: match.id,
                                teamId: isVisitor ? match.visitor.teamId : match.home.teamId,
                                minute: e.currentTarget.value,
                                eventId: 3
                            }))
                        } else if (e.key === "Escape") {
                            setRedCard(false)
                        }
                    }}
                />
                : <button
                    onClick={() => {
                        setRedCard(true)
                        setYellowCard(false)
                        setGoalInput(false)
                    }
                    }
                >
                    <img src="/RedCard.svg" alt="red" />
                </button>}

        </div>
    </div>
}


export default SquadPlayer