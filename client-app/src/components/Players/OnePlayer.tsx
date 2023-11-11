import Page404 from "@/pages/404"
import { OnePlayerType } from "./types"
import styles from "./styles.module.css"
import FileLoader from "../CustomElement/FileLoader"
import { ChangeEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { changeAvatatAction } from "./store/action"
import Link from "next/link"
import routes from "./routes"

interface PropsType {
    player?: OnePlayerType
}

const OnePlayer = ({ player }: PropsType) => {
    const dispatch = useAppDispatch()
    const [element, setElement] = useState(routes[0].element)
    const { roles } = useAppSelector(state => state.accountReducer)
    const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const fd = new FormData()
        if (player?.id && event.target.files?.length) {
            fd.append('champId', String(player.id))
            fd.append("newLogo", event.target.files[0])
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
                {roles.includes("admin") ? <label className={styles.change_avatar}>
                    <FileLoader
                        onChange={changeAvatar}
                    />
                    Изменить аватар
                </label> : null}
            </div>
            <div className={styles.player_banner_info}>
                <h3>
                    {player.name}
                </h3>
                <p className={styles.player_banner_team}>
                    <Link href={`teams/${player.teamId}`}>
                        <img src={player.teamLogoId ?
                            `https://localhost:44326/api/logo/GetById?id=${player.teamLogoId}`
                            : "../defaultClub.png"} />{player?.teamName}
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