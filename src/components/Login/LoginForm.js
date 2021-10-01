import React, { useState, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/slices/Login/authSlice';
import {
  emailReducer,
  passwordReducer,
  emailConfReducer,
  passwordConfReducer
} from './LoginReducers';

import styles from './LoginForm.module.css';

const INITIAL_STATE = {
  value: '',
  isValid: false,
  wasTouched: false
};

const LoginForm = (props) => {
  const { isLogin } = props;
  const authState = useSelector((state) => state.auth);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    ...INITIAL_STATE
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    ...INITIAL_STATE
  });
  const [emailConfState, dispatchEmailConf] = useReducer(emailConfReducer, {
    ...INITIAL_STATE
  });
  const [passwordConfState, dispatchPasswordConf] = useReducer(
    passwordConfReducer,
    { ...INITIAL_STATE }
  );

  const [formIsValid, setFormValidity] = useState(false);
  const [statusMsgState, setStatusMsgState] = useState({
    show: false,
    isError: false,
    msg: ''
  });

  const authDispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (isLogin) {
        setFormValidity(emailState.isValid && passwordState.isValid);
      } else {
        setFormValidity(
          emailState.isValid &&
            passwordState.isValid &&
            emailConfState.isValid &&
            passwordConfState.isValid
        );
      }
      setStatusMsgState({
        show: false,
        isError: false,
        msg: ''
      });
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [
    emailState.isValid,
    passwordState.isValid,
    emailConfState.isValid,
    passwordConfState.isValid,
    isLogin
  ]);

  useEffect(() => {
    if (authState.status === 'failed') {
      setStatusMsgState({
        show: true,
        isError: true,
        msg: authState.errorMsg
      });
    }
  }, [authState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const emailFocusHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const emailConfChangeHandler = (event) => {
    const emailConfInput = event.target.value;
    dispatchEmailConf({
      type: 'USER_INPUT',
      val: {
        emailConf: emailConfInput,
        emailInput: emailState.value
      }
    });
  };

  const emailConfFocusHandler = () => {
    dispatchEmailConf({ type: 'INPUT_BLUR' });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordFocusHandler = (event) => {
    dispatchPassword({ type: 'INPUT_BLUR', val: event.target.value });
  };

  const passwordConfChangeHandler = (event) => {
    const passwordConfInput = event.target.value;
    dispatchPasswordConf({
      type: 'USER_INPUT',
      val: {
        passwordConf: passwordConfInput,
        passwordInput: passwordState.value
      }
    });
  };

  const passwordConfFocusHandler = () => {
    dispatchPasswordConf({ type: 'INPUT_BLUR' });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (isLogin) {
        authDispatch(
          login({
            email: emailState.value,
            password: passwordState.value
          })
        );
      } else {
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: emailState.value,
            emailConf: emailConfState.value,
            password: passwordState.value,
            passwordConf: passwordConfState.value
          })
        });
        const data = await response.json();

        if (response.status === 201) {
          setStatusMsgState({
            show: true,
            isError: false,
            msg: data.message
          });
          history.push('/login');
        }
        if (response.status === 422) {
          setStatusMsgState({
            show: true,
            isError: true,
            msg: data.data[0].msg
          });
        }
      }
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={submitFormHandler}>
      <div
        className={`${styles.loginForm__inputContainer} ${
          !emailState.isValid &&
          emailState.wasTouched &&
          styles['loginForm__inputContainer--invalid']
        }`}
      >
        <input
          className={styles.loginForm__input}
          type="email"
          name="Email Input"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailFocusHandler}
          placeholder=""
        />
        <label className={styles.loginForm__label} htmlFor="email">
          Email
        </label>
        {!emailState.isValid && emailState.wasTouched && (
          <span>El email ingresado no es valido</span>
        )}
      </div>
      {!isLogin && (
        <div
          className={`${styles.loginForm__inputContainer} ${
            !emailConfState.isValid &&
            emailConfState.wasTouched &&
            styles['loginForm__inputContainer--invalid']
          }`}
        >
          <input
            className={styles.loginForm__input}
            type="email"
            name="Email Confirmation"
            id="emailConf"
            onChange={emailConfChangeHandler}
            onBlur={emailConfFocusHandler}
            placeholder=""
          />
          <label className={styles.loginForm__label} htmlFor="emailConf">
            Repita su email
          </label>
          {!emailConfState.isValid && emailConfState.wasTouched && (
            <span>Los emails ingresados no coinciden</span>
          )}
        </div>
      )}
      <div
        className={`${styles.loginForm__inputContainer} ${
          !passwordState.isValid &&
          passwordState.wasTouched &&
          styles['loginForm__inputContainer--invalid']
        }`}
      >
        <input
          className={styles.loginForm__input}
          type="password"
          name="Password Input"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordFocusHandler}
          placeholder=""
        />
        <label className={styles.loginForm__label} htmlFor="password">
          Contraseña
        </label>
        {!passwordState.isValid && passwordState.wasTouched && (
          <span>La contraseña ingresada no es valida</span>
        )}
      </div>
      {!isLogin && (
        <div
          className={`${styles.loginForm__inputContainer} ${
            !passwordConfState.isValid &&
            passwordConfState.wasTouched &&
            styles['loginForm__inputContainer--invalid']
          }`}
        >
          <input
            className={styles.loginForm__input}
            type="password"
            name="Password Confirmation"
            id="passwordConf"
            onChange={passwordConfChangeHandler}
            onBlur={passwordConfFocusHandler}
            placeholder=""
          />
          <label className={styles.loginForm__label} htmlFor="passwordConf">
            Repita su contraseña
          </label>
          {!passwordConfState.isValid && passwordConfState.wasTouched && (
            <span>La contraseña ingresada no es valida</span>
          )}
        </div>
      )}
      {statusMsgState.show && (
        <span
          className={`${styles.loginForm__statusMsg} ${
            statusMsgState.isError && styles['loginForm__statusMsg--error']
          }`}
        >
          {statusMsgState.msg}
        </span>
      )}
      <div className={styles.loginForm__buttonContainer}>
        <div className={styles.loginForm_btnBg} />
        <button type="submit">
          {isLogin ? <span>Login</span> : <span>Sign Up</span>}
        </button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  isLogin: PropTypes.bool
};

LoginForm.defaultProps = {
  isLogin: false
};

export default LoginForm;
