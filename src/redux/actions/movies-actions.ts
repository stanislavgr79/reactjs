import { IMovie } from '../../helpers/interface';

import {
  MoviesActionTypes,
  ADD_TO_MOVIES,
  DELETE_FROM_MOVIES,
  UPDATE_MOVIE_IN_MOVIES,
  UPDATE_STATUS_MOVIE_POPUP,
  UPDATE_SELECTED_MOVIE_ID,
} from '../types/movies-reducer-types';

export const addMovieToMovies = (movie: IMovie): MoviesActionTypes => ({
  type: ADD_TO_MOVIES,
  payload: movie,
});

export const deleteFromMovies = (id: number): MoviesActionTypes => ({
  type: DELETE_FROM_MOVIES,
  payload: id,
});

export const updateMovieInMovies = (movie: IMovie): MoviesActionTypes => ({
  type: UPDATE_MOVIE_IN_MOVIES,
  payload: movie,
});

export const updateShowPopup = (showPopup: boolean): MoviesActionTypes => ({
  type: UPDATE_STATUS_MOVIE_POPUP,
  payload: showPopup,
});

export const updateSelectedMovieId = (id: number): MoviesActionTypes => ({
  type: UPDATE_SELECTED_MOVIE_ID,
  payload: id,
});
