import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEye,
  faHome,
  faSearch,
  faThumbsUp,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MobileNavbar.module.css';

const MobileNavbar = (props) => {
  // const title = 'PeliculApp';
  const { isLogedIn } = props;

  const userLinkRoute = isLogedIn ? '/user' : '/login';

  return (
    <>
      {/* <header className={styles.mobileHeader}>{title}</header> */}
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
          </>
        )}
        <NavLink
          className={styles.mobileNavbar_navlink}
          activeClassName={styles['mobileNavbar_navlink--active']}
          to={userLinkRoute}
        >
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </nav>
    </>
  );
};

MobileNavbar.propTypes = {
  isLogedIn: PropTypes.bool
};

MobileNavbar.defaultProps = {
  isLogedIn: false
};

export default MobileNavbar;
