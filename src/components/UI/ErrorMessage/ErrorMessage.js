import React from 'react';
import PropTypes from 'prop-types';

import styles from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
  const { message, isSmall } = props;
  const classes = `${styles.error} ${isSmall ? styles['error--small'] : ''}`;
  return (
    <div className={classes}>
      <h1>
        Estamos experimentando problemas para comunicarnos con el servidor :(
      </h1>
      <span>{message}</span>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  isSmall: PropTypes.bool
};
ErrorMessage.defaultProps = {
  message: 'An error occurred',
  isSmall: false
};

export default ErrorMessage;
