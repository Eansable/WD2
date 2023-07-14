'use client'
import { useAppSelector } from "@/helpers/hooks"
import { StadiumType } from "./types"
import LocalLoader from "../../CustomElement/Loader/LocalLoader"
import CustomButton from "@/components/CustomElement/Button"
import { Form, Modal } from "antd"
import { useState } from "react"
import CustomInput from "@/components/CustomElement/Input"
import FileLoader from "@/components/CustomElement/FileLoader"

interface PropsType {
    stadium: StadiumType
}

const StadiumNRI = ({ stadium }: PropsType) => {
    const { stadiums, isLoading } = useAppSelector(state => state.stadiumReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [form] = Form.useForm()

    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
    }

    const saveStadium = (values) => {
        console.log(values);
        
    }


    return !isLoading ? <div>Stadiums
        {stadiums?.map(stadium => {
            return <p>{stadium.name}</p>
        })}
        {roles.includes("admin") ? <>
            <CustomButton onClick={() => setOpen(true)}>Добавить стадион</CustomButton>
            <Modal
                open={open}
                onCancel={closeModal}
                closable={false}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={saveStadium}
                >
                    <Form.Item
                        name="name"
                        label="Название"
                    >
                        <CustomInput></CustomInput>
                    </Form.Item>
                    <Form.Item
                        label="Адресс"
                        name="adress"
                        >
                        <CustomInput></CustomInput>
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        name="description"
                    >
                        <CustomInput></CustomInput>
                    </Form.Item>
                    <Form.Item
                        label="Фото стадиона"
                        name="logo"
                    >
                        <FileLoader></FileLoader>
                    </Form.Item>
                    <CustomButton type="submit">Сохранить</CustomButton>
                </Form>
            </Modal>
        </>
            : null}
    </div> : <>{LocalLoader}</>
}

export default StadiumNRI