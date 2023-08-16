import { getByIdAction } from "@/components/Players/store/action"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useRouter } from "next/router"
import { useEffect } from "react"
import LocalLoading from "../../components/CustomElement/Loader/LocalLoader"
import OneNews from "../news/[id]"
import OnePlayer from "@/components/Players/OnePlayer"


const OnePlayerPage = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { onePlayer, isLoading } = useAppSelector(state => state.PlayersReducer)

    useEffect(() => {
        if (router.query?.id)
            dispatch(getByIdAction({ playerId: router.query?.id }))
    }, [router.query])
    return !isLoading ? <OnePlayer player={onePlayer}></OnePlayer> : <>{LocalLoading}</>
}

export default OnePlayerPage