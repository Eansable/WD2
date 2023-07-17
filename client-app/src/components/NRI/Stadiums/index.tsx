'use client'
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { StadiumType } from "./types"
import LocalLoader from "../../CustomElement/Loader/LocalLoader"
import CustomButton from "@/components/CustomElement/Button"
import { Form, Modal } from "antd"
import { useEffect, useState } from "react"
import CustomInput from "@/components/CustomElement/Input"
import FileLoader from "@/components/CustomElement/FileLoader"
import { addAction, getAllAction } from "./store/actions"

interface PropsType {
    stadium: StadiumType
}

interface FormProps {
    name: string,
    adress?: string,
    description?: string,
}

const StadiumNRI = ({ stadium }: PropsType) => {
    const { stadiums, isLoading } = useAppSelector(state => state.stadiumReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState(false)
    const [logo, setLogo] = useState<File>()

    const closeModal = () => {
        setOpen(false)
    }

    const saveStadium = (values: FormProps) => {
        console.log(values);
        const fd = new FormData();
        fd.append("Name", values.name)
        if (values.adress)
            fd.append("Adress", values.adress)
        if (values.description)
            fd.append("Description", values.description)
        if (logo)
            fd.append("Logo", logo)

        dispatch(addAction(fd))
    }

    useEffect(() => {
        dispatch(getAllAction())
    }, [])


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
                        rules={[
                            { required: true }
                        ]}
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
                    
                        <FileLoader onChange={(e) => e.target.files?.length ? setLogo(e.target.files[0]) : undefined}></FileLoader>
                    
                    <CustomButton type="submit">Сохранить</CustomButton>
                </Form>
            </Modal>
        </>
            : null}
    </div> : <>{LocalLoader}</>
}

export default StadiumNRI