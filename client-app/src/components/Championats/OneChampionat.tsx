'use client'

import { DatePicker, Modal, Select, TimePicker } from "antd";
import CustomButton from "../CustomElement/Button";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { addMatchAction, addTeamAction, deleteAction, generateSheduleAction, getOneByIdAction } from "./store/actions";
import { getMatchesByChampIdAction } from "../Matches/store/actions";
import { getAllTeamAction } from "../Teams/store/actions";
import ChampionatTable from "./ChampionatTable";
import { getAllAction } from "../NRI/Stadiums/store/actions";
import { useRouter } from "next/navigation";
import CreateChampionat from "@/pages/championats/create";
import MatchesList from "../Matches/MatchesList";
import dayjs, { Dayjs } from "dayjs"
import Notifications from "@/helpers/Notifications";
import ChampionatSettings from "./ChampionatSettings";
import Table, { ColumnType } from "../CustomElement/Table";

interface PropsType {
  id: number;
}

interface MatchForm {
  homeId?: number,
  visitorId?: number,
  stadiumId?: number,
  dateStartMatch: Date,
  time?: Date
}

const OneChampionat = ({ id }: PropsType) => {
  const dispatch = useAppDispatch()
  const [openAddTeam, setOpenAddTeam] = useState(false)
  const [openAddMatch, setOpenAddMatch] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [newMatch, setNewMatch] = useState<MatchForm>({ dateStartMatch: new Date() })
  const { teams } = useAppSelector(state => state.teamReducer)
  const { oneChampionat, isLoading, changed, deleted } = useAppSelector(state => state.championatReducer)
  const { stadiums } = useAppSelector(state => state.stadiumReducer)
  const { roles } = useAppSelector(state => state.accountReducer)
  const { matches, isLoading: isMatchesLoading } = useAppSelector(state => state.matchesReducer)
  const [searchTeam, setSearchTeam] = useState('')
  const [teamId, setTeamId] = useState<number>()
  const router = useRouter()
  const [visibleSetting, setVisibleSettings] = useState(false)

  const columns: ColumnType[] = [
    {
      name: "Название",
      dataIndex: "teamName"
    },
    {
      name: "Побед",
      dataIndex: "win"
    },
    {
      name: "Ничьи",
      dataIndex: "draw"
    },
    {
      name: "Поражений",
      dataIndex: "lose"
    }

  ]

  const closeModalAddTeam = () => {
    setOpenAddTeam(false)
    setTeamId(undefined)
  }

  const closeModalAddMatch = () => {
    setOpenAddMatch(false)
    setNewMatch({ dateStartMatch: new Date() })
  }

  const addTeam = () => {
    dispatch(addTeamAction({ championatId: id, teamId: teamId }))
  }

  const addMatch = () => {
    dispatch(addMatchAction({ ...newMatch, championatId: id }))
  }

  const deleteChampionat = () => {
    dispatch(deleteAction({ id }))
  }

  const generateShedule = () => {
    dispatch(generateSheduleAction({ championatId: id }))
  }

  const getFormat = (format: number) => {
    switch (format) {
      case 1:
        return "Кубок"
      default:
        return "Чемпионат"
    }
  }

  const getDateString = (date: Date) => {
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : `${date.getUTCDate()}`
    const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : `${date.getUTCMonth() + 1}`
    return `${day}-${month}-${date.getFullYear()}`
  }

  const getActiveContent = (active: number) => {
    switch (active) {
      case 1:
        return <MatchesList matches={matches} isResult={true} champId={id} />
      case 2:
        return <MatchesList matches={matches} isResult={false} champId={id} />
      case 3:
        return <div>Раздел в разработке </div>
      default:
        return oneChampionat?.table ? <ChampionatTable table={oneChampionat?.table} championatId={oneChampionat.id} /> : null
    }
  }


  const handleTime = (value: Dayjs | null) => {
    const date = new Date(newMatch.dateStartMatch)
    if (value === null)
      return
    date.setHours(value.hour())
    date.setMinutes(value.minute())
    setNewMatch({
      ...newMatch,
      dateStartMatch: date
    })
  }

  const handleDate = (value: Dayjs | null) => {
    const date = new Date(newMatch.dateStartMatch)
    if (value === null)
      return
    date.setDate(value.date())
    date.setMonth(value.month())
    date.setFullYear(value.year())
    setNewMatch({
      ...newMatch,
      dateStartMatch: date
    })
  }

  useEffect(() => {
    if (openAddTeam)
      dispatch(getAllTeamAction({ championatId: id }))
  }, [openAddTeam])

  useEffect(() => {
    if (openAddMatch && !stadiums)
      dispatch(getAllAction())
  }, [openAddMatch])

  useEffect(() => {
    if (!isNaN(id)) {
      dispatch(getOneByIdAction({ id: Number(id) }))
    }
  }, [id])

  useEffect(() => {
    if (deleted)
      router.push("/championats")
  }, [deleted])

  useEffect(() => {
    if (changed) {
      dispatch(getOneByIdAction({ id: Number(id) }))
      closeModalAddTeam()
      closeModalAddMatch()
      Notifications.success(changed, 10000)
    }

  }, [changed])

  return (
    <div className={styles.championat__wrapper}>
      <div className={styles.championat__info}>
        <div className={styles.championat__logo}>
          {oneChampionat?.logoId ?
            <img src={`https://localhost:44326/api/logo/GetById?id=${oneChampionat.logoId}`} />
            : <img src="../defaultLeague.png" />
          }
        </div>
        <div className={styles.short__info}>
          <p>
            {oneChampionat?.name} {oneChampionat?.yearString}
          </p>
          <p>
            Формат: {oneChampionat?.championatFormat !== undefined ? getFormat(oneChampionat.championatFormat) : null}
          </p>
          <p>
            Начало: {oneChampionat?.startDate ? getDateString(new Date(oneChampionat.startDate)) : null}
          </p>
          <p>
            Окончание: {oneChampionat?.endDate ? getDateString(new Date(oneChampionat.endDate)) : null}
          </p>
        </div>
        <div className={styles.champ__tabs}>
          <div
            className={`${styles.tab} ${activeTab === 0 ? styles.tab_active : ''}`}
            onClick={() => setActiveTab(0)}
          >
            Таблица
          </div>
          <div
            className={`${styles.tab} ${activeTab === 1 ? styles.tab_active : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Результаты
          </div>
          <div
            className={`${styles.tab} ${activeTab === 2 ? styles.tab_active : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Календарь
          </div>
          <div
            className={`${styles.tab} ${activeTab === 3 ? styles.tab_active : ''}`}
            onClick={() => setActiveTab(3)}
          >
            Статистика
          </div>
        </div>
        {getActiveContent(activeTab)}
        {oneChampionat?.table ? <Table
          columns={columns}
          data={oneChampionat.table}
        /> : null}
      </div>
      {roles.includes('admin') ? <div className={styles.championat__manage}>
        <CustomButton
          onClick={() => setOpenAddTeam(true)}>
          Добавить команду в турнир
        </CustomButton>
        <CustomButton
          onClick={() => setOpenAddMatch(true)}
        >
          Добавить матч
        </CustomButton>
        <CustomButton
          onClick={() => setOpenAddMatch(true)}
        >
          Добавить тур
        </CustomButton>
        <CustomButton
          onClick={deleteChampionat}
        >
          Удалить чемпионат
        </CustomButton>
        <CustomButton
          onClick={generateShedule}
        >
          Сгенерировать календарь
        </CustomButton>
        <CustomButton
          onClick={() => setVisibleSettings(!visibleSetting)}
        >
          Настройки чемпионата
        </CustomButton>
      </div> : null}
      {visibleSetting && oneChampionat ? <ChampionatSettings championat={oneChampionat} /> : null}
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
      <Modal
        open={openAddMatch}
        onCancel={closeModalAddMatch}
        closable={false}
        footer={null}
      >
        <Select
          className={styles.team__select}
          onSearch={(value) => setSearchTeam(value)}
          onChange={(value) => setNewMatch({
            ...newMatch,
            homeId: value
          })}
          value={newMatch?.homeId}
        >

          {oneChampionat?.table ? oneChampionat.table?.map(team => {

            return team.teamId === newMatch?.visitorId ? null : <Select.Option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </Select.Option>
          }) : null}
        </Select>

        <Select
          className={styles.team__select}
          onSearch={(value) => setSearchTeam(value)}
          onChange={(value) => setNewMatch({
            ...newMatch,
            visitorId: value
          })}
          value={newMatch?.visitorId}
        >

          {oneChampionat?.table ? oneChampionat.table?.map(team => {

            return team.teamId === newMatch?.homeId ? null : <Select.Option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </Select.Option>
          }) : null}
        </Select>

        <Select
          className={styles.team__select}
          onSearch={(value) => setSearchTeam(value)}
          onChange={(value) => setNewMatch({
            ...newMatch,
            stadiumId: value
          })}
          value={newMatch?.stadiumId}
        >

          {stadiums?.length ? stadiums?.map(stadium => {

            return <Select.Option key={stadium.id} value={stadium.id}>
              {stadium.name}
            </Select.Option>
          }) : null}
        </Select>
        <DatePicker
          value={dayjs(newMatch?.dateStartMatch)}
          onChange={handleDate}
        ></DatePicker>
        <TimePicker
          format="HH:mm"
          onChange={handleTime}
        ></TimePicker>
        <CustomButton onClick={addMatch}>Добавить матч</CustomButton>
      </Modal>
    </div>
  );
};

export default OneChampionat;
