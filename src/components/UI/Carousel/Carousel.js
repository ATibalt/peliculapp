import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '../../../hooks/useMediaQuery';
import styles from './Carousel.module.css';
import PosterHolder from './PosterHolder/PosterHolder';
import ProfileHolder from './ProfileHolder/ProfileHolder';

const Carousel = (props) => {
  const { content, title, isPerson } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const currentWindowWidth = useMediaQuery();
  const pictureWidth = 215;
  let pictures;

  if (isPerson) {
    const firstTen = content.length > 10 ? content.slice(0, 10) : [...content];
    pictures = firstTen.map((item) => (
      <div className={styles.contentCarousel__posterCont}>
        <ProfileHolder key={item.credit_id} item={item} />
      </div>
    ));
  } else {
    pictures = content.map((item) => (
      <div className={styles.contentCarousel__posterCont}>
        <PosterHolder key={item.id} item={item} />
      </div>
    ));
  }

  const numPerPage = Math.floor(currentWindowWidth / pictureWidth);

  const showButtons = currentWindowWidth > 768 && maxPages > 0;

  useEffect(() => {
    if (isPerson) {
      setMaxPages(
        numPerPage > 9
          ? 0
          : Math.floor(pictures.length / (currentWindowWidth / pictureWidth))
      );
    } else {
      setMaxPages(
        numPerPage > 9
          ? 1
          : Math.floor(pictures.length / (currentWindowWidth / pictureWidth))
      );
    }
    if (numPerPage > 9) {
      setCurrentPage(0);
    }
  }, [numPerPage, pictures.length, currentWindowWidth, pictureWidth, isPerson]);

  const leftArrowClickHandler = () => {
    if (currentPage > 0) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const rightArrowClickHandler = () => {
    if (currentPage + 1 <= maxPages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  return (
    <div className={styles.contentCarousel}>
      <span>{title}</span>
      <div className={styles.contentCarousel__slider}>
        {showButtons && currentPage !== 0 && (
          <button
            type="button"
            className={`${styles.contentCarousel__arrow} ${styles.contentCarousel__arrowLeft}`}
            onClick={leftArrowClickHandler}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {showButtons && currentPage !== maxPages && (
          <button
            type="button"
            className={`${styles.contentCarousel__arrow} ${styles.contentCarousel__arrowRight}`}
            onClick={rightArrowClickHandler}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
        <div
          className={styles.contentCarousel__sliderMovies}
          style={{
            transform: `translateX(-${
              currentPage * (numPerPage * pictureWidth)
            }px`
          }}
        >
          {pictures}
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object),
  isPerson: PropTypes.bool
};

Carousel.defaultProps = {
  title: 'Titulo',
  content: [],
  isPerson: false
};

export default Carousel;
