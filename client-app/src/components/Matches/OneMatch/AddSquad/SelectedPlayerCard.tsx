'use client'

import { Dispatch, MouseEvent, SetStateAction, useRef } from "react"
import { MatchPlayer, SquadListType } from "../../types"
import styles from "./styles.module.css"

interface PropsType {
    player?: MatchPlayer,
    changePlayer: (player: MatchPlayer) => void,
    disabled?: boolean,
    isSelected?: boolean,
    isGK?: boolean,
    isCaptain?: boolean,
    changeCaptain?: (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, playerId: number) => void
}

const SelectedPlayerCard = ({
    player,
    changePlayer,
    changeCaptain,
    disabled = false,
    isSelected = false,
    isCaptain = false,
    isGK = false
}: PropsType) => {
    const selectItem = useRef<HTMLDivElement>(null);

    return player ? <div
        className={`
        ${styles.selected_player_wrapper}
        ${disabled ? styles.selected_player_wrapper_disabled : ""}
        `}
        draggable={!disabled}
        onDragStart={(e) => {
        }}
        ref={selectItem}
    >
        <div
            className={`
                ${styles.selected_player_checkbox}
                ${isSelected ? styles.selected_player_checkbox_active : ""}
             `}
            onClick={() => {
                changePlayer(player)
            }}
        >
            <img src={isSelected ? "/checkbox-active.svg" : "/checkbox.svg"} />
        </div>
        <div className={styles.selected_player_info}>
            <img
                src={player.avatarId ?
                    `https://localhost:44326/api/logo/GetById?id=${player.avatarId}`
                    : "../defaultPlayer.svg"
                }
            />
            <div
                className={styles.selected_player_number}
            >
                {player?.number || "-"}
            </div>
            <div className={styles.selected_player_name}>
                {`${player.playerName} ${isGK ? "(В)" : ""} ${isCaptain ? "(К)" : ""} `}
            </div>
            {isSelected ? <div
                className={styles.selected_player_isCaptain}
                onClick={(e) => {
                    if (changeCaptain)
                        changeCaptain(e, player.playerId)
                }}
            >
                {"Капитан:"} <img
                    src={isCaptain ? "/checkbox-active.svg" : "/checkbox.svg"}
                />
            </div> : null}
        </div>
    </div> : null
}

export default SelectedPlayerCard