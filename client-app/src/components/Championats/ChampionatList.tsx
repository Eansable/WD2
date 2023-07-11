'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import LocalLoader from "../CustomElement/Loader/LocalLoader"
import ChampionatLink from "./ChampionatLink"
import CustomButton from "../CustomElement/Button"
import { DatePicker, Form, InputNumber, Modal } from "antd"
import CustomInput from "../CustomElement/Input"
import { useEffect, useState } from "react"
import { addAction, getAllAction } from "./store/actions"
import { AddChampFormType } from "./types"
import styles from "./styles.module.css"

const ChampionatList = () => {
    const dispatch = useAppDispatch()
    const { isLoading, championats, changed } = useAppSelector(state => state.championatReducer)
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
        form.resetFields()
    }

    const getAllChamps = () => {
        dispatch(getAllAction())
    }

    const saveChampionat = (values: AddChampFormType) => {
        dispatch(addAction(values))
    }

    useEffect(() => {
        getAllChamps()
    }, [])

    useEffect(() => {
        if (changed) {
            closeModal()
            getAllChamps()
        }
    }, [changed])

    return !isLoading ? <div className={styles.wrapper} >
        <div className={styles.champ__list}>
            {championats?.map(champ => {
                return <ChampionatLink
                    championat={champ}
                />
            })}
        </div>
        <footer>
            <CustomButton onClick={() => setOpen(true)}>Создать чемпионат</CustomButton>
        </footer>
        <Modal
            open={open}
            onCancel={closeModal}
            closable={false}
            footer={null}
        >
            <Form
                form={form}
                onFinish={saveChampionat}
            >
                <Form.Item
                    name="name"
                >
                    <CustomInput placeholder="Введите название чемпионата"></CustomInput>
                </Form.Item>
                <Form.Item
                    name="format"
                >
                    <InputNumber></InputNumber>
                </Form.Item>
                <Form.Item
                    name="playersCount"
                >
                    <InputNumber></InputNumber>
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
                <CustomButton type="submit">Сохранить</CustomButton>
            </Form>
        </Modal>
    </div> : <>{LocalLoader}</>
}

export default ChampionatList