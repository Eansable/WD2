'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import LocaleLoading from "../CustomElement/Loader/LocalLoader"
import Plus from "../../img/plus"
import TeamCard from "./TeamCard"
import styles from "./styles.module.css"
import { useState } from "react"
import { Modal } from "antd"
import CustomInput from "../CustomElement/Input"
import CustomButton from "../CustomElement/Button"

const ListTeam = () => {
    const dispatch = useAppDispatch()
    const { teams, isLoading } = useAppSelector(state => state.teamReducer)
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const showModal = () => {
        setVisible(true)
    }

    const saveTeam = () => {
        
    }

    return !isLoading ? <section>
        {teams.map(team => {
            return <TeamCard
                team={team}
                key={team.id}
            ></TeamCard>
        })}
        <button className={styles.button__add} onClick={showModal}>
           {Plus}

        </button>
        <Modal>
            <CustomInput value={name} onChange={(e) => setName(e.target.value)}/>
            <CustomInput value={description} onChange={(e) => setDescription(e.target.value)}/>
            <CustomButton onClick={saveTeam}>Сохранить</CustomButton>
        </Modal>
    </section> 
    : <>{LocaleLoading}</> 
}

export default ListTeam