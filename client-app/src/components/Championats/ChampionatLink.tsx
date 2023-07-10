import Link from "next/link"
import { ChampionatType } from "./types"

interface PropsType {
    championat: ChampionatType
}

const ChampionatLink = ({championat}: PropsType) => {
    return <Link href={`/championats/${championat.id}`}>{championat.name}</Link>
}

export default ChampionatLink