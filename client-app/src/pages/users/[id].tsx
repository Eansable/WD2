import OneUser from "@/components/Managment/Users/OneUser"
import { useRouter } from "next/router"

const User = () => {
    const router = useRouter()
    return<div>{router.query?.id}
        <OneUser id={router.query?.id} />
    </div>
}

export default User