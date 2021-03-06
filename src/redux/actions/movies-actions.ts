import { IMovie } from '../../helpers/interface';
import { createAction } from 'redux-api-middleware';
const URL_API_MOVIES = 'HTTP://localhost:4000/movies';

import {
  MoviesActionTypes,
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_ADD_MOVIE_SUCCESS,
  DELETE_MOVIE_SUCCESS,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_STATUS_MOVIE_POPUP,
  UPDATE_SELECTED_MOVIE_ID,
  FETCH_GET_MOVIE_SUCCESS,
  FETCH_GET_MOVIE_FAILED,
  API_REQUEST,
} from '../types/movies-reducer-types';

export const updateShowPopup = (showPopup: boolean): MoviesActionTypes => ({
  type: UPDATE_STATUS_MOVIE_POPUP,
  payload: showPopup,
});

export const updateSelectedMovieId = (id: number): MoviesActionTypes => ({
  type: UPDATE_SELECTED_MOVIE_ID,
  payload: id,
});

export const fetchMovies = (params: string[][]) =>
  createAction({
    endpoint: `${URL_API_MOVIES}?${new URLSearchParams(params).toString()}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE],
  });

export const fetchDeleteMovie = (id?: number) =>
  createAction({
    endpoint: `${URL_API_MOVIES}/${id}`,
    method: 'DELETE',
    types: [API_REQUEST, DELETE_MOVIE_SUCCESS, ''],
  });

export const fetchUpdateMovie = (movie: IMovie) =>
  createAction({
    endpoint: URL_API_MOVIES,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
    types: [API_REQUEST, UPDATE_MOVIE_SUCCESS, ''],
  });

export const fetchAddMovie = (movie: IMovie) =>
  createAction({
    endpoint: URL_API_MOVIES,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
    types: [API_REQUEST, FETCH_ADD_MOVIE_SUCCESS, ''],
  });

export const fetchGetMovieById = (id?: number) =>
  createAction({
    endpoint: `${URL_API_MOVIES}/${id}`,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [API_REQUEST, FETCH_GET_MOVIE_SUCCESS, FETCH_GET_MOVIE_FAILED],
  });
