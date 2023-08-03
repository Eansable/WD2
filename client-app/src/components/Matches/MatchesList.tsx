'use client'

import MatchItem from "./MatchItem"
import { MatchType } from "./types"
import styles from "./styles.module.css"
import { useEffect } from "react"
import { useAppDispatch } from "@/helpers/hooks"
import { getMatchesByChampIdAction } from "./store/actions"

interface PropsType {
    matches?: MatchType[],
    isResult: boolean,
    champId: number
}

const MatchesList = ({ matches, isResult, champId }: PropsType) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMatchesByChampIdAction({
            champId: Number(champId),
            isEndedMatches: isResult
        }
        ))
    }, [isResult])

    return <div className={styles.match__list}>
        {matches ?
            matches.map(match => <MatchItem match={match}></MatchItem>)
            : <p>Матчей нет</p>
        }
    </div>
}

export default MatchesList