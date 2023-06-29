import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useState } from "react"
import { loginAction } from "./store/actions"
import NotFound from "../NotFound"

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const { user, roles } = useAppSelector(state => state.accountReducer)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = () => {
        dispatch(loginAction({
            userName: login,
            password
        }))
    }

    return (
        <div>
        {
            roles.length === 0 ? 
            <>
            <input onChange={(e) => setLogin(e.target.value)} value={login} />
            <input onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={loginHandler}>Войти</button>
            </>
            : <NotFound></NotFound>
        }
            </div>
            )
}

export default LoginPage