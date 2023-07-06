import styles from "./styles.module.css"

const TeamCard = ({ team }: {team : TeamInterface}) => {
    return <div className={styles.wrapper}>
            <div className={styles.logo}></div>
            <div className={styles.name}>{team.name}</div>
         </div>
}

export default TeamCard