'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { Table } from "antd"
import { useEffect } from "react"
import { getAllAction } from "./store/actions"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"

const UsersList = () => {
    const dispatch = useAppDispatch()
    const { users, isLoading } = useAppSelector(state => state.usersReducer)

    useEffect(() => {
        dispatch(getAllAction())
    }, [])

    return !isLoading ? <div>
        <Table 
            dataSource={users}
            pagination={false}
        >
            <Table.Column 
                title="Логин"
                dataIndex="userName"
            />
            <Table.Column 
                title="Почта"
                dataIndex="email"
            />
            <Table.Column 
                title="Номер"
                dataIndex="phoneNumber"
            />
            <Table.Column 
                title="Имя пользователя"
                dataIndex="string"
            />

        </Table>
    </div> : <>{LocalLoading}</>
}

export default UsersList