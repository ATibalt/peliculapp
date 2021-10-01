import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';

import styles from './Login.module.css';

const Login = (props) => {
  const { isLogin } = props;

  return (
    <main className={styles.loginMain}>
      <header className={styles.loginHeader}>
        <h1 className={styles.loginHeader__title}>PeliculApp</h1>
      </header>
      <LoginForm isLogin={isLogin} />
      {!isLogin ? (
        <div className={styles.loginToggler}>
          <span>¿Ya tienes cuenta? </span>
          <Link to="/login">Ingresa</Link>
        </div>
      ) : (
        <div className={styles.loginToggler}>
          <span>¿Eres nuevo? </span>
          <Link to="/sign-up">Registrate aquí</Link>
        </div>
      )}
    </main>
  );
};

Login.propTypes = {
  isLogin: PropTypes.bool
};

Login.defaultProps = {
  isLogin: false
};

export default Login;
