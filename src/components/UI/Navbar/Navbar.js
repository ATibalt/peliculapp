import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

const Navbar = () => {
  const title = 'PeliculApp';

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
      <NavLink
        className={styles.navbar_navlink}
        activeClassName={styles['navbar_navlink--active']}
        to="/search"
      >
        Buscar
      </NavLink>
      <NavLink
        className={styles.navbar_navlink}
        activeClassName={styles['navbar_navlink--active']}
        to="/user"
      >
        Username + ProfIMG
      </NavLink>
    </nav>
  );
};

// Navbar.propTypes = {

// }

export default Navbar;
