import { IMovie } from '../../helpers/interface';

export const ADD_TO_MOVIES = 'ADD_TO_MOVIES';
export const DELETE_FROM_MOVIES = 'DELETE_FROM_MOVIES';
export const UPDATE_MOVIE_IN_MOVIES = 'UPDATE_MOVIE_IN_MOVIES';
export const UPDATE_STATUS_MOVIE_POPUP = 'UPDATE_STATUS_MOVIE_POPUP';
export const UPDATE_SELECTED_MOVIE_ID = 'UPDATE_SELECTED_MOVIE_ID';

export interface MoviesState {
  movies: IMovie[];
  moviesIsLoading: boolean;
  showPopup: boolean;
  selectedMovieId: number;
  movie: IMovie | undefined;
}

interface AddMovieToMovies {
  type: typeof ADD_TO_MOVIES;
  payload: IMovie;
}

interface DeleteFromMovies {
  type: typeof DELETE_FROM_MOVIES;
  payload: number;
}

interface UpdateMovieInMovies {
  type: typeof UPDATE_MOVIE_IN_MOVIES;
  payload: IMovie;
}

interface UpdateStatusMoviePopup {
  type: typeof UPDATE_STATUS_MOVIE_POPUP;
  payload: boolean;
}

interface UpdateSelectedMovieId {
  type: typeof UPDATE_SELECTED_MOVIE_ID;
  payload: number;
}

export type MoviesActionTypes =
  | AddMovieToMovies
  | DeleteFromMovies
  | UpdateMovieInMovies
  | UpdateStatusMoviePopup
  | UpdateSelectedMovieId;
