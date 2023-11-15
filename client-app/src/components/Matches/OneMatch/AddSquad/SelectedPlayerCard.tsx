import { MatchPlayer } from "../../types"

interface PropsType {
    player: MatchPlayer
}

const SelectedPlayerCard = ({player}: PropsType) => {
    return <div>
        {player.playerName}
    </div>
}

export default SelectedPlayerCard