const API_KEY = '400e955fa8d38809ec388750cf3162a1';
const LANGUAGE_ES = 'es-MX';

export const fetchPopularTV = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchOnTheatresMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchTopRatedTv = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
  );
  const data = await response.json();

  return data;
};

export const fetchMultiSearch = async (searchValue, pageValue) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${LANGUAGE_ES}&query=${searchValue}&page=${pageValue}&include_adult=false`
  );
  const data = await response.json();

  return data;
};

export const fetchSimpleMovieData = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}`
  );
  const data = await response.json();

  return data;
};

export const fetchSimpleTvData = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}`
  );
  const data = await response.json();

  return data;
};

export const fetchMovieData = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=release_dates,credits,videos,recommendations,similar`
  );
  const data = await response.json();

  return data;
};

export const fetchTvData = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=aggregate_credits,content_ratings,videos,recommendations,similar`
  );
  const data = await response.json();

  return data;
};

export const fetchPersonData = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=combined_credits,external_ids`
  );
  const data = await response.json();

  return data;
};

export const fetchMovieGenresList = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE_ES}`
  );
  const data = await response.json();

  return data;
};

export const fetchTvGenresList = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE_ES}`
  );
  const data = await response.json();

  return data;
};
