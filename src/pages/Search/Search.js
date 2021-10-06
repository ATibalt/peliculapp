import React, { useState, useEffect, useCallback } from 'react';
import PosterHolder from '../../components/UI/Carousel/PosterHolder/PosterHolder';
import { fetchMultiSearch } from '../../utils/API/api-requests';
// import PropTypes from 'prop-types'

import styles from './Search.module.css';

const Search = () => {
  const placeholder = 'Peliculas, series, actores, etc.';
  const [searchInput, setSearchInput] = useState('');
  const [showBadges, setShowBadges] = useState(false);
  const [showSearch, setShowSearch] = useState({
    type: '',
    results: []
  });
  const [movieSearch, setMovieSearch] = useState([]);
  const [tvSearch, setTvSearch] = useState([]);
  const [actorSearch, setActorSearch] = useState([]);

  const fetchSearch = useCallback(async (searchValue, pageValue = 1) => {
    const searchData = await fetchMultiSearch(searchValue, pageValue);
    const results = [...searchData.results];

    if (results) {
      results.forEach((element) => {
        switch (element.media_type) {
          case 'movie':
            setMovieSearch((prevState) => [...prevState, element]);
            break;
          case 'tv':
            setTvSearch((prevState) => [...prevState, element]);
            break;
          case 'person':
            setActorSearch((prevState) => [...prevState, element]);
            break;
          default:
            break;
        }
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim().length !== 0) {
        fetchSearch(searchInput).then(() => {
          setShowBadges(true);
        });
      } else {
        setShowBadges(false);
      }
    }, 500);
    return () => {
      clearTimeout(timer);
      setMovieSearch([]);
      setTvSearch([]);
      setActorSearch([]);
      setShowSearch({ type: '', results: [] });
    };
  }, [searchInput, fetchSearch]);

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const notFoundMsg =
    searchInput.trim().length === 0
      ? 'Ingrese el termino de busqueda deseado'
      : 'No se encontraron resultados en esta categoria para tu búsqueda';

  const showSearchHandler = (event) => {
    switch (event.target.name) {
      case 'movies':
        setShowSearch({
          type: 'movies',
          results: movieSearch
        });
        break;
      case 'tv':
        setShowSearch({
          type: 'tv',
          results: tvSearch
        });
        break;
      case 'actors':
        setShowSearch({
          type: 'actors',
          results: actorSearch
        });
        break;
      default:
        break;
    }
  };

  return (
    <main className={styles.search}>
      <div className={styles.search__searchGroup}>
        <div className={styles.search__searchBar}>
          <input
            className={styles.search__searchInput}
            type="text"
            placeholder={placeholder}
            onChange={searchInputHandler}
          />
        </div>
        <div className={styles.search__searchFilters}>
          <div className={styles.search__filtersTitle}>
            <span>Resultados de la búsqueda</span>
          </div>
          <div className={styles.search__filtersClasses}>
            <button
              type="button"
              className={`${styles.search__filtersClass} ${
                showSearch.type === 'movies'
                  ? styles['search__filtersClass--active']
                  : ''
              }`}
              onClick={showSearchHandler}
              name="movies"
            >
              <span>Películas</span>
              {showBadges && (
                <span className={styles.search__countBadge}>
                  {movieSearch.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`${styles.search__filtersClass} ${
                showSearch.type === 'tv'
                  ? styles['search__filtersClass--active']
                  : ''
              }`}
              onClick={showSearchHandler}
              name="tv"
            >
              <span>Series</span>
              {showBadges && (
                <span className={styles.search__countBadge}>
                  {tvSearch.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`${styles.search__filtersClass} ${
                showSearch.type === 'actors'
                  ? styles['search__filtersClass--active']
                  : ''
              }`}
              onClick={showSearchHandler}
              name="actors"
            >
              <span>Personas</span>
              {showBadges && (
                <span className={styles.search__countBadge}>
                  {actorSearch.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.search__searchResults}>
        {showSearch.results.length > 0 ? (
          <>
            {showSearch.results.map((item) => (
              <PosterHolder item={item} key={item.id} isSearch />
            ))}
          </>
        ) : (
          <>
            <h3 className={styles.search__notFoundMsg}>{notFoundMsg}</h3>
          </>
        )}
      </div>
    </main>
  );
};

// Search.propTypes = {

// }

export default Search;
