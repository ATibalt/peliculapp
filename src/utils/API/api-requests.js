const API_KEY = '400e955fa8d38809ec388750cf3162a1';
const LANGUAGE_ES = 'es-MX';

export const fetchPopularTV = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchOnTheatresMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE_ES}&page=1`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchMultiSearch = async (searchValue, pageValue) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/muti?api_key=${API_KEY}&language=${LANGUAGE_ES}&query=${searchValue}&page=${pageValue}&include_adult=false`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
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
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=release_dates,credits,videos,recommendations,similar`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchTvData = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=aggregate_credits,content_ratings,videos,recommendations,similar`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchPersonData = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=${LANGUAGE_ES}&append_to_response=combined_credits,external_ids`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchMovieGenresList = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE_ES}`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};

export const fetchTvGenresList = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE_ES}`
    );
    if (response.status !== 200) {
      const data = await response.json();
      throw new Error(data.status_message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { hasError: true, message: error.message };
  }
};
