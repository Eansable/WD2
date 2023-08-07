import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useRouter } from "next/router"

interface PropsType {
    id: string
}

const OneUser = ({ id } : PropsType) => {
    const dispatch = useAppDispatch()
    const {oneUser, isLoading} = useAppSelector(state => state.usersReducer)
    const route = useRouter()

}

export default OneUser