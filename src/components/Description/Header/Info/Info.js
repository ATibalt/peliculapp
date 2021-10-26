import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faThumbsUp,
  faEye,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import styles from './Info.module.css';
import {
  deleteLike,
  deleteWatched,
  deleteWatchlist,
  getWatchedById,
  getLikeById,
  getWatchlistById,
  postLike,
  postWatched,
  postWatchlist
} from '../../../../utils/API/backend-api-requests';

const Info = (props) => {
  const { id, type, title, release, rating, runtime, votes, trailer } = props;
  const [isWatched, setIsWatched] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const loginToken = useSelector((state) => state.auth.loginToken);

  const fetchWatched = useCallback(async () => {
    const watched = await getWatchedById(loginToken, type, id);

    const data = {
      ...watched
    };

    return data;
  }, [loginToken, type, id]);
  const fetchLikes = useCallback(async () => {
    const like = await getLikeById(loginToken, type, id);

    const data = {
      ...like
    };

    return data;
  }, [loginToken, type, id]);
  const fetchWatchlist = useCallback(async () => {
    const like = await getWatchlistById(loginToken, type, id);

    const data = {
      ...like
    };

    return data;
  }, [loginToken, type, id]);

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchWatched().then((res) => {
        if (isSubscribed) {
          setIsWatched(res.exists);
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [fetchWatched, isWatched, isLogedIn]);
  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchLikes().then((res) => {
        if (isSubscribed) {
          setIsLiked(res.exists);
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [fetchLikes, isLiked, isLogedIn]);
  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchWatchlist().then((res) => {
        if (isSubscribed) {
          setIsWatchlist(res.exists);
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [fetchWatchlist, isWatchlist, isLogedIn]);

  const toggleWatchedHandler = () => {
    if (isLogedIn) {
      if (isWatched) {
        deleteWatched(loginToken, type, id).then(() => {
          setIsWatched(false);
        });
      } else {
        postWatched(loginToken, type, id).then(() => {
          setIsWatched(true);
        });
      }
    }
  };
  const toggleLikeHandler = () => {
    if (isLogedIn) {
      if (isLiked) {
        deleteLike(loginToken, type, id).then(() => {
          setIsLiked(false);
        });
      } else {
        postLike(loginToken, type, id).then(() => {
          setIsLiked(true);
        });
      }
    }
  };
  const toggleWatchlistHandler = () => {
    if (isLogedIn) {
      if (isWatchlist) {
        deleteWatchlist(loginToken, type, id).then(() => {
          setIsWatchlist(false);
        });
      } else {
        postWatchlist(loginToken, type, id).then(() => {
          setIsWatchlist(true);
        });
      }
    }
  };

  return (
    <div className={styles.header__contentTitle}>
      <span>{title}</span>
      <div className={styles.header__data}>
        {release && <span>{release}</span>}
        {rating && <span> · {rating}</span>}
        {runtime && <span> · {runtime}</span>}
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
        <div
          className={`${styles.actions__add} ${
            !isLogedIn && styles['actions__add--disabled']
          }`}
        >
          <button
            type="button"
            className={`${styles.actions__button} ${
              isWatched && styles['actions__button--active']
            }`}
            onClick={toggleWatchedHandler}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              isLiked && styles['actions__button--active']
            }`}
            onClick={toggleLikeHandler}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              isWatchlist && styles['actions__button--active']
            }`}
            onClick={toggleWatchlistHandler}
          >
            <FontAwesomeIcon icon={faClock} />
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  release: PropTypes.string,
  rating: PropTypes.string,
  runtime: PropTypes.string,
  votes: PropTypes.number,
  trailer: PropTypes.arrayOf(PropTypes.any)
};

Info.defaultProps = {
  id: 0,
  type: '',
  title: '',
  release: '',
  rating: '',
  runtime: '',
  votes: 0,
  trailer: []
};

export default Info;
