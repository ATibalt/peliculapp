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

const Carousel = (props) => {
  const { content, title } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const currentWindowWidth = useMediaQuery();
  const showButtons = !(currentWindowWidth < 768);
  const numPerPage = Math.floor(currentWindowWidth / 215);
  const maxPages =
    numPerPage === 10
      ? 1
      : Math.round(content.length / (currentWindowWidth / 215));

  useEffect(() => {
    if (numPerPage === 10) {
      setCurrentPage(0);
    }
  }, [numPerPage]);

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
        {showButtons && (
          <button
            type="button"
            className={`${styles.contentCarousel__arrow} ${styles.contentCarousel__arrowLeft}`}
            onClick={leftArrowClickHandler}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {showButtons && (
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
            transform: `translateX(-${currentPage * (numPerPage * 215)}px`
          }}
        >
          {content.map((item) => (
            <PosterHolder key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.object)
};

Carousel.defaultProps = {
  title: 'Titulo',
  content: []
};

export default Carousel;
