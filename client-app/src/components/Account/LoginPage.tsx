'use client'

import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect, useState } from "react";
import { loginAction } from "./store/actions";
import NotFound from "../NotFound";
import CustomButton from "../CustomElement/Button";
import styles from "./loginPage.module.css";
import CustomInput from "../CustomElement/Input";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { user, roles } = useAppSelector((state) => state.accountReducer);
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
  }, []) 

  return (
    <div className={styles.loginPage}>
      {roles.length === 0 ? (
        <div 
          className={styles.wrapper}
          onKeyUp={(e) => {
            if (e.code === "Enter")
              loginHandler()
          }}
        >
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
