import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { Table } from "antd";
import styles from "./right-panel.module.css"
import loading from "../CustomElement/Loader/LocalLoader"
import { useEffect } from "react";
import { getDefaultAction } from "../Championats/store/actions";

const SmallTable = () => {
  const dispatch = useAppDispatch()
  const {isLoadingDefault, defChampionat} = useAppSelector(state => state.championatReducer)

  useEffect(() => {
    dispatch(getDefaultAction())
  }, [])

  return !isLoadingDefault ? (
    <div className={styles.small__table}>
      <div className={styles.line}>
          <div>№</div>
          <div>Название</div>
          <div>В</div>
          <div>Н</div>
          <div>П</div>
          <div>РМ</div>
          <div>О</div>
        </div>
      {defChampionat?.length ? defChampionat.map((stand, index) => {
        return <div className={styles.line}>
          <div>{index + 1}</div>
          <div>{stand.teamName}</div>
          <div>{stand.win}</div>
          <div>{stand.draw}</div>
          <div>{stand.lose}</div>
          <div>{stand.goals - stand.goalsConceded}</div>
          <div>{stand.points}</div>
        </div>
      }) : null}
      
    </div>
  ) : <>{loading}</>
};

export default SmallTable;
