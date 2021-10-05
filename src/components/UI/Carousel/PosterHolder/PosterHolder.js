import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styles from './PosterHolder.module.css';

const PosterHolder = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { item, currentWindowWidth } = props;
  // eslint-disable-next-line no-unused-vars
  const type = item.title ? 'movie' : 'tv';
  const title = item.title ? item.title : item.name;

  return (
    <Link
      to={`/${type}/${item.id}`}
      className={`${styles.contentCarousel__poster} ${
        isLoading && styles['contentCarousel__poster--isLoading']
      }`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt=""
        onLoad={() => {
          setIsLoading(false);
        }}
      />
      <span>{title}</span>
    </Link>
  );
};

PosterHolder.propTypes = {
  item: PropTypes.instanceOf(PropTypes.object),
  currentWindowWidth: PropTypes.number
};

PosterHolder.defaultProps = {
  item: {},
  currentWindowWidth: PropTypes.number
};

export default PosterHolder;
