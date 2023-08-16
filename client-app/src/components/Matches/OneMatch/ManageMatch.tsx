import CustomButton from "@/components/CustomElement/Button"
import styles from "./styles.module.css"
import { Dispatch, SetStateAction } from "react"
import { MatchType } from "../types"

interface PropsType {
    setActiveStart: Dispatch<SetStateAction<boolean>>,
    setActiveAddSquad: Dispatch<SetStateAction<boolean>>,
    setActiveAddResult: Dispatch<SetStateAction<boolean>>,
    match?: MatchType
}

const ManageMatch = ({
    setActiveAddResult,
    setActiveAddSquad,
    setActiveStart,
    match
}: PropsType) => {
    return <div className={styles.manage}>
        {match?.isLive || !match?.isEnded ? <CustomButton
            onClick={() => setActiveStart(true)}
        >Начать матч</CustomButton> : null}
        <CustomButton
            onClick={() => setActiveAddResult(true)}
        >Внести результат</CustomButton>
        <CustomButton
            onClick={() => setActiveAddSquad(true)}
        >Добавить стартовый состав</CustomButton>
    </div>
}

export default ManageMatch