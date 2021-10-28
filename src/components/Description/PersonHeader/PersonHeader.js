import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import styles from './PersonHeader.module.css';
import PersonInfo from './PersonInfo/PersonInfo';

const Header = (props) => {
  const { data } = props;
  const [showText, setShowText] = useState(false);
  let title;
  const image = data.profile_path
    ? `https://image.tmdb.org/t/p/w500/${data.profile_path}`
    : null;

  const toggleReadMore = () => {
    setShowText((prevState) => !prevState);
  };

  return (
    <div className={`${styles.header}`}>
      <div className={styles.header__info}>
        <div className={styles.header__posterCont}>
          <div className={styles.header__aux}>
            {image && (
              <img
                src={image}
                alt={`${title} poster`}
                className={styles.header__poster}
              />
            )}
          </div>
        </div>
        <PersonInfo personData={data} />
      </div>
      {data.biography !== '' && (
        <div
          className={`${styles.header__bio} ${
            !showText && styles['header__bio--hide']
          }`}
        >
          <span>Biofrafía</span>
          <p>{data.biography}</p>
          <button type="button" onClick={toggleReadMore}>
            Leer {showText ? 'menos ' : 'más '}
            <FontAwesomeIcon icon={showText ? faCaretUp : faCaretDown} />
          </button>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.objectOf(PropTypes.any)
};
Header.defaultProps = {
  data: {}
};

export default Header;
