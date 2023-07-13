import { useAppSelector } from "@/helpers/hooks"
import { StadiumType } from "./types"

interface PropsType {
    stadium: StadiumType
}

const StadiumNRI = ({ stadium }: PropsType) => {
    const { stadiums, isLoading } = useAppSelector(state => state.stadiumReducer)
    return <div>Stadium</div>
}

export default StadiumNRI