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
interface PropsType {
    id: number
}

const OneMatch = ({ id }: PropsType) => {
    const dispatch = useAppDispatch()
    const { oneMatch, isLoading } = useAppSelector(state => state.matchesReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [activeStartMatch, setActiveStartMatch] = useState(false)
    const [activeAddSquad, setActiveAddSquad] = useState(false)
    const [activeAddResult, setActiveAddResult] = useState(false)

    useEffect(() => {
        if (id) {
            dispatch(getByIdAction({ matchId: id }))
        }
    }, [id])

    return isLoading ? <>{LocalLoading}</> :
        <div className={styles.wrapper}>
            <MatchBanner
                match={oneMatch}

            />
            {roles.includes("admin") ?
                <ManageMatch
                    setActiveStart={setActiveStartMatch}
                    setActiveAddSquad={setActiveAddSquad}
                    setActiveAddResult={setActiveAddResult}
                />
                : null}
            {activeStartMatch ? <StartMatch></StartMatch> : null}
            {activeAddSquad ? <AddSquad></AddSquad> : null}
            {activeAddResult ? <AddResult></AddResult> : null}

        </div>
}

export default OneMatch