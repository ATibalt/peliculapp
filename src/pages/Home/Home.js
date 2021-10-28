/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import Carousel from '../../components/UI/Carousel/Carousel';
import {
  fetchOnTheatresMovies,
  fetchPopularMovies,
  fetchPopularTV,
  fetchUpcomingMovies
} from '../../utils/API/api-requests';

import styles from './Home.module.css';

const INITIAL_STATE = {
  isLoading: true,
  hasError: false,
  content: [],
  errorMessage: undefined
};

const Home = () => {
  const [heroIsLoading, setHeroIsLoading] = useState(true);
  const [topContent, setTopContent] = useState({
    type: [],
    isLoading: true,
    img: [],
    title: []
  });
  const [showLoader, setShowLoader] = useState(true);
  const [topContentIndex, setTopContentIndex] = useState({
    currentIndex: 0,
    maxIndex: undefined
  });

  const [popularMoviesAux, setPopularMoviesAux] = useState({
    ...INITIAL_STATE
  });
  const [popularTvAux, setPopularTvAux] = useState({ ...INITIAL_STATE });
  const [onTheatresAux, setOnTheatresAux] = useState({ ...INITIAL_STATE });
  const [upcomingMoviesAux, setUpcomingMoviesAux] = useState({
    ...INITIAL_STATE
  });

  const getPopularContentAux = useCallback(async () => {
    const popMovies = await fetchPopularMovies();
    const popTv = await fetchPopularTV();
    const theatresMovs = await fetchOnTheatresMovies();
    const upcoming = await fetchUpcomingMovies();

    const result = {
      popMovies,
      popTv,
      theatresMovs,
      upcoming
    };

    return result;
  }, []);

  const setStates = useCallback((results, setFunc) => {
    if (results.hasError) {
      setFunc({
        ...INITIAL_STATE,
        isLoading: false,
        hasError: true,
        errorMessage: results.message
      });
    } else {
      setFunc({
        ...INITIAL_STATE,
        isLoading: false,
        content: results.results
      });
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    getPopularContentAux().then((results) => {
      if (isSubscribed) {
        setStates(results.popMovies, setPopularMoviesAux);
        setStates(results.popTv, setPopularTvAux);
        setStates(results.theatresMovs, setOnTheatresAux);
        setStates(results.upcoming, setUpcomingMoviesAux);

        if (!results.popMovies.hasError || !results.popTv.hasError) {
          const topType = [];
          const topImg = [];
          const topTitle = [];

          if (!results.popMovies.hasError) {
            topType.push('Películas');
            topImg.push(results.popMovies.results[0].backdrop_path);
            topTitle.push(results.popMovies.results[0].title);
          }
          if (!results.popTv.hasError) {
            topType.push('TV');
            topImg.push(results.popTv.results[0].backdrop_path);
            topTitle.push(results.popTv.results[0].name);
          }

          setTopContent((prevState) => ({
            ...prevState,
            isLoading: false,
            type: topType,
            img: topImg,
            title: topTitle
          }));
          setTopContentIndex((prevState) => ({
            ...prevState,
            maxIndex: topImg.length - 1
          }));
        }
      }
    });
    return () => {
      isSubscribed = false;
    };
  }, [getPopularContentAux, setStates]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopContentIndex((prevState) => ({
        ...prevState,
        currentIndex:
          prevState.currentIndex + 1 > prevState.maxIndex
            ? 0
            : prevState.currentIndex + 1
      }));
      setShowLoader(false);
    }, 10000);
    return () => {
      clearTimeout(timer);
      setShowLoader(true);
    };
  }, [topContentIndex]);

  return (
    <main className={styles.main}>
      {(!popularMoviesAux.hasError || !popularTvAux.hasError) && (
        <div
          className={`${styles.hero} ${
            heroIsLoading && styles['hero--isLoading']
          }`}
        >
          {!topContent.isLoading && (
            <>
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  topContent.img[topContentIndex.currentIndex]
                }`}
                alt={topContent.title[topContentIndex.currentIndex]}
                onLoad={() => setHeroIsLoading(false)}
              />
              <div className={styles.hero__title}>
                <span>
                  #1 en {topContent.type[topContentIndex.currentIndex]} esta
                  semana
                </span>
                <span>{topContent.title[topContentIndex.currentIndex]}</span>
                {showLoader && topContentIndex.maxIndex !== 0 && (
                  <div className={styles.hero__loader} />
                )}
              </div>
            </>
          )}
        </div>
      )}
      {!popularMoviesAux.isLoading && !popularMoviesAux.hasError && (
        <Carousel
          title="Las películas más populares"
          content={popularMoviesAux.content}
        />
      )}
      {!popularTvAux.isLoading && !popularTvAux.hasError && (
        <Carousel
          title="Las series más populares"
          content={popularTvAux.content}
        />
      )}
      {!onTheatresAux.isLoading && !onTheatresAux.hasError && (
        <Carousel
          title="Actualmente en cines"
          content={onTheatresAux.content}
        />
      )}
      {!upcomingMoviesAux.isLoading && !upcomingMoviesAux.hasError && (
        <Carousel
          title="Próximos estrenos"
          content={upcomingMoviesAux.content}
        />
      )}
      {popularMoviesAux.hasError &&
        popularTvAux.hasError &&
        onTheatresAux.hasError &&
        upcomingMoviesAux.hasError && (
          <div className={styles.error}>
            <h1 className={styles.error__message}>
              Estamos experimentando problemas para comunicarnos con el servidor
              :(
            </h1>
          </div>
        )}
    </main>
  );
};

export default Home;
