import Page404 from "@/pages/404"
import { OnePlayerType } from "./types"
import styles from "./styles.module.css"
import CustomButton from "../CustomElement/Button"
import FileLoader from "../CustomElement/FileLoader"
import { ChangeEvent, useState } from "react"
import { useAppDispatch } from "@/helpers/hooks"
import { changeAvatatAction } from "./store/action"

interface PropsType {
    player?: OnePlayerType
}

const OnePlayer = ({ player }: PropsType) => {
    const dispatch = useAppDispatch()
    const [avatar, setAvatar] = useState<File>()

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
                <FileLoader
                    onChange={changeAvatar}
                />
            </div>
            <div>{player.name} {player.birthday?.toString()} {player.goalCount} {player.yellowCardCount} </div>
        </div>

    </div> : <Page404></Page404>
}

export default OnePlayer