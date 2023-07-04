import { useAppSelector } from "@/helpers/hooks"

const Account = () => {
  const { user } = useAppSelector(state => state.accountReducer)

  return (<section>{user.userName}</section>)
}

export default Account