'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import LocaleLoading from "../CustomElement/Loader/LocalLoader"
import Plus from "../../img/plus"
import TeamCard from "./TeamCard"
import styles from "./styles.module.css"
import { useEffect, useState } from "react"
import { Modal } from "antd"
import CustomInput from "../CustomElement/Input"
import CustomButton from "../CustomElement/Button"
import { addTeamAction, getAllTeamAction } from "./store/actions"

const ListTeam = () => {
    const dispatch = useAppDispatch()
    const { teams, isLoading, changed } = useAppSelector(state => state.teamReducer)
    const { roles } = useAppSelector(state => state.accountReducer)
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const showModal = () => {
        setVisible(true)
    }

    const closeModal = () => {
        setName('')
        setDescription('')
        setVisible(false)
    }

    const saveTeam = () => {
        dispatch(addTeamAction({
            name,
            description
        }))
    }

    useEffect(() => {
            dispatch(getAllTeamAction())
    }, [])

    useEffect(() => {
        if (changed) {
            dispatch(getAllTeamAction())
            closeModal()
        }
    }, [changed])

    return !isLoading ? <section className={styles.list}>
        {teams.map(team => {
            return <TeamCard
                team={team}
                key={team.id}
            ></TeamCard>
        })}
        {roles.includes("admin") ? <>
            <button className={styles.button__add} onClick={showModal}>
                {Plus}

            </button>
            <Modal
                open={visible}
                footer={null}
                closable={false}
                onCancel={closeModal}
            >
                <CustomInput value={name} onChange={(e) => setName(e.target.value)} />
                <CustomInput value={description} onChange={(e) => setDescription(e.target.value)} />
                <CustomButton onClick={saveTeam}>Сохранить</CustomButton>
            </Modal>
        </>
            : null}
    </section>
        : <>{LocaleLoading}</>
}

export default ListTeam