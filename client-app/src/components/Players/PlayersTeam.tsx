import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useEffect, useState } from "react"
import { getByTeamIdAction, addAction } from "./store/action"
import LocalLoader from "../CustomElement/Loader/LocalLoader"
import { DatePicker, Form, Modal } from "antd"
import CustomButton from "../CustomElement/Button"
import CustomInput from "../CustomElement/Input"
import { PlayerFormType } from "./types"

interface PropsType {
    teamId: number
}

const PlayersTeam = ({ teamId }: PropsType) => {
    const dispatch = useAppDispatch()
    const { players, isLoading } = useAppSelector(state => state.PlayersReducer)
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
        form.resetFields()
    }

    const savePlayer = (values: PlayerFormType) => {
        dispatch(addAction({...values, teamId}))
    }

    useEffect(() => {
        dispatch(getByTeamIdAction({ teamId }))
    }, [])

    return isLoading ? <div>
        {players ? players?.map(player => {
            return <div>{player.name} {player.secondName} {player.middleName}

            </div>
        })
            : <h2>Ни одного игрока ещё не добавленно в команду </h2>}
        <footer>
            <CustomButton onClick={() => setOpen(true)}>
                Добавить игрока в команду
            </CustomButton>
        </footer>
        <Modal
            open={open}
            onCancel={closeModal}
        >
            <Form
                form={form}
                onFinish={savePlayer}
            >
                <Form.Item
                    name="name"
                    label="Имя"
                >
                    <CustomInput></CustomInput>
                </Form.Item>
                <Form.Item
                    name="secondName"
                    label="Фамилия"
                >
                    <CustomInput></CustomInput>
                </Form.Item>
                <Form.Item
                    name="middleName"
                    label="Отчество"
                >
                    <CustomInput></CustomInput>
                </Form.Item>
                <Form.Item
                    name="birthday"
                    label="Имя"
                >
                    <DatePicker></DatePicker>
                </Form.Item>
                <CustomButton type="submit">Сохранить</CustomButton>
            </Form>
        </Modal></div> : <>{LocalLoader}</>
}

export default PlayersTeam