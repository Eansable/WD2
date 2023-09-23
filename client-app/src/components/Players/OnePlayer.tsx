import Page404 from "@/pages/404"
import { OnePlayerType } from "./types"
import styles from "./styles.module.css"
import CustomButton from "../CustomElement/Button"
import FileLoader from "../CustomElement/FileLoader"
import { ChangeEvent, useState } from "react"
import { useAppDispatch } from "@/helpers/hooks"
import { changeAvatatAction } from "./store/action"
import Link from "next/link"
import routes from "./routes"

interface PropsType {
    player?: OnePlayerType
}

const OnePlayer = ({ player }: PropsType) => {
    const dispatch = useAppDispatch()
    const [element, setElement] = useState(routes[0].element)
    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fd = new FormData()
        if (player?.id && event.target.files?.length) {
            fd.append('playerId', String(player.id))
            fd.append("avatar", event.target.files[0])
            dispatch(changeAvatatAction(fd))
        }
    }

    return player ? <div className={styles.player_wrapper}>
        <div className={styles.player__banner}>
            <div className={styles.player_avatar}>
                <img
                    src={player.avatarId ?
                        `https://localhost:44326/api/logo/GetById?id=${player.avatarId}`
                        : "../defaultPlayer.svg"
                    }
                    className={styles.player_foto}
                />
                <label className={styles.change_avatar}>
                    <FileLoader
                        onChange={changeAvatar}
                    />
                    Изменить аватар
                </label>
            </div>
            <div className={styles.player_banner_info}>
                <h3>
                    {player.name}
                </h3>
                <p>
                    <Link href={`teams/${player.teamId}`}>
                        {player?.teamName}
                    </Link>
                </p>
            </div>
        </div>
        <section className={styles.player_tabs}>
            <header>
                {routes.map(route => {
                    return <button
                        className={`${styles.player_tab} ${element == route.element ? styles.active : ""} `}
                        onClick={() => setElement(route.element)}
                    >
                        {route.name}
                    </button>
                })}
                {element}
            </header>
        </section>
    </div> : <Page404></Page404>
}

export default OnePlayer