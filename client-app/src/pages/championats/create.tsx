'use client'

import { addAction } from "@/components/Championats/store/actions"
import { ChampionatType } from "@/components/Championats/types"
import CustomButton from "@/components/CustomElement/Button"
import FileLoader from "@/components/CustomElement/FileLoader"
import CustomInput from "@/components/CustomElement/Input"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { Checkbox, DatePicker, Form, Select } from "antd"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"
import loader from "@/components/CustomElement/Loader/LocalLoader"

interface PropsType {
    championat?: ChampionatType
}

const CreateChampionat = ({ championat }: PropsType) => {
    const dispatch = useAppDispatch()
    const { changed, isLoading, addedId } = useAppSelector(state => state.championatReducer)
    const { teams } = useAppSelector(state => state.teamReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [form] = Form.useForm()
    const router = useRouter()
    const [logo, setLogo] = useState<File>()

    function saveChampionat(values: ChampionatType) {
        const fd = new FormData()
        let key: keyof ChampionatType
        for (key in values) {
            fd.append(key, String(values[key]))
        }
        if (logo)
            fd.append('logo', logo)
        dispatch(addAction(fd))
    }

    useEffect(() => {
        if (changed) {
            router.push('/championats/' + addedId)
        }
    }, [changed])

    useEffect(() => {
        if (championat) {
            const values: ChampionatType = form.getFieldsValue()
            let key: keyof ChampionatType
            for (key in values) {
                form.setFieldValue(key, championat[key])
            }
        }
    }, [])

    return roles.includes("admin") ? <div className={styles.wrapper}>
        <Form form={form} onFinish={saveChampionat}>
            <Form.Item
                name="name"
                label="Название чемпионата:"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <CustomInput></CustomInput>
            </Form.Item>
            <Form.Item
                label="Выберите логотип чемпионата:"

            >
                <FileLoader
                    onChange={(e) => e.target?.files ? setLogo(e.target.files[0]) : setLogo(undefined)}
                ></FileLoader>
            </Form.Item>
            <Form.Item
                name="format"
                label="Выберите формат чемпионата"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Select>
                    <Select.Option value={0} >
                        Чемпионат
                    </Select.Option>
                    <Select.Option value={1} >
                        Кубок
                    </Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="minutesTime"
                label="Тайм минут:"
                initialValue={25}
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <CustomInput></CustomInput>
            </Form.Item>
            <Form.Item
                name="countYellowAfterDis"
                label="Жёлтых карточек для дисквалификации:"
                initialValue={3}
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <CustomInput></CustomInput>
            </Form.Item>
            <Form.Item
                name="playersCount"
                label="Число игроков в старте"
                initialValue={5}
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <CustomInput></CustomInput>
            </Form.Item>
            <Form.Item
                name="maxPlayerPerMatch"
                label="Максимальное количество игроков в заявке на матч:"
                initialValue={15}
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <CustomInput></CustomInput>
            </Form.Item>
            <Form.Item
                name="startDate"
                label="Начало чемпионата"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <DatePicker></DatePicker>
            </Form.Item>
            <Form.Item
                name="endDate"
                label="Окончание чемпионата"
                rules={[
                    {
                        required: true
                    }
                ]}
            >
                <DatePicker></DatePicker>
            </Form.Item>
            <Form.Item
                name="isDefaultChamp"
                label="Сделать стандартным чемпионатом"
                initialValue={false}
            >
                <Checkbox onChange={(e) => form.setFieldValue("isDefaultChamp", e.target.checked)
                }></Checkbox>
            </Form.Item>
            <CustomButton type="submit">Сохранить</CustomButton>
        </Form>
        {isLoading ? <div className={styles.loading__wrapper}> <>{loader}</></div> : null}
    </div> : <h2>К, сожалению, у вас нет прав доступа к этой странице! Авторизуйтесь под другой учётной записью.</h2>
}

export default CreateChampionat