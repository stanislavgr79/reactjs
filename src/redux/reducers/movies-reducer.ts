import { IMovie } from '../../helpers/interface';

import {
  MoviesState,
  MoviesActionTypes,
  ADD_TO_MOVIES,
  DELETE_FROM_MOVIES,
  UPDATE_MOVIE_IN_MOVIES,
  UPDATE_STATUS_MOVIE_POPUP,
  UPDATE_SELECTED_MOVIE_ID,
} from '../types/movies-reducer-types';

const initialState: MoviesState = {
  movies: require('../../resources/movies.json'),
  moviesIsLoading: true,
  showPopup: false,
  selectedMovieId: 0,
  movie: undefined,
};

export const reducerMovies = (state = initialState, action: MoviesActionTypes): MoviesState => {
  switch (action.type) {
    case ADD_TO_MOVIES:
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    case DELETE_FROM_MOVIES:
      return {
        ...state,
        movies: state.movies.filter((movie: IMovie) => movie.id !== action.payload),
      };

    case UPDATE_MOVIE_IN_MOVIES:
      const index: number = state.movies.findIndex(
        (movie: IMovie) => movie.id == action.payload.id,
      );
      const newMovies: IMovie[] = [...state.movies];
      newMovies[index] = action.payload;
      return {
        ...state,
        movies: newMovies,
      };

    case UPDATE_STATUS_MOVIE_POPUP:
      return {
        ...state,
        showPopup: action.payload,
      };

    case UPDATE_SELECTED_MOVIE_ID:
      const indexMovie: number = state.movies.findIndex(
        (movie: IMovie) => movie.id == action.payload,
      );
      return {
        ...state,
        selectedMovieId: action.payload == 0 ? 0 : action.payload,
        movie: action.payload == 0 ? undefined : state.movies[indexMovie],
      };

    default:
      return state;
  }
};
