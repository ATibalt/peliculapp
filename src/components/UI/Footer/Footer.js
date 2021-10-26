import React from 'react';
import styles from './Footer.module.css';

import dbLogo from '../../../assets/tmdb.svg';

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footer__credits}>
      <span>
        Made by <a href="https://github.com/ATibalt">@atibalt</a>
      </span>
      <span>
        Código disponible en <a href="https://github.com/ATibalt">GitHub</a>
      </span>
    </div>
    <div className={styles.footer__split} />
    <div className={styles.footer__apicredits}>
      <img src={dbLogo} alt="The Movie Database logo" />
      <span>
        This product uses the TMDB API but is not endorsed or certified by TMDB
      </span>
    </div>
  </div>
);

export default Footer;
