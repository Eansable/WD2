import Page404 from "@/pages/404"
import { OnePlayerType } from "./types"
import styles from "./styles.module.css"

interface PropsType {
    player?: OnePlayerType
}

const OnePlayer = ({ player }: PropsType) => {

    return player ? <div className={styles.player_wrapper}>
        <div className={styles.player__banner}>
            <div></div>
            <div>{player.name} {player.birthday?.toString()} {player.goalCount} {player.yellowCardCount} </div>
        </div>

    </div> : <Page404></Page404>
}

export default OnePlayer