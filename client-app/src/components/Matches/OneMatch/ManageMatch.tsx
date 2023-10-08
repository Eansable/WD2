import CustomButton from "@/components/CustomElement/Button"
import styles from "./styles.module.css"
import { Dispatch, SetStateAction, useEffect } from "react"
import { MatchType } from "../types"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { deleteMatcAction } from "../store/actions"
import { useRouter } from "next/navigation"
import { Popconfirm } from "antd"

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
    const dispatch = useAppDispatch()
    const { changedDeleted } = useAppSelector(state => state.matchesReducer)
    const router = useRouter()
    useEffect(() => {
        if (changedDeleted)
            router.back()
    }, [changedDeleted])
    return <div className={styles.manage}>
        {match?.isLive || !match?.isEnded ? <CustomButton
            onClick={() => setActiveStart(true)}
        >
            Начать матч
        </CustomButton> : null}
        {!match?.isLive || !match?.isEnded ? <Popconfirm
            title="Вы действительно хотите удалить матч?"
            onConfirm={() => dispatch(deleteMatcAction({
                matchId: match?.id
            }))}
            onCancel={() => null}
        >
            <CustomButton
            >
                Удалить матч
            </CustomButton>
        </Popconfirm>
            : null}
        <CustomButton
            onClick={() => setActiveAddResult(true)}
        >
            Внести результат
        </CustomButton>
        <CustomButton
            onClick={() => setActiveAddSquad(true)}
        >
            Добавить стартовый состав
        </CustomButton>
    </div>
}

export default ManageMatch