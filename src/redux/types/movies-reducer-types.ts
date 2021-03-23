import { IData, IMovie } from '../../helpers/interface';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_ADD_MOVIE_SUCCESS = 'FETCH_ADD_MOVIE_SUCCESS';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const UPDATE_STATUS_MOVIE_POPUP = 'UPDATE_STATUS_MOVIE_POPUP';
export const UPDATE_SELECTED_MOVIE_ID = 'UPDATE_SELECTED_MOVIE_ID';

export interface MoviesState {
  [x: string]: any;
  movies: IData;
  dataStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  showPopup: boolean;
  selectedMovieId: number;
  movie: IMovie | undefined;
}

interface FetchData {
  type: typeof FETCH_DATA;
}

interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  response: { data: IData };
}

interface FetchDataFailure {
  type: typeof FETCH_DATA_FAILURE;
  error: { data: string };
}

interface DeleteMovie {
  type: typeof DELETE_MOVIE;
  payload: number;
}

interface UpdateMovie {
  type: typeof UPDATE_MOVIE;
  response: { data: IMovie };
}

interface AddMovie {
  type: typeof FETCH_ADD_MOVIE_SUCCESS;
  response: IMovie;
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
  | UpdateStatusMoviePopup
  | UpdateSelectedMovieId;
