import { IMovie } from '../../helpers/interface';
import { fetchFromApi } from 'react-redux-api-tools';
const URL_API_MOVIES = 'HTTP://localhost:4000/movies';

import {
  MoviesActionTypes,
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_ADD_MOVIE_SUCCESS,
  DELETE_MOVIE,
  UPDATE_MOVIE,
  UPDATE_STATUS_MOVIE_POPUP,
  UPDATE_SELECTED_MOVIE_ID,
} from '../types/movies-reducer-types';

export const updateShowPopup = (showPopup: boolean): MoviesActionTypes => ({
  type: UPDATE_STATUS_MOVIE_POPUP,
  payload: showPopup,
});

export const updateSelectedMovieId = (id: number): MoviesActionTypes => ({
  type: UPDATE_SELECTED_MOVIE_ID,
  payload: id,
});

export const fetchMovies = (params: string[][]) => {
  const requestUrl = new URL(`${URL_API_MOVIES}`);
  if (params !== undefined) {
    requestUrl.search = new URLSearchParams(params).toString();
  }
  const requestData = {
    method: 'GET',
  };
  return {
    types: {
      request: FETCH_DATA,
      success: FETCH_DATA_SUCCESS,
      failure: FETCH_DATA_FAILURE,
    },
    apiCallFunction: () => fetchFromApi(requestUrl, requestData),
    // shouldDispatch: (AppState, action) => {
    //   return !appState.data;
    // },
  };
};

export const fetchDeleteMovie = (id: number) => {
  const requestUrl = new URL(`${URL_API_MOVIES}/${id}`);
  const requestData = {
    method: 'DELETE',
  };
  return {
    types: {
      request: '',
      success: DELETE_MOVIE,
      failure: '',
    },
    apiCallFunction: () => fetchFromApi(requestUrl, requestData),
  };
};

export const fetchUpdateMovie = (movie: IMovie) => {
  const requestUrl = new URL(`${URL_API_MOVIES}`);
  const requestData = {
    method: 'PUT',
    body: JSON.stringify(movie),
  };
  return {
    types: {
      request: '',
      success: UPDATE_MOVIE,
      failure: '',
    },
    apiCallFunction: () => fetchFromApi(requestUrl, requestData),
  };
};

export const fetchAddMovie = (movie: IMovie) => {
  const requestUrl = new URL(`${URL_API_MOVIES}`);
  const requestData = {
    method: 'POST',
    body: JSON.stringify(movie),
  };
  return {
    types: {
      request: '',
      success: FETCH_ADD_MOVIE_SUCCESS,
      failure: '',
    },
    apiCallFunction: () => fetchFromApi(requestUrl, requestData),
  };
};
