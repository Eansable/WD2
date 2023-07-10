import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import LocalLoader from "../CustomElement/Loader/LocalLoader"
import ChampionatLink from "./ChampionatLink"
import CustomButton from "../CustomElement/Button"
import { DatePicker, Form, Modal } from "antd"
import CustomInput from "../CustomElement/Input"
import { useState } from "react"

const ChampionatList = () => {
    const dispatch = useAppDispatch()
    const { isLoading, championats, changed } = useAppSelector(state => state.championatReducer)
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
        form.resetFields()
    }

    return !isLoading ? <div>
        {championats?.map(champ => {
            return <ChampionatLink
                championat={champ}
            />
        })}
        <CustomButton onClick={()=> setOpen(true)}>Создать чемпионат</CustomButton>
        <Modal
            open={open}
            onCancel={closeModal}
            closable={false}
>
            <Form
                form={form}
            >
                <Form.Item
                    name="name"
                >
                    <CustomInput placeholder="Введите название чемпионата"></CustomInput>
                </Form.Item>
                <Form.Item
                    name="format"
                >
                    <CustomInput type="number"></CustomInput>
                </Form.Item>
                <Form.Item
                    name="playersCount"
                >
                    <CustomInput
                        type="number"
                    ></CustomInput>
                </Form.Item>
                <Form.Item
                    name="startDate"
                >
                    <DatePicker></DatePicker>
                </Form.Item>
                <Form.Item
                    name="endDate"
                >
                    <DatePicker ></DatePicker>
                </Form.Item>
            </Form>
        </Modal>
    </div> : <>{LocalLoader}</>
}

export default ChampionatList