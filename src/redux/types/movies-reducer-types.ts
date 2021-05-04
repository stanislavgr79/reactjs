import { IData, IMovie } from '../../helpers/interface';

export const API_REQUEST = 'API_REQUEST';
export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_ADD_MOVIE_SUCCESS = 'FETCH_ADD_MOVIE_SUCCESS';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';
export const FETCH_GET_MOVIE_SUCCESS = 'FETCH_GET_MOVIE_SUCCESS';
export const FETCH_GET_MOVIE_FAILED = 'FETCH_GET_MOVIE_FAILED';
export const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
export const UPDATE_STATUS_MOVIE_POPUP = 'UPDATE_STATUS_MOVIE_POPUP';
export const UPDATE_SELECTED_MOVIE_ID = 'UPDATE_SELECTED_MOVIE_ID';

export interface MoviesState {
  [x: string]: any;
  movies: IData;
  dataStatus: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null | unknown;
  showPopup: boolean;
  selectedMovieId: number | undefined;
  movie: IMovie | undefined;
  newPage: boolean;
}

interface FetchData {
  type: typeof FETCH_DATA;
}

interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: IData;
}

interface FetchDataFailure {
  type: typeof FETCH_DATA_FAILURE;
  payload: { error: string };
}

interface DeleteMovie {
  type: typeof DELETE_MOVIE_SUCCESS;
}

interface GetMovieSuccess {
  type: typeof FETCH_GET_MOVIE_SUCCESS;
  payload: IMovie;
}

interface GetMovieFailure {
  type: typeof FETCH_GET_MOVIE_FAILED;
  payload: { message: string };
}

interface UpdateMovie {
  type: typeof UPDATE_MOVIE_SUCCESS;
  payload: IMovie;
}

interface AddMovie {
  type: typeof FETCH_ADD_MOVIE_SUCCESS;
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
  | FetchData
  | FetchDataSuccess
  | FetchDataFailure
  | DeleteMovie
  | UpdateMovie
  | AddMovie
  | GetMovieSuccess
  | GetMovieFailure
  | UpdateStatusMoviePopup
  | UpdateSelectedMovieId;
