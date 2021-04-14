import { IData, IMovie } from '../../helpers/interface';

import {
  MoviesState,
  MoviesActionTypes,
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_ADD_MOVIE_SUCCESS,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  UPDATE_STATUS_MOVIE_POPUP,
  UPDATE_SELECTED_MOVIE_ID,
  FETCH_GET_MOVIE_SUCCESS,
  FETCH_GET_MOVIE_FAILED,
} from '../types/movies-reducer-types';

const initialState: MoviesState = {
  movies: {
    totalAmount: 0,
    data: [],
    offset: 0,
    limit: 6,
  },
  dataStatus: 'idle',
  error: null,
  showPopup: false,
  selectedMovieId: 0,
  movie: undefined,
  newPage: true,
};

export const reducerMovies = (state = initialState, action: MoviesActionTypes): MoviesState => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        error: null,
        dataStatus: 'loading',
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        dataStatus: 'success',
        movies: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        dataStatus: 'failed',
        movies: initialState.movies,
      };

    case DELETE_MOVIE:
      const newMoviesForDelete: IData = state.movies;
      newMoviesForDelete.totalAmount = state.movies.totalAmount - 1;
      return {
        ...state,
        movies: newMoviesForDelete,
      };

    case FETCH_GET_MOVIE_SUCCESS:
      const newMovies: IData = state.movies;
      newMovies.totalAmount = 1;
      newMovies.data[0] = action.payload;
      return {
        ...state,
        dataStatus: 'success',
        newPage: false,
        showPopup: true,
        movies: newMovies,
        selectedMovieId: action.payload.id,
        movie: action.payload,
      };

    case FETCH_GET_MOVIE_FAILED:
      return {
        ...state,
        dataStatus: 'failed',
        error: action.payload.message,
      };

    case FETCH_ADD_MOVIE_SUCCESS:
      const newMoviesAfterAdd: IData = state.movies;
      newMoviesAfterAdd.totalAmount = state.movies.totalAmount + 1;
      return {
        ...state,
        movies: newMoviesAfterAdd,
      };

    case UPDATE_MOVIE:
      const newMoviesForEdit: IMovie[] = state.movies.data;
      const index: number = newMoviesForEdit.findIndex(
        (movie: IMovie) => movie.id == action.payload.id,
      );
      newMoviesForEdit[index] = action.payload;
      return {
        ...state,
        movies: {
          totalAmount: state.movies.totalAmount,
          offset: state.movies.offset,
          limit: 6,
          data: newMoviesForEdit,
        },
      };

    case UPDATE_STATUS_MOVIE_POPUP:
      return {
        ...state,
        showPopup: action.payload,
      };

    case UPDATE_SELECTED_MOVIE_ID:
      const indexMovie: number = state.movies.data.findIndex(
        (movie: IMovie) => movie.id == action.payload,
      );
      return {
        ...state,
        newPage: false,
        showPopup: false,
        selectedMovieId: action.payload == 0 ? 0 : action.payload,
        movie: action.payload == 0 ? undefined : state.movies.data[indexMovie],
      };

    default:
      return state;
  }
};
