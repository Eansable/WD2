import ListTeam from "@/components/Teams/ListTeam"
import { useAppSelector } from "@/helpers/hooks"

const Teams = () => {
    const { roles } = useAppSelector(state => state.accountReducer)

    return <ListTeam />
}

export default Teams