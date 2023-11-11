import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useEffect, useState } from "react"
import { registerAction } from '../components/Account/store/actions'
import Notifications from "@/helpers/Notifications"
import CustomInput from "@/components/CustomElement/Input"
import styles from "./styles.module.css"
import CustomButton from "@/components/CustomElement/Button"
import { Select } from "antd"
import { getAllTeamAction } from "@/components/Teams/store/actions"

const Registration = () => {
    const dispatch = useAppDispatch()
    const { roles } = useAppSelector(state => state.accountReducer)
    const { teams } = useAppSelector(state => state.teamReducer)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [mail, setMail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [teamId, setTeamID] = useState(null)
    const [errors, setErrors] = useState<string[]>([])

    const handleClick = () => {
        if (login && password) {
            if (password === confirmedPassword) {
                dispatch(registerAction({
                    userName: login,
                    password,
                    email: mail,
                    userType: 4,
                    ownerName: name,
                    phone,
                    teamId
                }))
            } else {
                Notifications.error("Подтверждённый пароль не совпадает с введённым паролем")
                !errors.includes("confirmedPassword") ? setErrors([...errors, "confirmedPassword"]) : null
            }
        }
        else {
            Notifications.error("Придумайте логин и пароль!")
            const errorsTemp = !login ? ["login"] : []
            !password ? errorsTemp.push("password") : null
            setErrors(errorsTemp)
        }
    }

    useEffect(() => {
        if (!teams.length) {
            dispatch(getAllTeamAction())
        }
    }, [])

    return (
        <div
            className={styles.registration}
            onKeyUp={(e) => {
                if (e.code === "Enter")
                    handleClick()
            }}
        >
            <label className={errors.includes("login") ? styles.error_input_login : ''}>
                Логин:
                <CustomInput
                    onChange={(e) => {
                        setLogin(e.target.value)
                        setErrors(errors.filter(e => e !== "login"))
                    }}
                    onFocus={(e) => {
                        setErrors(errors.filter(e => e !== "login"))
                    }}
                    value={login}
                    type="text"
                    placeholder="Введите логин"
                />
            </label>
            <label className={errors.includes("password") ? styles.error_input_password : ''}>
                Пароль:
                <CustomInput
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErrors(errors.filter(e => e !== "password"))

                    }}
                    onFocus={(e) => {
                        setErrors(errors.filter(e => e !== "password"))
                    }}
                    placeholder="Введите пароль"

                />
            </label>
            <label className={errors.includes("confirmedPassword") ? styles.error_input : ''}>
                Подтвердите пароль:
                <CustomInput
                    type="password"
                    value={confirmedPassword}
                    placeholder="Подтвердите пароль"
                    onChange={(e) => {
                        setConfirmedPassword(e.target.value)
                        setErrors(errors.filter(e => e !== "confirmedPassword"))
                    }}
                    onFocus={(e) => {
                        setErrors(errors.filter(e => e !== "confirmedPassword"))
                    }}
                />
            </label>
            <label>
                ФИО:
                <CustomInput
                    type="text"
                    placeholder="Введите ФИО"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Электронная почта:
                <CustomInput
                    type="email"
                    placeholder="Введите электронную почту"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
            </label>
            <label>
                Телефон:
                <CustomInput
                    type="text"
                    placeholder="Введите телефон в формате +375ххххххххх"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>
            {roles.includes("admin") ? <label>
                Капитан команды:
                <Select
                    placeholder="Выберети команду"
                    value={teamId}
                    onChange={(value) => setTeamID(value)}
                > 
                    {teams ? teams.map( team => {
                        return <Select.Option
                            key={team.id}
                            value={team.id}
                        >
                            {team.name}
                        </Select.Option>
                    }
                    ) : null}
                </Select>
            </label> : null}
            <footer>

                <CustomButton
                    onClick={handleClick}
                > Зарегистрироваться</CustomButton>
            </footer>
        </div>
    )
}

export default Registration