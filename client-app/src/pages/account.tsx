import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import styles from "./styles.module.css";
import CustomButton from "@/components/CustomElement/Button";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.accountReducer);
  return (
    <section className={styles.account}>
      <div className="avatar">Фото профиля</div>
      <div className="info">Информация профиля</div>
      <div className="statics">Статистика профиля</div>
      <CustomButton>Изменить профиль</CustomButton>
    </section>
  );
}
