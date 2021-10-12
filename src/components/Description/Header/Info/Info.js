import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faThumbsUp,
  faEye,
  faClock
} from '@fortawesome/free-solid-svg-icons';

import styles from './Info.module.css';

const Info = (props) => {
  const { title, release, rating, runtime, votes, trailer } = props;

  return (
    <div className={styles.header__contentTitle}>
      <span>{title}</span>
      <div className={styles.header__data}>
        <span>{release}</span>
        {rating && <span> · {rating}</span>}
        {runtime !== '0 m' && <span> · {runtime}</span>}
      </div>
      {votes !== 0 && <span>{votes}% · TMDB User Score</span>}
      <div className={styles.actions}>
        <a
          className={`${styles.actions__watchTrailer} ${
            !trailer[0] && styles['actions__watchTrailer--disabled']
          }`}
          href={trailer[1]}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faPlay} />
          <span>Trailer</span>
        </a>
        <div className={styles.actions__add}>
          <button
            type="button"
            className={`${styles.actions__button} ${
              true && styles['actions__button--active']
            }`}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              false && styles['actions__button--active']
            }`}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              false && styles['actions__button--active']
            }`}
          >
            <FontAwesomeIcon icon={faClock} />
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  title: PropTypes.string,
  release: PropTypes.string,
  rating: PropTypes.string,
  runtime: PropTypes.string,
  votes: PropTypes.number,
  trailer: PropTypes.arrayOf(PropTypes.any)
};

Info.defaultProps = {
  title: '',
  release: '',
  rating: '',
  runtime: '',
  votes: 0,
  trailer: []
};

export default Info;
