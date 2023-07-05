import Link from "next/link";
import styles from "./styles.module.css";

const Page404 = () => {
  return (
    <div className={styles.error}>
      <h2> Этой страницы нет, или она вам не доступна. </h2>
      <Link href="/">Вернуться на главную.</Link>
    </div>
  );
};

export default Page404;
