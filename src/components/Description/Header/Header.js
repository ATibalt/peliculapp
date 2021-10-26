import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.css';
import Info from './Info/Info';

const Header = (props) => {
  const { data, type } = props;
  let title;
  let rating;
  let release = [];
  let runtime;
  let votes;
  let trailer;
  let image;

  function convertMinToHr(min) {
    const h = min / 60;
    const hInt = Math.floor(h);
    const m = Math.floor(60 * (h - hInt));

    return `${hInt}h ${m}m`;
  }

  function checkTrailer() {
    const hasTrailer = !!data.videos.results.length > 0;
    if (hasTrailer) {
      const trailerLink = `https://www.youtube.com/watch?v=${data.videos.results[0].key}`;
      return [hasTrailer, trailerLink];
    }
    return [hasTrailer, ''];
  }

  switch (type) {
    case 'movie': {
      title = data.title;
      if (data.release_dates.results.length > 0) {
        const ratingData = data.release_dates.results.filter(
          (item) => item.iso_3166_1 === 'US'
        );
        rating = ratingData[0]
          ? ratingData[0].release_dates[0].certification
          : data.release_dates.results[0].certification;
      } else {
        rating = '';
      }
      release = data.release_date ? data.release_date.split('-') : '';
      runtime =
        data.runtime > 60 ? convertMinToHr(data.runtime) : `${data.runtime} m`;
      votes = data.vote_average * 10;
      trailer = checkTrailer();
      image = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      break;
    }
    case 'tv': {
      title = data.name;
      if (data.content_ratings.results.length > 0) {
        const ratingData = data.content_ratings.results.filter(
          (item) => item.iso_3166_1 === 'US'
        );
        rating = ratingData[0]
          ? ratingData[0].rating
          : data.content_ratings.results[0].rating;
      } else {
        rating = '';
      }
      release = data.first_air_date ? data.first_air_date.split('-') : '';
      if (data.episode_run_time.length > 0) {
        runtime =
          data.episode_run_time[0] > 60
            ? convertMinToHr(data.episode_run_time[0])
            : `${data.episode_run_time[0]} m`;
      }
      votes = data.vote_average * 10;
      trailer = checkTrailer();
      image = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
      break;
    }
    case 'person': {
      image = `https://image.tmdb.org/t/p/w500/${data.profile_path}`;
      break;
    }
    default:
      break;
  }

  return (
    <div
      className={`${styles.header} ${
        type !== 'person' && styles['header--lg']
      }`}
    >
      <div className={styles.header__backdropCont}>
        <img
          src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
          alt={`${title} backdrop`}
          className={styles.header__backdrop}
        />
      </div>
      <div className={styles.header__info}>
        <div className={styles.header__posterCont}>
          <img
            src={image}
            alt={`${title} poster`}
            className={styles.header__poster}
          />
        </div>
        <Info
          id={data.id}
          type={type}
          title={title}
          release={release[0]}
          rating={rating}
          runtime={runtime}
          votes={votes}
          trailer={trailer}
        />
      </div>
      <div className={styles.header__gradient} />
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  type: PropTypes.string
};
Header.defaultProps = {
  data: {},
  type: ''
};

export default Header;
