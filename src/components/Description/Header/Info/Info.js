import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
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
  const { id, type, title, release, rating, runtime, votes } = props;
  const [isWatched, setIsWatched] = useState({
    hasError: false,
    exists: false
  });
  const [isLiked, setIsLiked] = useState({
    hasError: false,
    exists: false
  });
  const [isWatchlist, setIsWatchlist] = useState({
    hasError: false,
    exists: false
  });

  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const loginToken = useSelector((state) => state.auth.loginToken);

  const fetchWatched = useCallback(async () => {
    const watched = await getWatchedById(loginToken, type, id);

    if (!watched.hasError) {
      const data = {
        ...watched
      };
      return data;
    }
    return watched;
  }, [loginToken, type, id]);

  const fetchLikes = useCallback(async () => {
    const like = await getLikeById(loginToken, type, id);

    if (!like.hasError) {
      const data = {
        ...like
      };
      return data;
    }

    return like;
  }, [loginToken, type, id]);

  const fetchWatchlist = useCallback(async () => {
    const watchlist = await getWatchlistById(loginToken, type, id);

    if (!watchlist.hasError) {
      const data = {
        ...watchlist
      };
      return data;
    }
    return watchlist;
  }, [loginToken, type, id]);

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchWatched().then((res) => {
        if (isSubscribed) {
          if (!res.hasError) {
            setIsWatched({ hasError: false, exists: res.exists });
          } else {
            setIsWatched({ hasError: true, exists: false });
          }
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
  }, [fetchWatched, isWatched.exists, isLogedIn]);

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchLikes().then((res) => {
        if (isSubscribed) {
          if (!res.hasError) {
            setIsLiked({ hasError: false, exists: res.exists });
          } else {
            setIsLiked({ hasError: true, exists: false });
          }
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
  }, [fetchLikes, isLiked.exists, isLogedIn]);

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      fetchWatchlist().then((res) => {
        if (isSubscribed) {
          if (!res.hasError) {
            setIsWatchlist({ hasError: false, exists: res.exists });
          } else {
            setIsWatchlist({ hasError: true, exists: false });
          }
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
  }, [fetchWatchlist, isWatchlist.exists, isLogedIn]);

  const toggleWatchedHandler = () => {
    if (isLogedIn) {
      if (isWatched.exists) {
        deleteWatched(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsWatched({ hasError: false, exists: res.exists });
          } else {
            setIsWatched({ hasError: true, exists: false });
          }
        });
      } else {
        postWatched(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsWatched({ hasError: false, exists: res.exists });
          } else {
            setIsWatched({ hasError: true, exists: false });
          }
        });
      }
    }
  };
  const toggleLikeHandler = () => {
    if (isLogedIn) {
      if (isLiked.exists) {
        deleteLike(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsLiked(false);
          }
        });
      } else {
        postLike(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsLiked(true);
          }
        });
      }
    }
  };
  const toggleWatchlistHandler = () => {
    if (isLogedIn) {
      if (isWatchlist.exists) {
        deleteWatchlist(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsWatchlist(false);
          }
        });
      } else {
        postWatchlist(loginToken, type, id).then((res) => {
          if (!res.hasError) {
            setIsWatchlist(true);
          }
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
        <div
          className={`${styles.actions__add} ${
            !isLogedIn && styles['actions__add--disabled']
          }`}
        >
          <button
            type="button"
            className={`${styles.actions__button} ${
              isWatched.exists && styles['actions__button--active']
            } ${isWatched.hasError && styles['actions__button--error']}`}
            onClick={toggleWatchedHandler}
          >
            {!isWatched.hasError && (
              <span>
                {isWatched.exists
                  ? 'Ya has visto esta película'
                  : 'Marcar como vista'}
              </span>
            )}
            {isWatched.hasError && <span>Error al contactar al servidor</span>}
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              isLiked.exists && styles['actions__button--active']
            } ${isLiked.hasError && styles['actions__button--error']}`}
            onClick={toggleLikeHandler}
          >
            {!isLiked.hasError && (
              <span>
                {isLiked.exists ? 'Ya la has likeado' : 'Likear esta película'}
              </span>
            )}
            {isLiked.hasError && <span>Error al contactar al servidor</span>}
          </button>
          <button
            type="button"
            className={`${styles.actions__button} ${
              isWatchlist.exists && styles['actions__button--active']
            } ${isWatchlist.hasError && styles['actions__button--error']}`}
            onClick={toggleWatchlistHandler}
          >
            {!isWatchlist.hasError && (
              <span>
                {isWatchlist.exists
                  ? 'Ya está en tu lista'
                  : 'Agregar a tu lista'}
              </span>
            )}
            {isWatchlist.hasError && (
              <span>Error al contactar al servidor</span>
            )}
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
  votes: PropTypes.number
};

Info.defaultProps = {
  id: 0,
  type: '',
  title: '',
  release: '',
  rating: '',
  runtime: '',
  votes: 0
};

export default Info;
