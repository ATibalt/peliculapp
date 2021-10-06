import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

const Navbar = (props) => {
  const title = 'PeliculApp';
  const { isLogedIn } = props;

  return (
    <nav className={styles.navbar}>
      <span className={styles.navbar__title}>{title}</span>
      <NavLink
        className={styles.navbar_navlink}
        activeClassName={styles['navbar_navlink--active']}
        to="/home"
      >
        Inicio
      </NavLink>
      {isLogedIn && (
        <>
          <NavLink
            className={styles.navbar_navlink}
            activeClassName={styles['navbar_navlink--active']}
            to="/watchlist"
          >
            Tu lista
          </NavLink>
          <NavLink
            className={styles.navbar_navlink}
            activeClassName={styles['navbar_navlink--active']}
            to="/liked"
          >
            Tus likes
          </NavLink>
          <NavLink
            className={styles.navbar_navlink}
            activeClassName={styles['navbar_navlink--active']}
            to="/watched"
          >
            Volver a ver
          </NavLink>
        </>
      )}
      <NavLink
        className={styles.navbar_navlink}
        activeClassName={styles['navbar_navlink--active']}
        to="/search"
      >
        Buscar
      </NavLink>
      {isLogedIn && (
        <NavLink
          className={`${styles.navbar_navlink} ${styles['navbar_navlink--last']}`}
          activeClassName={styles['navbar_navlink--active']}
          to="/user"
        >
          Username + ProfIMG
        </NavLink>
      )}
      {!isLogedIn && (
        <div className={styles.navbar_loginLinks}>
          <NavLink
            className={styles.navbar_navlink}
            activeClassName={styles['navbar_navlink--active']}
            to="/login"
          >
            Ingresar
          </NavLink>
          <NavLink
            className={styles.navbar_navlink}
            activeClassName={styles['navbar_navlink--active']}
            to="/sign-up"
          >
            Registrarse
          </NavLink>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  isLogedIn: PropTypes.bool
};

Navbar.defaultProps = {
  isLogedIn: false
};

export default Navbar;
