import { MatchType } from "./types"
import styles from "./styles.module.css"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/helpers/hooks"
import { MouseEvent, useEffect, useState } from "react"
import { DatePicker, Popconfirm, TimePicker } from "antd"
import dayjs from "dayjs"
import { deleteMatcAction, editDateAction } from "./store/actions"

interface PropsType {
    match: MatchType,
    isManagment?: boolean
}
const MatchItem = ({ match, isManagment = true }: PropsType) => {
    const dispatch = useAppDispatch()
    const { roles } = useAppSelector(state => state.accountReducer)
    const [isChangeDate, setIsChangeDate] = useState(false)
    const [newTime, setNewTime] = useState<Date>(match.date ? new Date(match.date) : new Date())
    const { changed } = useAppSelector(state => state.matchesReducer)

    useEffect(() => {
        if (changed) {
            setIsChangeDate(false)
            setNewTime(match.date ? new Date(match.date) : new Date())
        }
    }, [changed])

    const handleChangeDate = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        dispatch(editDateAction({ matchId: match.id, dateTime: newTime }))
    }
    return <div className={styles.match_wrapper}>
        <Link href={`/match/${match.id}`} className={styles.match__link}>
            <div className={styles.match__team}>
                {match?.home.teamLogo ?
                    <img src={`https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}`} />
                    :
                    <img src='../defaultClub.png' />}
                <p>{match.home.teamName}</p>
            </div>
            <p className={styles.match__result}> {match?.score ? match.score : "vs"} </p>
            <div className={styles.match__team}>
                {match?.visitor.teamLogo ?
                    <img src={`https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}`} />
                    :
                    <img src='../defaultClub.png' />}
                <p>{match.visitor.teamName}</p>
            </div>
        </Link >
        <div className={styles.match__date}>
            <div className={styles.match_date_flex}>
                {!isChangeDate ? <p>
                    {dayjs(new Date(match.date)).format("DD-MM-YYYY HH:mm")}
                </p> : <div className={styles.match_set_date}>
                    <DatePicker
                        onChange={(date) => {
                            const tempDate = new Date(newTime)
                            const year = date?.year() ? date.year() : new Date().getFullYear()
                            const month = date?.month() ? date.month() : new Date().getMonth()
                            const day = date?.date() ? date.date() : new Date().getDate()
                            tempDate.setFullYear(year)
                            tempDate.setMonth(month)
                            tempDate.setDate(day)
                            setNewTime(tempDate)
                        }}
                        value={dayjs(newTime)}
                    />
                    <TimePicker
                        minuteStep={5}
                        format="HH:mm"
                        value={dayjs(newTime)}
                        onChange={(date) => {
                            const tempDate = new Date(newTime)
                            const hour = date?.hour() ? date.hour() : 12
                            const minute = date?.minute() ? date.minute() : 0
                            tempDate.setHours(hour)
                            tempDate.setMinutes(minute)
                            tempDate.setSeconds(0)
                            setNewTime(tempDate)
                        }}
                    />
                </div>
                }
                {roles.includes("admin") && !isChangeDate && isManagment ? <img
                    src="../EditPen.svg"
                    alt="change date"
                    onClick={() => setIsChangeDate(true)}
                /> : null}
            </div>
            {isChangeDate ? <button onClick={handleChangeDate}>
                Сохранить
            </button> : null}
            {roles.includes("admin") && isManagment ? <Popconfirm
                title="Вы действительно хотите удалить матч?"
                onCancel={() => null}
                onConfirm={() => dispatch(deleteMatcAction(
                    {
                        matchId: match.id
                    }
                ))}
            >
                    <img
                        title="Удалить"
                        src="../DeleteCross.svg"
                        className={styles.delete_match}
                    />
            </Popconfirm> : null}
        </div>
        {match.isLive ? <div className={styles.live}>Live</div> : null}

    </div>
}

export default MatchItem