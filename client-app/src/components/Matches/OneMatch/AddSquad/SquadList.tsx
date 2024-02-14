'use client'

import { useAppSelector } from "@/helpers/hooks"
import { MatchPlayer, MatchType, SquadListType } from "../../types"
import SelectedPlayerCard from "./SelectedPlayerCard"
import styles from "./styles.module.css"
import { MouseEvent, useState } from "react"

interface PropsType {
    oneMatch: MatchType
}

const SquadList = ({ oneMatch }: PropsType) => {
    const { roles } = useAppSelector(state => state.accountReducer)

    const [activeTeam, setActiveTeam] = useState(true)
    const [homeSquad, setHomeSquad] = useState<SquadListType>({
        squad: [],
        teamId: undefined
    })

    const [visitorSquad, setVisitorSquad] = useState<SquadListType>({
        squad: [],
        teamId: undefined
    })

    const checkSelectedPlayer = (player: MatchPlayer) => {
        const tempSquad = activeTeam ? homeSquad : visitorSquad
        return (tempSquad.squad.findIndex(s => s.playerId === player.playerId) >= 0)
    }

    const checkDisabledPlayer = (player: MatchPlayer) => {
        const tempSquad = activeTeam ? homeSquad : visitorSquad
        return (tempSquad.squad.length > 18 || tempSquad.squad.findIndex(s => s.playerId === player.playerId) >= 0)
    }

    const changeCaptain = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, playerId: number) => {
        event.preventDefault()

        const tempSquad = activeTeam ? { ...homeSquad } : { ...visitorSquad }
        console.log(tempSquad.squad.findIndex(s => s.isCaptain));
        if (tempSquad.squad.findIndex(s => s.isCaptain) >= 0)
            tempSquad.squad[tempSquad.squad.findIndex(s => s.isCaptain)].isCaptain = false
        tempSquad.squad[tempSquad.squad.findIndex(p => p.playerId === playerId)].isCaptain = true
        activeTeam ? setHomeSquad(tempSquad) : setVisitorSquad(tempSquad)
    }

    const changePlayer = (player: MatchPlayer) => {
        const tempSquad = activeTeam ? { ...homeSquad } : { ...visitorSquad }
        const playerIndex = tempSquad.squad.findIndex(p => p.playerId === player.playerId)

        if (oneMatch && tempSquad.squad?.length <= oneMatch.playerCountOnStart) {
            if (playerIndex < 0) {
                tempSquad.squad?.push({
                    playerId: player.playerId,
                    isCaptain: false,
                    isGoalkeaper: tempSquad.squad?.length === 0
                })
            } else {
                tempSquad.squad.splice(playerIndex, 1)
            }
        }

        activeTeam ? setHomeSquad(tempSquad) : setVisitorSquad(tempSquad)
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
                disabled={checkDisabledPlayer(player)}
                isSelected={checkSelectedPlayer(player)}
                changeCaptain={changeCaptain}
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
            {activeTeam ? homeSquad.squad.map(squad => {
                return <SelectedPlayerCard
                    player={oneMatch.home.teamPlayers.find(p => p.playerId === squad.playerId)}
                    changePlayer={changePlayer}
                    key={squad.playerId}
                    isSelected={true}
                    isCaptain={squad.isCaptain}
                    isGK={squad.isGoalkeaper}
                    changeCaptain={changeCaptain}
                />
            }) :
                visitorSquad.squad.map(squad => {
                    return <SelectedPlayerCard
                        player={oneMatch.visitor.teamPlayers.find(p => p.playerId === squad.playerId)}
                        changePlayer={changePlayer}
                        key={squad.playerId}
                        isSelected={true}
                        isCaptain={squad.isCaptain}
                        changeCaptain={changeCaptain}
                        isGK={squad.isGoalkeaper}
                    />
                })
            }
        </footer>
    </div>
}

export default SquadList