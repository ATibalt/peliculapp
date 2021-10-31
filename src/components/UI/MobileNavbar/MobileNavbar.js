import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEye,
  faHome,
  faSearch,
  faSignOutAlt,
  faThumbsUp,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MobileNavbar.module.css';

const MobileNavbar = (props) => {
  const { isLogedIn, logout } = props;

  const logoutHandler = () => {
    logout();
  };

  return (
    <>
      <nav className={styles.mobileNavbar}>
        <NavLink
          className={styles.mobileNavbar_navlink}
          activeClassName={styles['mobileNavbar_navlink--active']}
          to="/home"
        >
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink
          className={styles.mobileNavbar_navlink}
          activeClassName={styles['mobileNavbar_navlink--active']}
          to="/search"
        >
          <FontAwesomeIcon icon={faSearch} />
        </NavLink>
        {isLogedIn && (
          <>
            <NavLink
              className={styles.mobileNavbar_navlink}
              activeClassName={styles['mobileNavbar_navlink--active']}
              to="/watchlist"
            >
              <FontAwesomeIcon icon={faClock} />
            </NavLink>
            <NavLink
              className={styles.mobileNavbar_navlink}
              activeClassName={styles['mobileNavbar_navlink--active']}
              to="/likes"
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </NavLink>
            <NavLink
              className={styles.mobileNavbar_navlink}
              activeClassName={styles['mobileNavbar_navlink--active']}
              to="/watched"
            >
              <FontAwesomeIcon icon={faEye} />
            </NavLink>
            <button
              className={styles.mobileNavbar_navlink}
              type="button"
              onClick={logoutHandler}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </>
        )}
        {!isLogedIn && (
          <NavLink
            className={styles.mobileNavbar_navlink}
            activeClassName={styles['mobileNavbar_navlink--active']}
            to="/login"
          >
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        )}
      </nav>
    </>
  );
};

MobileNavbar.propTypes = {
  isLogedIn: PropTypes.bool,
  logout: PropTypes.func
};

MobileNavbar.defaultProps = {
  isLogedIn: false,
  logout: () => {}
};

export default MobileNavbar;
