/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Overview.module.css';

const Overview = (props) => {
  const { text, crew, type, genres, createdBy } = props;
  const [toggleText, setToggleText] = useState(false);
  let director;
  let writers;
  let dp;
  let creators;

  if (type === 'movie') {
    director = crew
      .filter((item) => item.job === 'Director')
      .map((item) => item.name);
    writers = crew
      .filter((item) => item.job === 'Screenplay' || item.job === 'Writer')
      .map((item) => item.name);
    dp = crew
      .filter((item) => item.job === 'Director of Photography')
      .map((item) => item.name);
  } else {
    creators =
      createdBy.length > 0 ? (
        <div className={styles.description__rolename}>
          <span>CREADO POR</span>
          <span>{createdBy.map((item) => item.name).join(', ')}</span>
        </div>
      ) : (
        <></>
      );
  }

  return (
    <div className={styles.description__overviewCont}>
      {text && (
        <div className={styles.description__overview}>
          <p
            className={`${styles.description__overviewText} ${
              !toggleText && styles['description__overviewText--hide']
            }`}
          >
            {text}
          </p>
          <button
            type="button"
            className={styles.description__overviewMoreBtn}
            onClick={() => {
              setToggleText((prevState) => !prevState);
            }}
          >
            Leer {!toggleText ? 'más' : 'menos'}
          </button>
        </div>
      )}
      <div className={styles.description__crew}>
        {type === 'movie' && (
          <>
            <div className={styles.description__rolename}>
              <span>DIRECTOR</span>
              <span>{director.length > 0 ? director.join(', ') : '-'}</span>
            </div>
            <div className={styles.description__rolename}>
              <span>GUIONISTA/S</span>
              <span>{writers.length > 0 ? writers.join(', ') : '-'}</span>
            </div>
            <div className={styles.description__rolename}>
              <span>FOTOGRAFÍA</span>
              <span>{dp.length > 0 ? dp.join(', ') : '-'}</span>
            </div>
          </>
        )}
        {type === 'tv' && creators}
        <div className={styles.description__rolename}>
          <span>GENEROS</span>
          <span>{genres.map((item) => item.name).join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {
  text: PropTypes.string,
  crew: PropTypes.arrayOf(PropTypes.any),
  type: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.object),
  createdBy: PropTypes.arrayOf(PropTypes.object)
};

Overview.defaultProps = {
  text: '',
  crew: [],
  type: '',
  genres: [],
  createdBy: []
};

export default Overview;
