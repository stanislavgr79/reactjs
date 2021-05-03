import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import DeleteMoviePopup from '../DeleteMoviePopup';

import { render, screen, fireEvent } from '@testing-library/react';
import {
  DELETE_MOVIE_SUCCESS,
  MoviesActionTypes,
  UPDATE_STATUS_MOVIE_POPUP,
} from '../../../../redux/types/movies-reducer-types';

jest.mock('../../../atom/SiteName', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="siteName"></div>;
    },
  };
});
jest.mock('../../../structure/Footer', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="footer"></div>;
    },
  };
});
jest.mock('../../../../redux/actions/movies-actions', () => ({
  fetchDeleteMovie: (): MoviesActionTypes => {
    return {
      type: DELETE_MOVIE_SUCCESS,
    };
  },
  updateShowPopup: (): MoviesActionTypes => {
    return {
      type: UPDATE_STATUS_MOVIE_POPUP,
      payload: false,
    };
  },
}));

describe('DeleteMoviePopup', () => {
  const initialState = { moviesStore: { showPopup: true } };
  const mockStore = configureStore();
  const movieId = 123456;
  const closePopup = jest.fn();
  let store;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleClick function', () => {
    store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <DeleteMoviePopup movieId={movieId} closePopup={closePopup} />
      </Provider>,
    );

    const expectedActions = [{ type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false }];

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(closePopup).toBeCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('handleSubmit function', () => {
    store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <DeleteMoviePopup movieId={movieId} closePopup={closePopup} />
      </Provider>,
    );

    const expectedActions = [
      { type: 'DELETE_MOVIE_SUCCESS' },
      { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
    ];

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByRole('button', { name: 'CONFIRM' }));
    expect(closePopup).toBeCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
