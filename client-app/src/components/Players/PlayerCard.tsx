"use client"

import Link from "next/link";
import styles from "./styles.module.css";
import { PlayerType } from "./types";
import { useAppSelector } from "@/helpers/hooks";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import getPlayerAge from "@/helpers/getAge";

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
        <img src={player.avatarId ? `https://localhost:44326/api/logo/GetById?id=${player.avatarId}` : "../defaultPlayer.svg"} />
      </div>
      <p className={styles.number}>{player?.number ? player.number : "Б/Н"}</p>
      <Link href={`/players/${player.id}`} className={styles.card_link}>
        <p className={styles.name}>
          {player.name} {player.secondName}
        </p>
      </Link>
      <p className={styles.age}>{getPlayerAge(player.birthday ? new Date(player.birthday) : new Date())}</p>
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
