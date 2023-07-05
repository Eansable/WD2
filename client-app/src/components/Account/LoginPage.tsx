import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useState } from "react";
import { loginAction } from "./store/actions";
import NotFound from "../NotFound";
import CustomButton from "../CustomElement/Button";
import styles from "./loginPage.module.css";
import CustomInput from "../CustomElement/Input";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { user, roles } = useAppSelector((state) => state.accountReducer);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(
      loginAction({
        userName: login,
        password,
      })
    );
  };

  return (
    <div className={styles.loginPage}>
      {roles.length === 0 ? (
        <div className={styles.wrapper}>
          <CustomInput
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          />
          <CustomInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <CustomButton onClick={loginHandler}>Войти</CustomButton>
        </div>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default LoginPage;
