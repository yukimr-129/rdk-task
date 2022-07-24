import React from "react";

import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Login.module.css";

import {
  editUserName,
  editPassword,
  togleMode,
  fetchAuthLoginAsync,
  fetchAuthRegisterAsync,
  selectAuthen,
  selectIsLoginView,
} from "./loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const authen = useSelector(selectAuthen);
  const LoginView = useSelector(selectIsLoginView);

  const disabler = authen.username === "" || authen.password === "";

  const login = async () => {
    if (LoginView) {
      await dispatch(fetchAuthLoginAsync(authen));
    } else {
      const res = await dispatch(fetchAuthRegisterAsync(authen));

      //アカウント作成時ログイン状態にする
      if (fetchAuthRegisterAsync.fulfilled.match(res)) {
        await dispatch(fetchAuthLoginAsync(authen));
      }
    }
  };

  const onClickToggleAuth = () => {
    dispatch(togleMode());
    dispatch(editUserName(""));
    dispatch(editPassword(""));
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{LoginView ? "Login" : "Register"}</h1>
        <span>UserName</span>
        <input
          type="text"
          value={authen.username}
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUserName(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          value={authen.password}
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={disabler}
            color="primary"
            onClick={login}
          >
            {LoginView ? "Login" : "Create"}
          </Button>
        </div>
        <span className={styles.switchText} onClick={onClickToggleAuth}>
          {LoginView ? "Create Account" : "Back to Login"}
        </span>
      </div>
    </div>
  );
};

export default Login;
