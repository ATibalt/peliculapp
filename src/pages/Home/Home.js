import React, { useState, useCallback, useEffect } from 'react';
import Carousel from '../../components/UI/Carousel/Carousel';
import {
  fetchOnTheatresMovies,
  fetchPopularMovies,
  fetchPopularTV,
  fetchUpcomingMovies
} from '../../utils/API/api-requests';
// import PropTypes from 'prop-types'

import styles from './Home.module.css';

const Home = () => {
  const [heroIsLoading, setHeroIsLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [topContent, setTopContent] = useState({
    type: ['Películas', 'TV'],
    img: [],
    title: []
  });
  const [showLoader, setShowLoader] = useState(true);
  const [topContentIndex, setTopContentIndex] = useState(0);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [onTheatres, setOnTheatres] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const getPopularMovies = useCallback(async () => {
    const popMovies = await fetchPopularMovies();
    const popTv = await fetchPopularTV();
    const theatresMovs = await fetchOnTheatresMovies();
    const upcoming = await fetchUpcomingMovies();

    const topImg = [
      popMovies.results[0].backdrop_path,
      popTv.results[0].backdrop_path
    ];
    const topTitle = [popMovies.results[0].title, popTv.results[0].name];
    setTopContent((prevState) => ({
      ...prevState,
      img: topImg,
      title: topTitle
    }));
    setPopularMovies([...popMovies.results]);
    setPopularTv([...popTv.results]);
    setOnTheatres([...theatresMovs.results]);
    setUpcomingMovies([...upcoming.results]);
  }, []);

  useEffect(() => {
    getPopularMovies().then(() => {
      setMoviesLoading(false);
    });
  }, [getPopularMovies]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopContentIndex((prevState) => (prevState === 0 ? 1 : 0));
      setShowLoader(false);
    }, 10000);
    return () => {
      clearTimeout(timer);
      setShowLoader(true);
    };
  }, [topContentIndex]);

  return (
    <main>
      <div
        className={`${styles.homeHero} ${
          heroIsLoading && styles['homeHero--isLoading']
        }`}
      >
        {!moviesLoading && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original/${topContent.img[topContentIndex]}`}
              alt={topContent.title[topContentIndex]}
              onLoad={() => setHeroIsLoading(false)}
            />
            <div className={styles.homeHero__title}>
              <span>#1 en {topContent.type[topContentIndex]} esta semana</span>
              <span>{topContent.title[topContentIndex]}</span>
              {showLoader && <div className={styles.homeHero__loader} />}
            </div>
          </>
        )}
      </div>
      {!moviesLoading && (
        <>
          <Carousel
            title="Las películas más populares"
            content={popularMovies}
          />
          <Carousel title="Las series más populares" content={popularTv} />
          <Carousel title="Actualmente en cines" content={onTheatres} />
          <Carousel title="Próximos estrenos" content={upcomingMovies} />
        </>
      )}
    </main>
  );
};

// Home.propTypes = {

// }

export default Home;
