import { IMovie } from '../../helpers/interface';
import {
  UPDATE_STATUS_MOVIE_POPUP,
  ACTION_ADD_TO_MOVIES,
  ACTION_REMOVE_FROM_MOVIES,
  UPDATE_MOVIE_IN_MOVIES,
} from '../reducers/movies-reducer';

export const updateShowPopup = (payload: boolean) => ({
  type: UPDATE_STATUS_MOVIE_POPUP,
  payload,
});

export const addToMovies = (payload: IMovie) => ({
  type: ACTION_ADD_TO_MOVIES,
  payload,
});

export const updateMovieInMovies = (payload: IMovie) => ({
  type: UPDATE_MOVIE_IN_MOVIES,
  payload,
});

export const deleteFromMovies = (payload: number | undefined) => ({
  type: ACTION_REMOVE_FROM_MOVIES,
  payload,
});
