import { useRouter } from "next/router"

const OneNews = () => {
    const router = useRouter()
    console.log(router);
     
    return (<>News: {router?.query?.id} </>)
}

export default OneNews