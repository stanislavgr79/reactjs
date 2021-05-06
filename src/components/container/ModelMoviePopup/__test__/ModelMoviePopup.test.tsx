import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ModelMoviePopup from '../ModelMoviePopup';

import { render, screen, fireEvent, act, RenderOptions, waitFor } from '@testing-library/react';
import {
    FETCH_ADD_MOVIE_SUCCESS,
  MoviesActionTypes,
  UPDATE_MOVIE_SUCCESS,
  UPDATE_STATUS_MOVIE_POPUP,
} from '../../../../redux/types/movies-reducer-types';
import { IMovie } from '../../../../helpers/interface';
import userEvent from '@testing-library/user-event';
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
  fetchUpdateMovie: (movie: IMovie): MoviesActionTypes => {
    return {
      type: UPDATE_MOVIE_SUCCESS,
      payload: movie,
    };
  },
  fetchAddMovie: (movie: IMovie): MoviesActionTypes => {
    return {
      type: FETCH_ADD_MOVIE_SUCCESS,
      payload: movie,
    };
  },
  updateShowPopup: (): MoviesActionTypes => {
    return {
      type: UPDATE_STATUS_MOVIE_POPUP,
      payload: false,
    };
  },
}));

describe('ModelMoviePopup', () => {
  const initialState = { moviesStore: { showPopup: true } };
  const mockStore = configureStore();
  const closePopup = jest.fn();
  let container: Element 
    | DocumentFragment 
    // eslint-disable-next-line prettier/prettier
    | RenderOptions<typeof import('@testing-library/dom/types/queries'), HTMLElement>
    | null;
  const movie = {
    id: 12345,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
  };
  
  afterEach(() => {
    container = null;
    jest.clearAllMocks();
  });

  test('render edit model', async () => {
    container = render(<div></div>);
    const store = mockStore(initialState);

    container = render(<Provider store={store}>
        <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
    </Provider>,);
    
    expect(container.baseElement).toMatchSnapshot();
    expect(screen.getByRole('button', { name: /SAVE/i })).toBeInTheDocument();
  });

  test('render add model', async () => {
    container = render(<div></div>);
    const store = mockStore(initialState);

    container = render(
        <Provider store={store}>
            <ModelMoviePopup closePopup={closePopup} role="add" />
        </Provider>,);
    
    expect(container.baseElement).toMatchSnapshot();
    expect(screen.getByRole('button', { name: /SUBMIT/i })).toBeInTheDocument();
  });

  test('closeEditPopup function', () => {
    const store = mockStore(initialState);
    render(
        <Provider store={store}>
            <ModelMoviePopup closePopup={closePopup} role="add" />
        </Provider>,);

    const expectedActions = [{ type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false }];

    fireEvent.click(screen.getByRole('button', { name: '' }));
    expect(closePopup).toBeCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('handleSubmitEdit function Out description', async () => {
    const promise = Promise.resolve();
    container = render(<div></div>);
    const store = mockStore(initialState);
    const movieExpected = {
      id: 12345,
      title: 'film title',
      release_date: '2020-01-02',
      poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
      genres: ['crime'],
      overview: 'overview',
      runtime: 66,
      tagline: 'Out description',
    };

    act(() => {
        container = render(<Provider store={store}>
            <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
        </Provider>,);
    });

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
    });

    const expectedActions = [
      { type: 'UPDATE_MOVIE_SUCCESS', payload: movieExpected },
      { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
    ];
    
    await act(() => promise);

    await waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(closePopup).toBeCalled();
    });
  });

  test('handleSubmitEdit function Test description', async () => {
    const promise = Promise.resolve();
    container = render(<div></div>);
    const store = mockStore(initialState);
    const movie = {
      id: 12345,
      title: 'film title',
      release_date: '2020-01-02',
      poster_path: 'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
      genres: ['crime'],
      overview: 'overview',
      runtime: 66,
      tagline: 'Test description',
    };

    act(() => {
        container = render(<Provider store={store}>
            <ModelMoviePopup movie={movie} closePopup={closePopup} role="edit" />
        </Provider>,);
    });

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'SAVE' }));
    });

    const expectedActions = [
      { type: 'UPDATE_MOVIE_SUCCESS', payload: movie },
      { type: 'UPDATE_STATUS_MOVIE_POPUP', payload: false },
    ];
    
    await act(() => promise);

    await waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(closePopup).toBeCalled();
    });
  });

  test('handleSubmitAdd function Out description', async () => {
    const promise = Promise.resolve();
    container = render(<div></div>);
    const store = mockStore(initialState);
    const movieSubmit = {
        title: 'film title',
        release_date: "2021-04-30",
        poster_path: 'https://image.tmdb.org/3kcEGBH.jpg',
        genres: ['Action'],
        overview: 'overview',
        runtime: 77,
        budget: 0,
        revenue: 0,
        tagline: 'Out description',
        vote_average: 0,
        vote_count: 0,
      };

    act(() => {
        container = render(<Provider store={store}>
            <ModelMoviePopup closePopup={closePopup} role="add" />
        </Provider>,);
    });

    userEvent.type(screen.getByRole('textbox', { name: 'TITLE' }), "film title");
    userEvent.type(screen.getByRole('textbox', { name: 'OVERVIEW' }), "overview");
    userEvent.type(screen.getByRole('spinbutton', { name: 'RUNTIME' }), '77');
    userEvent.type(screen.getByRole('textbox', { name: 'POSTER URL' }),
            "https://image.tmdb.org/3kcEGBH.jpg");
    userEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByRole('button', { name: 'Choose Friday, April 30th, 2021' }));
    userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    userEvent.click(screen.getByText('Action'));

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'SUBMIT' }));
    });
    
    const expectedActions = [
      { type: 'FETCH_ADD_MOVIE_SUCCESS', payload: movieSubmit },
    ];   
    await act(() => promise);
    expect(container.baseElement).toMatchSnapshot();
    await waitFor(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(closePopup).toBeCalled();
    });
  });

  test('reset button function', async () => {
    const promise = Promise.resolve();
    container = render(<div></div>);
    const store = mockStore(initialState);

    act(() => {
        container = render(<Provider store={store}>
            <ModelMoviePopup closePopup={closePopup} role="add" />
        </Provider>,);
    });

    userEvent.type(screen.getByRole('textbox', { name: 'TITLE' }), "film title");
    userEvent.type(screen.getByRole('textbox', { name: 'OVERVIEW' }), "overview");
    userEvent.type(screen.getByRole('spinbutton', { name: 'RUNTIME' }), '77');
    userEvent.type(screen.getByRole('textbox', { name: 'POSTER URL' }),
            "https://image.tmdb.org/3kcEGBH.jpg");
    userEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByRole('button', { name: 'Choose Friday, April 30th, 2021' }));
    userEvent.click(screen.getByRole('textbox', { name: 'GENRE Select Genre' }));
    userEvent.click(screen.getByText('Action'));

    act(() => {
        fireEvent.click(screen.getByRole('button', { name: 'RESET' }));
    });
    
    await act(() => promise);
    expect(container.baseElement).toMatchSnapshot();
  });
});
