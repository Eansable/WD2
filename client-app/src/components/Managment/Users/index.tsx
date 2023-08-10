'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { Table } from "antd"
import { useEffect } from "react"
import { getAllAction } from "./store/actions"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import { useRouter } from "next/navigation"

const UsersList = () => {
    const dispatch = useAppDispatch()
    const { users, isLoading } = useAppSelector(state => state.usersReducer)
    const router = useRouter()

    useEffect(() => {
        dispatch(getAllAction())
    }, [])

    return !isLoading ? <div>
        <Table 
            dataSource={users}
            pagination={false}
            onRow={(record) =>{
                return {
                    onDoubleClick: () => {router.push(`users/${record.id}`)}
                }
            }}
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
                dataIndex="ownerName"
            />

        </Table>
    </div> : <>{LocalLoading}</>
}

export default UsersList