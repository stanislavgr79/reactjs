import * as actions from '../movies-actions';
import * as types from '../../types/movies-reducer-types';
import configureMockStore from 'redux-mock-store';
import { apiMiddleware, RequestError } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);
const URL_API_MOVIES = 'HTTP://localhost:4000/movies';

describe('movies-actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to updateShowPopup', () => {
    const payload = true;
    const expectedAction = {
      type: types.UPDATE_STATUS_MOVIE_POPUP,
      payload,
    };
    expect(actions.updateShowPopup(payload)).toEqual(expectedAction);
  });

  it('should create an action to updateSelectedMovieId', () => {
    const payload = 123456;
    const expectedAction = {
      type: types.UPDATE_SELECTED_MOVIE_ID,
      payload,
    };
    expect(actions.updateSelectedMovieId(payload)).toEqual(expectedAction);
  });

  it('creates FETCH_GET_MOVIE_SUCCESS when fetching fetchGetMovieById has been done', async () => {
    const id = 12345;

    fetchMock.getOnce(
      `${URL_API_MOVIES}/${id}`,
      {
        myResponse: ['response something'],
      },
      {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      },
    );

    const expectedActions = [
      { type: types.API_REQUEST },
      {
        type: types.FETCH_GET_MOVIE_SUCCESS,
        payload: { myResponse: ['response something'] },
        meta: undefined,
      },
    ];
    const store = mockStore({ myResponse: [] });

    return store.dispatch(actions.fetchGetMovieById(12345)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_GET_MOVIE_FAILED when fetching fetchGetMovieById has been failed', async () => {
    const id = 12345;

    fetchMock.getOnce(`${URL_API_MOVIES}/${id}`, {
      throws: {
        status: 404,
        message: ['Not Found'],
      },
    });

    const expectedActions = [
      { type: types.API_REQUEST },
      {
        type: types.FETCH_GET_MOVIE_FAILED,
        error: true,
        payload: new RequestError('Not Found'),
        meta: undefined,
      },
    ];
    const store = mockStore({ myResponse: [] });

    return store.dispatch(actions.fetchGetMovieById(12345)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_MOVIE_SUCCESS when fetching fetchDeleteMovie has been done', async () => {
    const id = 12345;
    fetchMock.mock(`${URL_API_MOVIES}/${id}`, 204);

    const expectedActions = [
      { type: types.API_REQUEST },
      {
        type: types.DELETE_MOVIE_SUCCESS,
        payload: undefined,
        meta: undefined,
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchDeleteMovie(12345)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_ADD_MOVIE_SUCCESS when fetching fetchAddMovie has been done', async () => {
    const movie = {
      id: 12345,
      title: 'title',
      release_date: '',
      genres: [''],
      overview: '',
      runtime: 66,
    };

    fetchMock.mock(`${URL_API_MOVIES}`, 200, {
      body: movie,
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    });

    const expectedActions = [
      { type: types.API_REQUEST },
      {
        type: types.FETCH_ADD_MOVIE_SUCCESS,
        payload: undefined,
        meta: undefined,
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchAddMovie(movie)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  //   eslint-disable-next-line max-len
  it('creates FETCH_UPDATE_MOVIE_SUCCESS when fetching fetchUpdateMovie has been done', async () => {
    const movie = {
      id: 12345,
      title: 'title',
      release_date: '',
      genres: [''],
      overview: '',
      runtime: 66,
    };

    fetchMock.mock(`${URL_API_MOVIES}`, 200, {
      body: movie,
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
    });

    const expectedActions = [
      { type: types.API_REQUEST },
      {
        type: types.UPDATE_MOVIE_SUCCESS,
        payload: undefined,
        meta: undefined,
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchUpdateMovie(movie)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_DATA_FAILURE when fetching fetchMovies has been failed', async () => {
    const parameters = [
      ['offset', ''],
      ['limit', '6'],
      ['searchBy', 'title'],
      ['search', ''],
      ['filter', ''],
      ['sortBy', ''],
      ['sortOrder', ''],
    ];

    fetchMock.getOnce(`${URL_API_MOVIES}?${new URLSearchParams(parameters).toString()}`, {
      throws: {
        status: 404,
        message: ['Not Found'],
      },
    });

    const expectedActions = [
      { type: types.FETCH_DATA },
      {
        type: types.FETCH_DATA_FAILURE,
        error: true,
        payload: new RequestError('Not Found'),
        meta: undefined,
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchMovies(parameters)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_DATA_SUCCESS when fetching fetchMovies has been done', async () => {
    const parameters = [
      ['offset', ''],
      ['limit', '6'],
      ['searchBy', 'title'],
      ['search', ''],
      ['filter', ''],
      ['sortBy', ''],
      ['sortOrder', ''],
    ];

    fetchMock.mock(`${URL_API_MOVIES}?${new URLSearchParams(parameters).toString()}`, 200);

    const expectedActions = [
      { type: types.FETCH_DATA },
      {
        type: types.FETCH_DATA_SUCCESS,
        payload: undefined,
        meta: undefined,
      },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchMovies(parameters)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
