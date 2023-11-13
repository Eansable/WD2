import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import styles from "./styles.module.css"
import CustomButton from "@/components/CustomElement/Button"
import CheckboxPlayer from "./CheckboxPlayer"
import { useState } from "react"
import { AddSquadAction } from "../store/actions"

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

    const getBlockSelectedPlayer = (players: [number], start: number, end: number) => {
        for (let i = start; i < end; i++ ) {
            
        }
    }

    return (<>
        Выберите игроков которые учавствуют в матче:
        <div className={styles.add__squad}>
            <div className={styles.add__squad_home}>
                {oneMatch?.home?.teamPlayers ? oneMatch.home.teamPlayers.filter(p => !oneMatch.isNeedSubsToProtocol || !homeSquad.includes(p.playerId)).map(player =>
                    <CheckboxPlayer
                        player={player}
                        onClick={checkHomePlayer}
                        isActive={homeSquad.includes(player.playerId)}
                    />
                ) : null}
            </div>
            <div className={styles.add__squad_visitor}>
                {oneMatch?.visitor?.teamPlayers ? oneMatch.visitor.teamPlayers.map(player =>
                    <CheckboxPlayer
                        player={player}
                        onClick={checkVisitorPlayer}
                        isActive={visitorSquad.includes(player.playerId)}

                    />) : null}
            </div>
            {oneMatch?.isNeedSubsToProtocol ? <>
                <div>
                    Игроки стартового состава:

                    Запасные игроки:
                </div>
                <div>
                    Игроки стартового состава:

                    Запасные игроки:
                </div>
            </> : null}
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

const CheckBoxPlayer = () => {
    return
}