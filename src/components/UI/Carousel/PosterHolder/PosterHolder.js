import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styles from './PosterHolder.module.css';

const PosterHolder = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const { item, isSearch } = props;

  let type;
  let title;
  let posterPath;
  if (isSearch) {
    type = item.media_type;
    title = item.title ? item.title : item.name;
    posterPath = type === 'person' ? item.profile_path : item.poster_path;
  } else {
    type = item.title ? 'movie' : 'tv';
    title = item.title ? item.title : item.name;
    posterPath = item.poster_path;
  }

  return (
    <Link
      to={`/${type}/${item.id}`}
      className={`${styles.contentCarousel__poster}
      ${isSearch && styles.contentCarousel__profile}
      ${isLoading && styles['contentCarousel__poster--isLoading']}
      ${isLoading && styles['contentCarousel__poster--noimg']}`}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
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
  isSearch: PropTypes.bool
};

PosterHolder.defaultProps = {
  item: {},
  isSearch: false
};

export default PosterHolder;
