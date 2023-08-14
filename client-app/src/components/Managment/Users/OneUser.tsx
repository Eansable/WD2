'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { useEffect } from "react"
import LocalLoading from "../../CustomElement/Loader/LocalLoader"
import styles from "./styles.module.css"
import { getByIdAction } from "./store/actions"
import ManageRoles from "./ManageRoles"

interface PropsType {
    id?: string | string[]
}

const OneUser = ({ id }: PropsType) => {
    const dispatch = useAppDispatch()
    const { oneUser, isLoading } = useAppSelector(state => state.usersReducer)
    const { roles } = useAppSelector(state => state.accountReducer)

    useEffect(() => {
        if (id) {
            dispatch(getByIdAction({ userId: id }))
        }
    }, [id])

    return !isLoading ? <div className={styles.one_user_wrapper}>
        {oneUser?.ownerName}
        {oneUser?.email}
        {oneUser?.phoneNumber}
        {oneUser?.userName}
        {roles.includes("admin") ?  <ManageRoles roles={oneUser?.rolesId} /> : null}
    </div> : <>{LocalLoading}</>
}

export default OneUser