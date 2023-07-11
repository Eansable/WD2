import Link from "next/link"
import { ChampionatType } from "./types"
import styles from "./styles.module.css"

interface PropsType {
    championat: ChampionatType
}

const ChampionatLink = ({ championat }: PropsType) => {
    return <Link href={`/championats/${championat.id}`} className={styles.champ__link}>
            <div className={styles.link__logo}>Logo </div>
            {championat.name}
    </Link>
}

export default ChampionatLink