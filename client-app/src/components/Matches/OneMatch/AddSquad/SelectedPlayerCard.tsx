import { Dispatch, MouseEvent, SetStateAction, useRef } from "react"
import { MatchPlayer, SquadListType } from "../../types"
import styles from "./styles.module.css"

interface PropsType {
    player: MatchPlayer,
    changePlayer: (player: MatchPlayer) => void
}

const SelectedPlayerCard = ({ player, changePlayer }: PropsType) => {
    const selectItem = useRef<HTMLDivElement>(null);

   
    return <div
        className={styles.selected_player_wrapper}
        draggable
        onDragStart={(e) => {
            // console.log(e);
            
        }}
        onDrop={(e) => {
            console.log("sdgsgsf");
            
        }}
        onDragEnd={(e) => {
            // console.log(e)
        }}
        ref={selectItem}
    >
        <div 
            className={styles.selected_player_checkbox}
            onClick={() => {
                changePlayer(player)
            }}
        >

        </div>
        {player.playerName}
    </div>
}

export default SelectedPlayerCard