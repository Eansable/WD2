import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import styles from "./styles.module.css"
import CustomButton from "@/components/CustomElement/Button"
import CheckboxPlayer from "./CheckboxPlayer"
import { useState } from "react"
import { AddSquadAction } from "../store/actions"
import { MatchPlayer } from "../types"
import SquadList from "./AddSquad/SquadList"

interface PropsType {
    id: number
}

const AddSquad = ({ id }: PropsType) => {
    const dispatch = useAppDispatch()
    const { oneMatch, isLoading } = useAppSelector(state => state.matchesReducer)
    const [homeSquad, setHomeSquad] = useState<number[]>([])
    const [visitorSquad, setVisitorSquad] = useState<number[]>([])

    const checkHomePlayer = (id: number) => {
        if (!homeSquad?.includes(id)) {
            setHomeSquad([...homeSquad, id])
        } else {
            setHomeSquad(homeSquad.filter(p => p !== id))
        }
    }

    const checkVisitorPlayer = (id: number) => {
        if (!visitorSquad?.includes(id)) {
            setVisitorSquad([...visitorSquad, id])
        } else {
            setVisitorSquad(visitorSquad.filter(p => p !== id))
        }
    }

    const saveSquad = () => {
        dispatch(AddSquadAction({
            matchId: id,
            homePlayersId: homeSquad.length ? homeSquad : null,
            visitorPlayersId: visitorSquad.length ? visitorSquad : null,
        }))
    }

    const getSelectedPlayer = (func: (id: number) => void, squad: number[], player?: MatchPlayer) => {
        if (player)
            return <CheckboxPlayer
                player={player}
                onClick={func}
                isActive={squad.includes(player.playerId)}
            />

    }

    return (<>
        Выберите игроков которые учавствуют в матче:
        {oneMatch ? <SquadList
            oneMatch={oneMatch}
        /> : null}
        <div className={styles.add__squad}>
            <div className={styles.add__squad_home}>
                {oneMatch?.home?.teamPlayers ? oneMatch.home.teamPlayers
                    .filter(p => !oneMatch.isNeedSubsToProtocol || !homeSquad.includes(p.playerId))
                    .map(player =>
                        <CheckboxPlayer
                            player={player}
                            onClick={checkHomePlayer}
                            isActive={homeSquad.includes(player.playerId)}
                        />
                    ) : null}
            </div>
            <div className={styles.add__squad_visitor}>
                {oneMatch?.visitor?.teamPlayers ? oneMatch.visitor.teamPlayers.
                    filter(p => !oneMatch.isNeedSubsToProtocol || !visitorSquad.includes(p.playerId))
                    .map(player =>
                        <CheckboxPlayer
                            player={player}
                            onClick={checkVisitorPlayer}
                            isActive={visitorSquad.includes(player.playerId)}

                        />) : null}
            </div>
            {oneMatch?.isNeedSubsToProtocol ? <>
                <div className={styles.selected_players}>
                    <p>
                        Игроки стартового состава:
                    </p>
                    {homeSquad.map((id, index) => {
                        if (index <= oneMatch.playerCountOnStart)
                            return getSelectedPlayer(checkHomePlayer, homeSquad, oneMatch?.home?.teamPlayers?.find(p => p.playerId === id))
                    })}
                    <p>
                        Запасные игроки:
                    </p>
                    {homeSquad.map((id, index) => {
                        if (index > oneMatch.playerCountOnStart)
                            return getSelectedPlayer(checkHomePlayer, homeSquad, oneMatch?.home?.teamPlayers?.find(p => p.playerId === id))
                    })}
                </div>
                <div className={styles.selected_players}>
                    <p>
                        Игроки стартового состава:
                    </p>
                    {visitorSquad.map((id, index) => {
                        if (index <= oneMatch.playerCountOnStart)
                            return getSelectedPlayer(checkVisitorPlayer, visitorSquad, oneMatch?.visitor?.teamPlayers?.find(p => p.playerId === id))
                    })}
                    <p>
                        Запасные игроки:
                    </p>
                    {visitorSquad.map((id, index) => {
                        if (index > oneMatch.playerCountOnStart)
                            return getSelectedPlayer(checkVisitorPlayer, visitorSquad, oneMatch?.visitor?.teamPlayers?.find(p => p.playerId === id))
                    })}
                </div>

            </> : null}
            <div>
                <CustomButton
                    onClick={() => setHomeSquad([])}
                >
                    Сбросить
                </CustomButton>
            </div>
            <div>
                <CustomButton
                    onClick={() => setVisitorSquad([])}
                >
                    Сбросить
                </CustomButton>
            </div>
        </div>
        <CustomButton
            onClick={saveSquad}
        >
            Сохранить
        </CustomButton>
    </>
    )
}

export default AddSquad
