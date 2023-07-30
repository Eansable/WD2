import OneMatch from "@/components/Matches/OneMatch/OneMatch"
import { useRouter } from "next/router"

const MatchPage = () => {
    const router = useRouter()
    return <OneMatch id={Number(router.query?.id)}></OneMatch>
        
}

export default MatchPage