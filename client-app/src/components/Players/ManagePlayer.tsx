import { DatePicker, Form, Select } from "antd"
import CustomInput from "../CustomElement/Input"
import CustomButton from "../CustomElement/Button"
import { PlayerFormType, PlayerType } from "./types"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { addAction, changeAction } from "./store/action"
import { useEffect } from "react"
import { getAllTeamAction } from "../Teams/store/actions"
import dayjs from "dayjs"
import styles from "./styles.module.css"

interface PropsType {
    editPlayer?: PlayerType,
    teamId?: number
}

const ManagePlayer = ({ editPlayer, teamId }: PropsType) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const { teams } = useAppSelector(state => state.teamReducer)
    const { roles } = useAppSelector(state => state.accountReducer)


    const addPlayer = (values: PlayerFormType) => {
        dispatch(addAction({ ...values, teamId }))
    }

    const changePlayer = (values: PlayerFormType) => {
        dispatch(changeAction({
            ...values,
            playerId: editPlayer?.id,
        }))
    }

    const savePlayer = (values: PlayerFormType) => {
        if (editPlayer) {
            changePlayer(values)
        } else {
            addPlayer(values)
        }
    }

    useEffect(() => {
        if (teams.length == 0)
            dispatch(getAllTeamAction())
    }, [])

    useEffect(() => {
        if (editPlayer){
            
            form.setFieldValue("birthDay", dayjs(editPlayer.birthday || "1970-01-01"))
            form.setFieldsValue(editPlayer)}
    }, [editPlayer])

    return (
        <Form
            form={form}
            onFinish={savePlayer}
        >
            <Form.Item
                name="name"
                label="Имя"
            >
                <CustomInput />
            </Form.Item>
            <Form.Item
                name="secondName"
                label="Фамилия"
            >
                <CustomInput />
            </Form.Item>
            <Form.Item
                name="middleName"
                label="Отчество"
            >
                <CustomInput
                />
            </Form.Item>
            <Form.Item
                name="number"
                label="Номер игрока"
            >
                <CustomInput
                    type="number"
                    pattern="[0-9]*"
                    className={styles.number_input}
                />
            </Form.Item>
            <Form.Item
                name="birthDay"
                label="Дата рождения"
            >
                <DatePicker />
            </Form.Item>
            {(editPlayer && roles.includes("admin")) ? <Form.Item
                name="teamId"
                label="Изменить команду"
            >
                <Select>
                    {teams.map(team => {
                        console.log(team);

                        return <Select.Option
                            key={team.id}
                            value={team.id}
                        >
                            {team.name}
                        </Select.Option>
                    })}
                </Select>
            </Form.Item> : null}
            <CustomButton
                type="submit"
            >
                Сохранить
            </CustomButton>
        </Form>
    )
}

export default ManagePlayer