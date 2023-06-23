import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useState } from "react"
import { loginAction } from "./store/actions"

const LoginPage = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.accountReducer)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = () => {
        dispatch(loginAction({
            userName: login,
            password
        }))
    }

    console.log(user);
    
    return (
        <div>
            <input onChange={(e) => setLogin(e.target.value)} value={login} />
            <input onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={loginHandler}>Войти</button>
        </div>
        )
}

export default LoginPage