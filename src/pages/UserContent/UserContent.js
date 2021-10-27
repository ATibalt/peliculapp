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
import filterArray from '../../utils/Filter/array-filter';

import styles from './UserContent.module.css';

const INITIAL_STATE = {
  isLoading: true,
  movieList: [],
  tvList: [],
  display: [],
  filters: {},
  isListFiltered: false,
  genresList: [],
  showMovies: true
};

function contentReducer(state, action) {
  switch (action.type) {
    case 'SET_CONTENT': {
      const fetchedMovies = [...action.payload.movies];
      const fetchedTv = [...action.payload.tv];
      return {
        ...state,
        isLoading: false,
        movieList: fetchedMovies,
        tvList: fetchedTv,
        display: state.showMovies ? fetchedMovies : fetchedTv
      };
    }
    case 'TOGGLE_CONTENT': {
      const newShowState = !state.showMovies;
      const newDisplayState = state.showMovies ? state.tvList : state.movieList;

      return {
        ...state,
        showMovies: newShowState,
        display: newDisplayState
      };
    }
    case 'SET_FILTERS': {
      let contentList = [];
      let isFiltered = false;
      const content = state.showMovies ? state.movieList : state.tvList;
      if (state.display.length > 0) {
        contentList = filterArray(
          [...content],
          state.showMovies,
          action.payload
        );
        isFiltered = true;
      }

      return {
        ...state,
        display: contentList,
        isListFiltered: isFiltered,
        filters: action.payload
      };
    }
    case 'CLEAR_FILTERS': {
      const newDisplayState = state.showMovies ? state.movieList : state.tvList;

      return {
        ...state,
        display: newDisplayState,
        isListFiltered: false,
        filters: {}
      };
    }
    case 'SET_GENRES': {
      const fetchedGenres = [...action.payload];
      return {
        ...state,
        genresList: fetchedGenres
      };
    }
    default:
      return {
        ...state
      };
  }
}

const UserContent = (props) => {
  const { title, isWatchlist, isLikes, isWatched } = props;
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const loginToken = useSelector((state) => state.auth.loginToken);

  const [contentState, dispatchContent] = useReducer(
    contentReducer,
    INITIAL_STATE
  );

  const { isLoading, display, genresList, showMovies, isListFiltered } =
    contentState;

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
        dispatchContent({ type: 'SET_GENRES', payload: res.genres });
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [getMovieGenres]);

  const getList = useCallback(
    async (pageValue = 1) => {
      let list;
      if (isWatchlist) {
        list = await fetchWatchlist(loginToken);
      } else if (isLikes) {
        list = await fetchLikes(loginToken);
      } else if (isWatched) {
        list = await fetchWatched(loginToken);
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

      return { movies: moviesWithData, tv: tvWithData };
    },
    [loginToken, isLikes, isWatched, isWatchlist]
  );

  useEffect(() => {
    let isSubscribed = true;
    if (isLogedIn) {
      getList().then((res) => {
        if (isSubscribed) {
          dispatchContent({ type: 'SET_CONTENT', payload: res });
        }
      });
    }
    return () => {
      isSubscribed = false;
    };
  }, [getList, isLogedIn]);

  const typeTogglerHandler = (event) => {
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
        </div>
        <div className={styles.content__grid}>
          {!isLoading &&
            display.length > 0 &&
            display.map((movie) => (
              <PosterHolder item={movie} key={movie.id} />
            ))}
          {!isLoading && display.length === 0 && isListFiltered && (
            <h3 className={styles.msgText}>
              Ninguna {showMovies ? 'película' : 'serie'} de esta lista coincide
              con los filtros ingresados
            </h3>
          )}
          {!isLoading && display.length === 0 && !isListFiltered && (
            <h3 className={styles.msgText}>
              Todavía no has agregado {showMovies ? 'películas' : 'series'} a
              esta lista
            </h3>
          )}
        </div>
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
