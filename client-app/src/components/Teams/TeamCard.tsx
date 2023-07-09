import Link from "next/link";
import styles from "./styles.module.css";
import { TeamInterface } from "./types";

const TeamCard = ({ team }: { team: TeamInterface }) => {
  return (
    <Link href={`/teams/${team.id}`} className={styles.wrapper}>
      <div className={styles.logo}></div>
      <div className={styles.name}>{team.name}</div>
    </Link>
  );
};

export default TeamCard;
