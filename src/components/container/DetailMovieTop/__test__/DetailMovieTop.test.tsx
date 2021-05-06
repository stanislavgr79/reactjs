import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import ReactRouter from 'react-router';

import DetailMovieTop from '../DetailMovieTop';

import { render, screen, fireEvent } from '@testing-library/react';
import {
  MoviesActionTypes,
  UPDATE_SELECTED_MOVIE_ID,
} from '../../../../redux/types/movies-reducer-types';

jest.mock('../../../atom/SiteName', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="siteName"></div>;
    },
  };
});
jest.mock('../../../../redux/actions/movies-actions', () => ({
  updateSelectedMovieId: (): MoviesActionTypes => {
    return {
      type: UPDATE_SELECTED_MOVIE_ID,
      payload: 0,
    };
  },
}));

describe('DetailMovieTop', () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('resetActiveMovieId function with empty query in search value', () => {
    const initialState = {
      moviesStore: { movie: movie },
      searchStore: { search: { value: '' } },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };
    const history = createMemoryHistory();
    history.location = mockLocation;
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    const replaceHistorySpy = jest.spyOn(ReactRouter, 'useHistory').mockReturnValue(history);

    const tree = render(
      <Provider store={store}>
        <DetailMovieTop />
      </Provider>,
    );

    const expectedActions = [{ type: 'UPDATE_SELECTED_MOVIE_ID', payload: 0 }];

    expect(tree.baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button', { name: '' }));

    expect(store.getActions()).toEqual(expectedActions);
    expect(replaceHistorySpy).toHaveBeenCalled();
  });

  test('resetActiveMovieId function with query in search value', () => {
    const initialState = {
      moviesStore: { movie: movie },
      searchStore: { search: { value: 'qwerty' } },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const mockLocation = {
      pathname: '/movies',
      search: 'qwerty',
      state: null,
      hash: '',
    };
    const history = createMemoryHistory();
    history.location = mockLocation;
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    const replaceHistorySpy = jest.spyOn(ReactRouter, 'useHistory').mockReturnValue(history);

    const tree = render(
      <Provider store={store}>
        <DetailMovieTop />
      </Provider>,
    );

    const expectedActions = [{ type: 'UPDATE_SELECTED_MOVIE_ID', payload: 0 }];

    expect(tree.baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByRole('button', { name: '' }));

    expect(store.getActions()).toEqual(expectedActions);
    expect(replaceHistorySpy).toHaveBeenCalled();
  });
});
