import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { render } from '@testing-library/react';

import MoviesList from '../MoviesList';
import { Genres, SortBy, SortOrder } from '../../../../helpers/enums';

import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import NoMatch from '../../../../pages/NoMatch';
const middlewares = [thunk, apiMiddleware];
const URL_API_MOVIES = 'HTTP://localhost:4000/movies';

jest.mock('../../../../pages/NewPage', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="NewPage"></div>;
    },
  };
});
jest.mock('../RenderMoviesFounded', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="RenderMoviesFounded"></div>;
    },
  };
});
jest.mock('../../../../pages/NoMatch', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="NoMatch"></div>;
    },
  };
});
const parameters = [
  ['offset', '0'],
  ['limit', '6'],
  ['searchBy', 'title'],
  ['search', ''],
  ['filter', ''],
  ['sortBy', 'title'],
  ['sortOrder', 'asc'],
];
fetchMock.mock(`${URL_API_MOVIES}?${new URLSearchParams(parameters).toString()}`, 200);

describe('MoviesList', () => {
  const movie = {
    id: 12345,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: null,
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
    vote_average: 5.5,
    tagline: 0,
  };
  const mockStore = configureStore(middlewares);

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render newPage', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 1,
          data: [movie],
          offset: 0,
          limit: 6,
        },
        newPage: true,
        dataStatus: 'idle',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render redirect to 404 ', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 1,
          data: [movie],
          offset: 0,
          limit: 6,
        },
        newPage: true,
        dataStatus: 'failed',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Switch>
          <Route exact key="404" path="/404" render={() => <NoMatch />} />
        </Switch>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render data Loading', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 1,
          data: [movie],
          offset: 0,
          limit: 6,
        },
        newPage: true,
        dataStatus: 'loading',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render movies not founded', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 0,
          data: [],
          offset: 0,
          limit: 6,
        },
        newPage: false,
        dataStatus: 'success',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render movies not founded', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 0,
          data: [],
          offset: 0,
          limit: 6,
        },
        newPage: false,
        dataStatus: 'success',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render movies founded', () => {
    const initialState = {
      moviesStore: {
        movies: {
          totalAmount: 1,
          data: [movie],
          offset: 0,
          limit: 6,
        },
        newPage: false,
        dataStatus: 'success',
      },
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
      searchStore: { search: { value: '' } },
    };

    const store = mockStore(initialState);

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <MoviesList />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });
});
