/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faImdb,
  faInstagram,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import styles from './PersonInfo.module.css';

const PersonInfo = (props) => {
  const { personData } = props;
  const isDead = !!personData.deathday;

  const igAccount = personData.external_ids.instagram_id
    ? `https://www.instagram.com/${personData.external_ids.instagram_id}`
    : null;
  const twAccount = personData.external_ids.twitter_id
    ? `https://twitter.com/${personData.external_ids.twitter_id}`
    : null;
  const fbAccount = personData.external_ids.facebook_id
    ? `https://www.facebook.com/${personData.external_ids.facebook_id}`
    : null;
  const imdbProfile = personData.external_ids.imdb_id
    ? `https://www.imdb.com/name/${personData.external_ids.imdb_id}`
    : null;

  return (
    <div className={styles.person__info}>
      <div className={styles.person__dataPair}>
        <span>Nombre</span>
        <span>{personData.name}</span>
      </div>
      {personData.birthday && (
        <div className={styles.person__dataPair}>
          <span>Fecha de Nacimiento</span>
          <span>{personData.birthday}</span>
        </div>
      )}
      {isDead && (
        <div className={styles.person__dataPair}>
          <span>Fecha de Muerte</span>
          <span>{personData.deathday}</span>
        </div>
      )}
      {personData.place_of_birth && (
        <div className={styles.person__dataPair}>
          <span>Lugar de Nacimiento</span>
          <span>{personData.place_of_birth}</span>
        </div>
      )}
      <div className={styles.person__dataPair}>
        <span>Trabajo</span>
        <span>{personData.known_for_department}</span>
      </div>
      <div className={styles.person__dataPair}>
        <span>Redes</span>
        <div className={styles.person__socialnetworks}>
          {fbAccount && (
            <a target="_blank" href={fbAccount} rel="noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          )}
          {igAccount && (
            <a target="_blank" href={igAccount} rel="noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {twAccount && (
            <a target="_blank" href={twAccount} rel="noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          )}
          {imdbProfile && (
            <a target="_blank" href={imdbProfile} rel="noreferrer">
              <FontAwesomeIcon icon={faImdb} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

PersonInfo.propTypes = {
  personData: PropTypes.objectOf(PropTypes.any)
};
PersonInfo.defaultProps = {
  personData: {}
};

export default PersonInfo;
