'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect, useState } from "react";
import { clearErrorAction, loginAction } from "./store/actions";
import NotFound from "../NotFound";
import CustomButton from "../CustomElement/Button";
import styles from "./loginPage.module.css";
import CustomInput from "../CustomElement/Input";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { user, roles, isError } = useAppSelector((state) => state.accountReducer);
  const router = useRouter()

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

  useEffect(() => {
    if (roles.length) {
      router.push("/account")
    }
  }, [roles])

  return (
    <div
      className={styles.loginPage}
      onFocus={() => {
        if (isError)
          dispatch(clearErrorAction())
      }}
    >
      {roles.length === 0 ? (
        <div
          className={styles.wrapper}
          onKeyUp={(e) => {
            if (e.code === "Enter")
              loginHandler()
          }}
        >
          <label>
            Логин:
            <CustomInput
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            />
          </label>
          <label>
            Пароль:
            <CustomInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
          </label>
          {isError ?
            <div className={styles.error_message}>
              Не правильный логин или пароль
            </div>
            : null}
          <CustomButton onClick={loginHandler}>Войти</CustomButton>
        </div>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default LoginPage;
