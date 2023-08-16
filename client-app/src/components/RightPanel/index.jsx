import { useDispatch } from 'react-redux'
import styles from './right-panel.module.css'
import { getAllAction } from "../NRI/Positions/store/actions"
import SmallTable from './SmallTable'

const RightPanel = () => {
    const dispatch = useDispatch()
    const getPositions = () => {
        dispatch(getAllAction())
    }

    return (
        <div className={styles.wrapper}>
            <SmallTable></SmallTable>
        </div>
    )
}

export default RightPanel