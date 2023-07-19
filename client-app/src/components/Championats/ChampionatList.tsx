import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import LocalLoader from "../CustomElement/Loader/LocalLoader"
import ChampionatLink from "./ChampionatLink"
import { useEffect } from "react"
import { getAllAction } from "./store/actions"
import styles from "./styles.module.css"
import Link from "next/link"

const ChampionatList = () => {
    const dispatch = useAppDispatch()
    const { isLoading, championats } = useAppSelector(state => state.championatReducer)

    const getAllChamps = () => {
        dispatch(getAllAction())
    }

    useEffect(() => {
        getAllChamps()
    }, [])

    return !isLoading ? <div className={styles.wrapper} >
        <div className={styles.champ__list}>
            {championats?.map(champ => {
                return <ChampionatLink
                    championat={champ}
                />
            })}
        </div>
        <footer>
            <Link href="/championats/create">Создать чемпионат</Link>
        </footer>
    </div> : <>{LocalLoader}</>
}

export default ChampionatList