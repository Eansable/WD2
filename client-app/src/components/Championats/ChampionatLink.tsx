import Link from "next/link"
import { ChampionatType } from "./types"
import styles from "./styles.module.css"
import CustomButton from "../CustomElement/Button"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { deleteAction } from "./store/actions"
import { useReducer } from "react"

interface PropsType {
    championat: ChampionatType
}

const ChampionatLink = ({ championat }: PropsType) => {
    const dispatch = useAppDispatch()
    const { roles } = useAppSelector(state => state.accountReducer)

    const deleteChampionat = () => {
        dispatch(deleteAction({ id: championat.id }))
    }

    return <Link href={`/championats/${championat.id}`} className={styles.champ__link}>
        <div className={styles.link__logo}>
            {championat.logoId ?
                <img src={`https://localhost:44326/api/logo/GetById?id=${championat.logoId}`} />
                :
                <img src='./defaultLeague.png' />}

        </div>
        {championat.name}
        {roles.includes("admin") ? <CustomButton onClick={deleteChampionat}>Удалить</CustomButton> : null}
    </Link>
}

export default ChampionatLink