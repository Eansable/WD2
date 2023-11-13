import { MatchPlayer } from "../types"
import styles from "./styles.module.css"

interface PropsType {
    player: MatchPlayer,
    onClick: (id: number) => void,
    isActive: boolean
}

const CheckboxPlayer = ({ player, onClick, isActive }: PropsType) => {
    return (
        <div
            className={styles.checkbox}
            onClick={() => onClick(player.playerId)}
        >
            <img src={isActive ? "/checkbox-active.svg" : "/checkbox.svg"} />
            {player.playerName}
        </div>
    )
}

export default CheckboxPlayer