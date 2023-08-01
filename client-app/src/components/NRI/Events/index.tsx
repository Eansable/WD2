'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { Form, Modal, Table, Upload } from "antd"
import dayjs from "dayjs"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import { useEffect, useState } from "react"
import { addAction, getAllAction } from "../Events/store/actions"
import CustomButton from "@/components/CustomElement/Button"
import CustomInput from "@/components/CustomElement/Input"
import FileLoader from "@/components/CustomElement/FileLoader"
import Notifications from "@/helpers/Notifications"
import styles from "./styles.module.css"

const EventsNRI = () => {
    const dispatch = useAppDispatch()
    const { events, isLoading, changed } = useAppSelector(state => state.eventReducer)
    const [form] = Form.useForm()

    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [logo, setLogo] = useState<File>()

    const closeModal = () => {
        setOpen(false)
        setName('')
        setShortName('')
        setLogo(undefined)
    }

    const saveEvent = () => {
        const fd = new FormData()
        if (name && shortName && logo) {
            fd.append("name", name)
            fd.append("shortName", shortName)
            fd.append("logo", logo)
            dispatch(addAction(fd))
        } else {
            Notifications.warning("Заполните все поля: Имя, сокращение и лого", 10)
        }
    }

    useEffect(() => {
        dispatch(getAllAction())
    }, [])

    useEffect(() => {
        if (changed) {
            closeModal()
            dispatch(getAllAction())
            Notifications.success(changed, 10)
        }
    }, [changed])

    return !isLoading ? <>
        <CustomButton
            onClick={() => setOpen(true)}
        >Добавить событие</CustomButton>
        <Table
            dataSource={events}
            pagination={false}
        >
            <Table.Column
                dataIndex='name'
                title="Название"
                key="name"
            />
            <Table.Column
                dataIndex='shortName'
                title="Сокращённое название"
                key="shortName"
            />
            <Table.Column
                dataIndex='logoId'
                title="Иконка"
                key="logo"
                render={(text) => <img className={styles.icon} src={`https://localhost:44326/api/logo/GetById?id=${text}`} />}
            />
            <Table.Column
                dataIndex='create'
                title="Дата создания"
                key="create"
                render={(text) => dayjs(new Date(text)).format("DD-MM-YYYY")}
            />
        </Table>
        <Modal
            open={open}
            closable={false}
            onCancel={closeModal}
            footer={null}
        >
                    <CustomInput 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <CustomInput 
                     value={shortName}
                     onChange={(e) => setShortName(e.target.value)}
                    />
                    <FileLoader 
                        onChange={e => e.target.files?.length ? setLogo(e.target.files[0]) : undefined}
                    />
                    <CustomButton
                        onClick={saveEvent}
                    >Сохранить</CustomButton>

        </Modal>
    </>
        : <>{LocalLoading}</>
}

export default EventsNRI