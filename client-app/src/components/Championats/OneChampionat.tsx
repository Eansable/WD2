'use client'

import { Modal, Select } from "antd";
import CustomButton from "../CustomElement/Button";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { addTeamAction } from "./store/actions";
import { getAllTeamAction } from "../Teams/store/actions";
interface PropsType {
  id: number;
}

const OneChampionat = ({ id }: PropsType) => {
  const dispatch = useAppDispatch()
  const [openAddTeam, setOpenAddTeam] = useState(false)
  const { teams } = useAppSelector(state => state.teamReducer)
  const [searchTeam, setSearchTeam] = useState('')
  const [teamId, setTeamId] = useState(0)

  const closeModalAddTeam = () => {
    setOpenAddTeam(false)
  }

  const addTeam = () => {
    console.log(teamId);
    
    dispatch(addTeamAction({ championatId: id, teamId: teamId}))
  }

  useEffect(() => {
    if (teams.length === 0)
      dispatch(getAllTeamAction())
  }, [])

  return (
    <div className={styles.championat__wrapper}>
      <div className={styles.championat__info}>
        <div className={styles.championat__logo}>Logo</div>
        <div className={styles.short__info}></div>
      </div>
      <div className={styles.championat__manage}>
        <CustomButton onClick={() => setOpenAddTeam(true)}>Добавить команду в турнир</CustomButton>
        <CustomButton>Добавить матч</CustomButton>
        <CustomButton>Сгенерировать календарь</CustomButton>
        <CustomButton>Изменить информацию о чемпионате</CustomButton>
      </div>
      <Modal
        open={openAddTeam}
        onCancel={closeModalAddTeam}
        closable={false}
        footer={null}
      >
        <Select
          className={styles.team__select}
          onSearch={(value) => setSearchTeam(value)}
          onChange={(value) => setTeamId(value)}
          value={teamId}
        >
          {teams ? teams?.map(team => {
            return <Select.Option key={team.id} value={team.id}>
              {team.name}
            </Select.Option>
          }) : null}
        </Select>
        <footer><CustomButton onClick={addTeam}>Добавить</CustomButton></footer>
      </Modal>
    </div>
  );
};

export default OneChampionat;
