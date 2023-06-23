import { useAppDispatch } from "@/helpers/hooks"
import { useState } from "react"
import { registerAction } from '../components/Account/store/actions'

const Registration = () => {
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')

    const handleClick = () => {
        dispatch(registerAction({
            userName: login,
            password,
            email: mail,
            userType: 4
        }))
    }

    return (
        <div>
            <input
                onChange={(e) => setLogin(e.target.value)}
                value={login}
                type="text"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
            />
            <button 
                onClick={handleClick}
            > Зарегистрироваться</button>
        </div>
    )
}

export default Registration