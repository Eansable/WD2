import { Dispatch, MouseEvent, SetStateAction, useRef } from "react"
import { MatchPlayer, SquadListType } from "../../types"
import styles from "./styles.module.css"

interface PropsType {
    player?: MatchPlayer,
    changePlayer: (player: MatchPlayer) => void,
    disabled?: boolean,
    isSelected?: boolean
}

const SelectedPlayerCard = ({
    player,
    changePlayer,
    disabled = false,
    isSelected = false
}: PropsType) => {
    const selectItem = useRef<HTMLDivElement>(null);

    return player ? <div
        className={`
        ${styles.selected_player_wrapper}
        ${!disabled ? styles.selected_player_wrapper_disabled : ""}
        `}
        draggable={!disabled}
        onDragStart={(e) => {
            // console.log(e);

        }}
        ref={selectItem}
    >
        <div
            className={`${styles.selected_player_checkbox} ${styles.selected_player_checkbox_active}`}
            onClick={() => {
                changePlayer(player)
            }}
        >
            <img src={isSelected ? "/checkbox-active.svg" : "/checkbox.svg"} />
        </div>
        {player.playerName}
    </div> : null
}

export default SelectedPlayerCard