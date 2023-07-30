import CustomButton from "@/components/CustomElement/Button"
import styles from "./styles.module.css"
import { Dispatch, SetStateAction } from "react"

interface PropsType {
    setActiveStart: Dispatch<SetStateAction<boolean>>,
    setActiveAddSquad: Dispatch<SetStateAction<boolean>>,
    setActiveAddResult: Dispatch<SetStateAction<boolean>>
}

const ManageMatch = ({
    setActiveAddResult,
    setActiveAddSquad,
    setActiveStart }: PropsType) => {
    return <div className={styles.manage}>
        <CustomButton
            onClick={() => setActiveStart(true)}
        >Начать матч</CustomButton>
        <CustomButton
            onClick={() => setActiveAddResult(true)}
        >Внести результат</CustomButton>
        <CustomButton
            onClick={() => setActiveAddSquad(true)}
        >Добавить стартовый состав</CustomButton>
    </div>
}

export default ManageMatch