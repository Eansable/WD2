import { useRouter } from "next/router"

const OneNews = () => {
    const router = useRouter()
     
    return (<>News: {router?.query?.id} </>)
}

export default OneNews