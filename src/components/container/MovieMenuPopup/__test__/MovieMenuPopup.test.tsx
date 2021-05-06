import React from 'react';
import { Provider } from 'react-redux';
import storeReal from '../../../../redux/redux-store';

import MovieMenuPopup from '../MovieMenuPopup';

import { render, screen, fireEvent } from '@testing-library/react';
import {
  MoviesActionTypes,
  UPDATE_STATUS_MOVIE_POPUP,
} from '../../../../redux/types/movies-reducer-types';
import userEvent from '@testing-library/user-event';

jest.mock('../../../../redux/actions/movies-actions', () => ({
  updateShowPopup: (): MoviesActionTypes => {
    return {
      type: UPDATE_STATUS_MOVIE_POPUP,
      payload: false,
    };
  },
}));

describe('MovieMenuPopup', () => {
  const closePopup = jest.fn();
  const movie = {
    id: 12345,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
  };
  let store;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render', () => {
    store = storeReal;
    const tree = render(
      <Provider store={store}>
        <MovieMenuPopup movie={movie} closeMenu={closePopup} />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render click Edit', () => {
    store = storeReal;
    const tree = render(
      <Provider store={store}>
        <MovieMenuPopup movie={movie} closeMenu={closePopup} />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByText('Edit'));
    expect(tree.baseElement).toMatchSnapshot();
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    expect(closePopup).toBeCalled();
  });

  test('render click Delete', () => {
    store = storeReal;
    const tree = render(
      <Provider store={store}>
        <MovieMenuPopup movie={movie} closeMenu={closePopup} />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByText('Delete'));
    expect(tree.baseElement).toMatchSnapshot();
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    expect(closePopup).toBeCalled();
  });

  test('render button onClick', () => {
    store = storeReal;
    render(
      <Provider store={store}>
        <MovieMenuPopup movie={movie} closeMenu={closePopup} />
      </Provider>,
    );

    userEvent.click(screen.getByRole('button', { name: '' }));
    expect(closePopup).toBeCalled();
  });
});
