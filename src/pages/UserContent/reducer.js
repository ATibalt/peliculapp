import filterArray from '../../utils/Filter/array-filter';

export const INITIAL_STATE = {
  isLoading: true,
  currentMoviePage: 1,
  currentTvPage: 1,
  totalMoviePages: undefined,
  totalTvPages: undefined,
  movieList: [],
  tvList: [],
  display: [],
  filters: {},
  isListFiltered: false,
  genresList: [],
  showMovies: true,
  hasError: false,
  errorMessage: ''
};

export const contentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES': {
      const fetchedMovies = [...state.movieList, ...action.payload.movies];
      return {
        ...state,
        isLoading: false,
        hasError: false,
        totalMoviePages: action.payload.totalPages,
        errorMessage: '',
        movieList: fetchedMovies,
        display: fetchedMovies
      };
    }
    case 'SET_TV': {
      const fetchedTv = [...state.tvList, ...action.payload.tv];
      return {
        ...state,
        isLoading: false,
        hasError: false,
        totalTvPages: action.payload.totalPages,
        errorMessage: '',
        tvList: fetchedTv,
        display: fetchedTv
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
    case 'SET_ERROR': {
      return {
        ...INITIAL_STATE,
        isLoading: false,
        hasError: action.payload.hasError,
        errorMessage: action.payload.message
      };
    }
    case 'INCREASE_MOVIE_PAGE': {
      return {
        ...state,
        currentMoviePage: state.currentMoviePage + 1
      };
    }
    case 'INCREASE_TV_PAGE': {
      return {
        ...state,
        currentTvPage: state.currentTvPage + 1
      };
    }
    case 'RESET_STATE': {
      return {
        ...INITIAL_STATE,
        genresList: state.genresList,
        showMovies: state.showMovies
      };
    }
    default:
      return {
        ...state
      };
  }
};
