import { MatchType } from "./types"
import styles from "./styles.module.css"
import Link from "next/link"
import moment from "moment"
import { useAppSelector } from "@/helpers/hooks"
import { MouseEvent, useState } from "react"
import { DatePicker, TimePicker } from "antd"
import dayjs, { Dayjs } from "dayjs"

interface PropsType {
    match: MatchType
}
const MatchItem = ({ match }: PropsType) => {
    const { roles } = useAppSelector(state => state.accountReducer)
    const [isChangeDate, setIsChangeDate] = useState(false)
    const [newTime, setNewTime] = useState<Dayjs>(dayjs(new Date()))

    const handleChangeDate = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        console.log(match.id);

    }
    return <div className={styles.match_wrapper}>
        <Link href={`/match/${match.id}`} className={styles.match__link}>
            <div className={styles.match__team}>
                {match?.home.teamLogo ?
                    <img src={`https://localhost:44326/api/logo/GetById?id=${match.home.teamLogo}`} />
                    :
                    <img src='./defaultLeague.png' />}
                <p>{match.home.teamName}</p>
            </div>
            <p className={styles.match__result}> {match?.score ? match.score : "vs"} </p>
            <div className={styles.match__team}>
                {match?.visitor.teamLogo ?
                    <img src={`https://localhost:44326/api/logo/GetById?id=${match.visitor.teamLogo}`} />
                    :
                    <img src='./defaultLeague.png' />}
                <p>{match.visitor.teamName}</p>
            </div>
        </Link >
        <div className={styles.match__date}>
            <div className={styles.match_date_flex}>
                {!isChangeDate ? <p>
                    {moment(new Date(match.date)).format("DD-MM-YYYY HH:mm")}
                </p> : <div className={styles.match_set_date}>
                    <DatePicker 
                        onChange={(date) => setNewTime(date ? date : dayjs(new Date()))}
                        value={dayjs(newTime)}
                    />
                    <TimePicker
                        minuteStep={5}
                        format="HH:mm"
                        value={dayjs(newTime)}
                        onChange={(date) => {
                            const tempDate = newTime
                            const hour = date?.hour ? date.hour() : 12
                            const minute = date?.minute ? date.minute() : 12
                            tempDate.set("hour", hour)
                            tempDate.set("minute", minute)
                            setNewTime(tempDate)

                        }}
                    />
                </div>
                }
                {roles.includes("admin") && !isChangeDate ? <img
                    src="../EditPen.svg"
                    alt="change date"
                    onClick={() => setIsChangeDate(true)}
                /> : null}
            </div>
            {isChangeDate ? <button onClick={handleChangeDate}>
                Сохранить
            </button> : null}
        </div>
        {match.isLive ? <div className={styles.live}>Live</div> : null}

    </div>
}

export default MatchItem