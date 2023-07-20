import ChampionatStatsType from "./types"
import styles from "./styles.module.css"
import { useAppDispatch } from "@/helpers/hooks"
import { deleteTeamAction } from "./store/actions"
import { Popconfirm } from "antd"


interface PropsType {
    table: ChampionatStatsType[],
    championatId?: number
}

const ChampionatTable = ({ table, championatId }: PropsType) => {
    const dispatch = useAppDispatch()
    
    const deleteTeam = (id: number) => {
        return () => {
            dispatch(deleteTeamAction({
                teamId: id,
                championatId
            }))
        }
    }

    return <div className={styles.table__wrapper}>
        <div className={styles.green__cell}>№</div>
        <div className={styles.green__cell}>Название</div>
        <div className={styles.green__cell}>И</div>
        <div className={styles.green__cell}>В</div>
        <div className={styles.green__cell}>Н</div>
        <div className={styles.green__cell}>П</div>
        <div className={styles.green__cell}>МЗ:МП</div>
        <div className={styles.green__cell}>Очки</div>
        <div className={styles.green__cell}></div>
        {table.map((stand, index) => {
            return <>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{index + 1}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}><img src={`https://localhost:44326/api/logo/GetById?id=${stand?.teamLogoId}`} />{stand.teamName}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.draw + stand.win + stand.lose}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.win}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.draw}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.lose}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.goals}:{stand.goalsConceded}</div>
                <div className={index % 2 == 0 ? styles.gray__cell : ''}>{stand.points}</div>
                <Popconfirm
                    title="Вы действительно хотите удалить команду?"
                    onCancel={() => {
                        return
                    }}
                    onConfirm={deleteTeam(stand.teamId)}
                    cancelText="Нет"
                    okText="Да"
                >
                    <div className={index % 2 == 0 ? styles.gray__cell : ''}><img src="../DeleteCross.svg" /></div>
                </Popconfirm>
            </>
        })}
    </div>
}

export default ChampionatTable