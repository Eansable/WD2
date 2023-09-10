import styles from "./styles.module.css";
import { PlayerType } from "./types";

interface PropsType {
  player: PlayerType;
}

const PlayerCard = ({ player }: PropsType) => {
  return (
    <div className={styles.card}>
      <div className={styles.foto}><img src="../defaultPlayer.svg" /></div>
      <p className={styles.number}>12</p>
      <p className={styles.name}>
        {player.name} {player.secondName}
      </p>
      <p className={styles.age}>25</p>
    </div>
  );
};

export default PlayerCard;
