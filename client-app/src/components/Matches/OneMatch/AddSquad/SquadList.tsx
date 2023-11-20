'use client'

import { useAppSelector } from "@/helpers/hooks"
import { MatchPlayer, MatchType, SquadListType } from "../../types"
import SelectedPlayerCard from "./SelectedPlayerCard"
import styles from "./styles.module.css"
import { useState } from "react"

interface PropsType {
    oneMatch: MatchType
}

const SquadList = ({ oneMatch }: PropsType) => {
    const { roles } = useAppSelector(state => state.accountReducer)

    const [activeTeam, setActiveTeam] = useState(true)
    const [homeSquad, setHomeSquad] = useState<SquadListType>({
        startSquad: [],
        subs: [],
        teamId: undefined
    })

    const [visitorSquad, setVisitorSquad] = useState<SquadListType>({
        startSquad: [],
        subs: [],
        teamId: undefined
    })

    const checkSelectedPlayer = (player: MatchPlayer) => {
        const tempSquad = activeTeam ? homeSquad : visitorSquad
        if (tempSquad.startSquad.findIndex(s => s.playerId === player.playerId) >= 0
            || tempSquad.subs.findIndex(s => s.playerId === player.playerId) >= 0)
            return true
        return false
    }

    const changePlayer = (player: MatchPlayer) => {
        const tempSquad = activeTeam ? homeSquad : visitorSquad

        if (oneMatch && tempSquad.startSquad?.length <= oneMatch.playerCountOnStart) {
            tempSquad.startSquad?.push({
                playerId: player.playerId,
                isCaptain: false,
                isGoalkeaper: tempSquad.startSquad?.length === 0
            })
        } else if (tempSquad.startSquad.length + tempSquad.subs.length < 18) {
            tempSquad.subs.push({
                playerId: player.playerId,
                isCaptain: false,
                isGoalkeaper: false
            })
        }
    }

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
                changePlayer={changePlayer}
                player={player}
                disabled={checkSelectedPlayer(player)}
                isSelected={checkSelectedPlayer(player)}
            />
        })}
        <footer
            className={styles.start_sqaud}
            onDragOver={e => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                console.log(e)

            }}
        >
            {activeTeam ? homeSquad.startSquad.map(squad => {
                return <SelectedPlayerCard
                    player={oneMatch.home.teamPlayers.find(p => p.playerId === squad.playerId)}
                    changePlayer={changePlayer}
                    key={squad.playerId}
                />
            }) :
                visitorSquad.startSquad.map(squad => {
                    return <SelectedPlayerCard
                        player={oneMatch.visitor.teamPlayers.find(p => p.playerId === squad.playerId)}
                        changePlayer={changePlayer}
                        key={squad.playerId}
                    />
                })
            }
        </footer>
    </div>
}

export default SquadList