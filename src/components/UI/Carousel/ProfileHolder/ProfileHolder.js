import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './ProfileHolder.module.css';

const ProfileHolder = (props) => {
  const { item } = props;
  return (
    <div className={styles.description__profile}>
      <div className={styles.description__profileHolder}>
        <Link to={`/person/${item.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
            alt=""
          />
        </Link>
      </div>
      <span>{item.name}</span>
      <span>{item.character}</span>
    </div>
  );
};

ProfileHolder.propTypes = {
  item: PropTypes.objectOf(PropTypes.any)
};
ProfileHolder.defaultProps = {
  item: {}
};

export default ProfileHolder;
