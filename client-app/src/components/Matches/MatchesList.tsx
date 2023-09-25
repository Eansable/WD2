'use client'

import MatchItem from "./MatchItem"
import { MatchType } from "./types"
import styles from "./styles.module.css"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { getMatchesByChampIdAction } from "./store/actions"
import Notifications from "@/helpers/Notifications"

interface PropsType {
    matches?: MatchType[],
    isResult: boolean,
    champId: number
}

const MatchesList = ({ matches, isResult, champId }: PropsType) => {
    const dispatch = useAppDispatch()
    const { changed } = useAppSelector(state => state.matchesReducer)

    const getMatches = () => {
        dispatch(getMatchesByChampIdAction({
            champId: Number(champId),
            isEndedMatches: isResult
        }
        ))
    }

    useEffect(() => {
        if (changed) {
            getMatches()
            Notifications.success(changed, 10)
        }
    }, [changed])

    useEffect(() => {
        getMatches()
    }, [isResult])



    return <div className={styles.match__list}>
        {matches ?
            matches.map(match => <MatchItem match={match}></MatchItem>)
            : <p>Матчей нет</p>
        }
    </div>
}

export default MatchesList