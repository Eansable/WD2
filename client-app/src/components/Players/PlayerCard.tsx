import styles from "./styles.module.css";
import { PlayerType } from "./types";

interface PropsType {
  player: PlayerType;
}

const PlayerCard = ({ player }: PropsType) => {
  return (
    <div className={styles.card}>
      <div className={styles.foto}>Foto</div>
      <div className={styles.info}>
        {player.name}
        {player.secondName}
      </div>
    </div>
  );
};

export default PlayerCard;
