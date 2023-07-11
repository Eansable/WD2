import CustomButton from "../CustomElement/Button";
import styles from "./styles.module.css";
interface PropsType {
  id: number;
}

const OneChampionat = ({ id }: PropsType) => {
  return (
    <div className={styles.championat__wrapper}>
      <div className={styles.championat__info}>
        <div className={styles.championat__logo}>Logo</div>
        <div className={styles.short__info}></div>
      </div>
      <div className={styles.championat__manage}>
        <CustomButton>Добавить команду в турнир</CustomButton>
        <CustomButton>Добавить матч</CustomButton>
        <CustomButton>Сгенерировать календарь</CustomButton>
        <CustomButton>Изменить информацию о чемпионате</CustomButton>
      </div>
    </div>
  );
};

export default OneChampionat;
