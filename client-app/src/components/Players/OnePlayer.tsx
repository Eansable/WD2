import Page404 from "@/pages/404"
import { PlayerType } from "./types"

interface PropsType {
    player?: PlayerType
}

const OnePlayer = ({player} : PropsType) => {

    return player ? <div></div> : <Page404></Page404>
} 

export default OnePlayer