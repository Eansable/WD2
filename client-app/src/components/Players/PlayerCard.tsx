"use client"

import Link from "next/link";
import styles from "./styles.module.css";
import { PlayerType } from "./types";
import { useAppSelector } from "@/helpers/hooks";
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from "react";
import CustomInput from "../CustomElement/Input";
import ManagePlayer from "./ManagePlayer";

interface PropsType {
  player: PlayerType,
  setEditPlayer?: Dispatch<SetStateAction<PlayerType | undefined>>,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const PlayerCard = ({ player, setEditPlayer, setOpen }: PropsType) => {
  const { roles } = useAppSelector(state => state.accountReducer)
  const [change, setChange] = useState(false)

  const changePlayer = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setEditPlayer && setEditPlayer(player)
    setOpen(true)
  }

  return (
    <div className={styles.card}>
        <div className={styles.foto}>
          <img src="../defaultPlayer.svg" />
        </div>
        <p className={styles.number}>{player?.number ? player.number : "Б/Н"}</p>
        <Link href={`/players/${player.id}`} className={styles.card_link}>
        <p className={styles.name}>
          {player.name} {player.secondName}
        </p>
        </Link>
        <p className={styles.age}>25</p>
        {roles.includes("admin") ?
          <img
            className={styles.manage_player}
            src="../EditPen.svg"
            onClick={changePlayer}
          />
          : null}
    </div>

  );
};

export default PlayerCard;
