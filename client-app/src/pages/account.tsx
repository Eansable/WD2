
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import styles from "./styles.module.css";
import CustomButton from "@/components/CustomElement/Button";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, roles } = useAppSelector((state) => state.accountReducer);
  return (
    <section className={styles.account}>
      <div className="avatar">Фото профиля</div>
      <div className="info">Информация профиля</div>
      <div className="statics">Статистика профиля</div>
      <CustomButton>Изменить профиль</CustomButton>
      {roles.includes("admin") ? <Link href="/nri">Управление справочниками</Link> : null}
      {roles.includes("admin") ? <Link href="/users">Пользователи</Link> : null}
    </section>
  );
}
