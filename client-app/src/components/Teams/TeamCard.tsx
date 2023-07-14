import Link from "next/link";
import styles from "./styles.module.css";
import { TeamInterface } from "./types";
import { useAppSelector } from "@/helpers/hooks";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";


interface PropsType {
  team: TeamInterface,
  setEditTeam: Dispatch<SetStateAction<TeamInterface | undefined>>
}

const TeamCard = ({ team, setEditTeam }: PropsType) => {
  const { roles } = useAppSelector(state => state.accountReducer)
  const router = useRouter()
  return (
    <div onClick={(e) => router.push(`/teams/${team.id}`)} className={styles.wrapper}>
      <div className={styles.logo}>
        {team.logoId ? <img src={`https://localhost:44326/api/logo/GetById?id=${team?.logoId}`}></img> : null}
      </div>
      <div className={styles.name}>{team.name}</div>
      {roles.length > 0 ? <div className={styles.card__manage}>
        <div onClick={(e) => {
          e.stopPropagation()
          setEditTeam(team)
        }}>
          <img src="./EditPen.svg" />
        </div>
        <div>
          <img src="./DeleteCross.svg" />
        </div>
      </div> : null}
    </div>
  );
};

export default TeamCard;
