/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useReducer } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import {
  fetchWatchlist,
  fetchLikes,
  fetchWatched
} from '../../utils/API/backend-api-requests';
import {
  fetchMovieGenresList,
  fetchSimpleMovieData,
  fetchSimpleTvData,
  fetchTvGenresList
} from '../../utils/API/api-requests';

import PosterHolder from '../../components/UI/Carousel/PosterHolder/PosterHolder';
import ContentFilters from '../../components/ContentFilters/ContentFilters';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import { contentReducer, INITIAL_STATE } from './reducer';

import styles from './UserContent.module.css';

const UserContent = (props) => {
  const { title, isWatchlist, isLikes, isWatched } = props;
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const loginToken = useSelector((state) => state.auth.loginToken);

  const [contentState, dispatchContent] = useReducer(
    contentReducer,
    INITIAL_STATE
  );

  const {
    isLoading,
    currentPage,
    totalPages,
    display,
    genresList,
    showMovies,
    isListFiltered,
    hasError,
    errorMessage
  } = contentState;

  const [showFilter, setShowFilter] = useState(false);

  const getMovieGenres = useCallback(async () => {
    let result;
    if (showMovies) {
      result = await fetchMovieGenresList();
    } else {
      result = await fetchTvGenresList();
    }

    return result;
  }, [showMovies]);

  useEffect(() => {
    let isSubscribed = true;
    getMovieGenres().then((res) => {
      if (isSubscribed) {
        if (!res.hasError) {
          dispatchContent({ type: 'SET_GENRES', payload: res.genres });
        } else {
          dispatchContent({ type: 'SET_GENRES', payload: [] });
        }
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [getMovieGenres]);

  const getList = useCallback(
    async (pageNum = 1) => {
      let list;
      if (isWatchlist) {
        list = await fetchWatchlist(loginToken, pageNum);
      } else if (isLikes) {
        list = await fetchLikes(loginToken, pageNum);
      } else if (isWatched) {
        list = await fetchWatched(loginToken, pageNum);
      }

      if (list.hasError) {
        return list;
      }

      const movies = list.results.filter((item) => item.type === 'movie');
      const tv = list.results.filter((item) => item.type === 'tv');

      const moviesWithData = await Promise.all(
        movies.map(async (item) => {
          const data = await fetchSimpleMovieData(item.id);
          return data;
        })
      );
      const tvWithData = await Promise.all(
        tv.map(async (item) => {
          const data = await fetchSimpleTvData(item.id);
          return data;
        })
      );

      return {
        movies: moviesWithData,
        tv: tvWithData,
        totalPages: list.total_pages
      };
    },
    [loginToken, isLikes, isWatched, isWatchlist]
  );

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      getList(currentPage).then((res) => {
        if (res.hasError) {
          dispatchContent({ type: 'SET_ERROR', payload: res });
        }
        if (isSubscribed && !res.hasError) {
          dispatchContent({ type: 'SET_CONTENT', payload: res });
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
  }, [getList, isLogedIn, hasError, currentPage]);

  useEffect(
    () => () => {
      dispatchContent({ type: 'RESET_STATE' });
    },
    [isLikes, isWatched, isWatchlist]
  );

  const typeTogglerHandler = () => {
    dispatchContent({ type: 'TOGGLE_CONTENT' });
  };
  const filterTogglerHandler = () => {
    setShowFilter((prevState) => !prevState);
  };

  const filtersSubmitHandler = (filters) => {
    dispatchContent({ type: 'SET_FILTERS', payload: filters });
  };
  const filtersClearHandler = () => {
    dispatchContent({ type: 'CLEAR_FILTERS' });
  };

  const loadMoreHandler = () => {
    if (currentPage + 1 <= totalPages) {
      dispatchContent({ type: 'INCREASE_PAGE' });
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.title__container}>
        <h1>{title}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.content__col1}>
          <div className={styles.content__typeSelector}>
            <button
              className={showMovies ? styles['content__largeBtn--active'] : ''}
              type="button"
              name="movies"
              onClick={typeTogglerHandler}
            >
              Películas
            </button>
            <button
              className={!showMovies ? styles['content__largeBtn--active'] : ''}
              type="button"
              name="tv"
              onClick={typeTogglerHandler}
            >
              Series
            </button>
          </div>
          <div className={styles.filters}>
            <button
              className={styles.filters__toggler}
              type="button"
              onClick={filterTogglerHandler}
            >
              <span>{!showFilter ? 'Mostrar' : 'Ocultar'} Filtros</span>
              <FontAwesomeIcon
                icon={!showFilter ? faChevronDown : faChevronUp}
              />
            </button>
            <div
              className={`${styles.filters__selector} ${
                !showFilter && styles['filters__selector--hide']
              }`}
            >
              <ContentFilters
                list={genresList}
                onSubmit={filtersSubmitHandler}
                onClear={filtersClearHandler}
                isMovies={showMovies}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={loadMoreHandler}
            className={`${styles.search__more} ${
              currentPage === totalPages && styles['search__more--disabled']
            }`}
          >
            {currentPage === totalPages
              ? 'Se han cargado todos los resultados'
              : 'Cargar más resultados'}
          </button>
        </div>
        {!hasError && (
          <div className={styles.content__grid}>
            {!isLoading &&
              display.length > 0 &&
              display.map((movie) => (
                <PosterHolder item={movie} key={movie.id} />
              ))}
            {!isLoading && display.length === 0 && isListFiltered && (
              <h3 className={styles.msgText}>
                Ninguna {showMovies ? 'película' : 'serie'} de esta lista
                coincide con los filtros ingresados
              </h3>
            )}
            {!isLoading &&
              display.length === 0 &&
              !isListFiltered &&
              !hasError && (
                <h3 className={styles.msgText}>
                  Todavía no has agregado {showMovies ? 'películas' : 'series'}{' '}
                  a esta lista
                </h3>
              )}
          </div>
        )}
        {!isLoading && hasError && (
          <ErrorMessage message={errorMessage} isSmall />
        )}
      </div>
    </main>
  );
};

UserContent.propTypes = {
  title: PropTypes.string,
  isWatchlist: PropTypes.bool,
  isLikes: PropTypes.bool,
  isWatched: PropTypes.bool
};
UserContent.defaultProps = {
  title: '',
  isWatchlist: false,
  isLikes: false,
  isWatched: false
};

export default UserContent;
