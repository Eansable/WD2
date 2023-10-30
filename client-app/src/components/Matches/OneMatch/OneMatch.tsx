'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useEffect, useState } from "react"
import { getByIdAction } from "../store/actions"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import MatchBanner from "./MatchBanner"
import ManageMatch from "./ManageMatch"
import styles from "./styles.module.css"
import StartMatch from "./StartMatch"
import AddSquad from "./AddSquad"
import AddResult from "./AddResult"
import Notifications from "@/helpers/Notifications"
import MatchTabs from "./MatchTabs"
interface PropsType {
    id: number
}

const OneMatch = ({ id }: PropsType) => {
    const dispatch = useAppDispatch()
    const { oneMatch, isLoading, changed } = useAppSelector(state => state.matchesReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [activeStartMatch, setActiveStartMatch] = useState(false)
    const [activeAddSquad, setActiveAddSquad] = useState(false)
    const [activeAddResult, setActiveAddResult] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(getByIdAction({ matchId: id }))
        }
    }, [id])

    useEffect(() => {
        if (oneMatch?.isLive)
            setActiveStartMatch(oneMatch.isLive)
    }, [oneMatch])

    useEffect(() => {
        if (changed) {
            Notifications.success(changed, 10)
            dispatch(getByIdAction({ matchId: id }))
        }
    }, [changed])

    return isLoading ? <>{LocalLoading}</> :
        <div className={styles.wrapper}>
            <MatchBanner
                match={oneMatch}

            />
            {oneMatch ? <MatchTabs
                match={oneMatch}
            /> : null}
            {roles.includes("admin") ?
                <ManageMatch
                    setActiveStart={setActiveStartMatch}
                    setActiveAddSquad={setActiveAddSquad}
                    setActiveAddResult={setActiveAddResult}
                    match={oneMatch}
                />
                : null}
            {activeStartMatch && (oneMatch?.isLive || !oneMatch?.isEnded) ? <StartMatch match={oneMatch} /> : null}
            {activeAddSquad ? <AddSquad id={id}></AddSquad> : null}
            {activeAddResult ? <AddResult></AddResult> : null}

        </div>
}

export default OneMatch