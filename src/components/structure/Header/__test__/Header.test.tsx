import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import Header from '../Header';

import ReactRouter, { MemoryRouter } from 'react-router';
import ReactRouterDom from 'react-router-dom';

import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SearchActionTypes,
  UPDATE_SEARCH_QUERY,
} from '../../../../redux/types/search-reducer-types';
import {
  SidebarActionTypes,
  UPDATE_SELECTED_INDEX_LIST_NAV,
  UPDATE_SELECT_GENRE,
} from '../../../../redux/types/sidebar-reducer-types';
import { Genres } from '../../../../helpers/enums';

jest.mock('../../../atom/SiteName', () => {
  return {
    __esModule: true,
    default: () => {
      return <p className="site_name"></p>;
    },
  };
});
jest.mock('../../../container/ModelMoviePopup', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="model_movie_popup" />;
    },
  };
});
jest.mock('../../../../redux/actions/search-actions', () => ({
  updateSearchValue: (value: string): SearchActionTypes => {
    return {
      type: UPDATE_SEARCH_QUERY,
      search: {
        value,
      },
    };
  },
}));
jest.mock('../../../../redux/actions/sidebar-actions', () => ({
  updateCurrentGenre: (genre: Genres): SidebarActionTypes => {
    return {
      type: UPDATE_SELECT_GENRE,
      payload: genre,
    };
  },
  updateSelectedIndexListNav: (selectedIndexListNav: number): SidebarActionTypes => {
    return {
      type: UPDATE_SELECTED_INDEX_LIST_NAV,
      payload: selectedIndexListNav,
    };
  },
}));

const mockLocation = {
  pathname: '/movies',
  search: '',
  state: null,
  hash: '',
};
const history = createMemoryHistory();
history.location = mockLocation;

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const initialState = {
    searchStore: { search: { value: '' } },
    sidebar: { genre: Genres.ALL, selectedIndexListNav: 0 },
    moviesStore: { showPopup: false, dataStatus: 'success' },
  };

  jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
  jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue(mockLocation);
  const replaceHistorySpy = jest.spyOn(ReactRouter, 'useHistory').mockReturnValue(history);
  const mockStore = configureStore();
  let store;

  test('snapshot renders', () => {
    store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('search input value display', async () => {
    store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(screen.queryByText(/film/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox', { name: '' }), 'film');

    expect(tree.baseElement).toMatchSnapshot();
    expect(screen.getByDisplayValue('film')).toBeInTheDocument();
  });

  test('handleChange callback', async () => {
    store = mockStore(initialState);

    const container = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'film' },
    });

    const expectedActions = [
      { type: 'UPDATE_SEARCH_QUERY', search: { value: '' } },
      { type: 'UPDATE_SEARCH_QUERY', search: { value: 'film' } },
    ];

    expect(store.getActions()).toEqual(expectedActions);

    expect(container.baseElement).toMatchSnapshot();
  });

  test('click search button', async () => {
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'film' },
    });
    fireEvent.click(screen.getByText('SEARCH'));

    const expectedActions = [
      { type: 'UPDATE_SEARCH_QUERY', search: { value: '' } },
      { type: 'UPDATE_SEARCH_QUERY', search: { value: 'film' } },
      { type: 'UPDATE_SEARCH_QUERY', search: { value: 'film' } },
      { type: 'UPDATE_SELECT_GENRE', payload: '' },
      { type: 'UPDATE_SELECTED_INDEX_LIST_NAV', payload: 0 },
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(tree.baseElement).toMatchSnapshot();
    expect(replaceHistorySpy).toHaveBeenCalled();
    expect(history.location.search).toEqual('?search=film');
  });

  test('click search button without query in history', async () => {
    const mockLocation = {
      pathname: '/movies',
      search: 'qwerty',
      state: null,
      hash: '',
    };
    const store = mockStore(initialState);
    const history = createMemoryHistory();
    history.location = mockLocation;
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue(mockLocation);
    jest.spyOn(ReactRouterDom, 'useHistory').mockReturnValue(history);
    const rrd = require('react-router-dom');
    rrd.BrowserRouter = ({ children }: any) => <div>{children}</div>;

    render(
      <MemoryRouter initialEntries={['/movies?search=qwerty']}>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('SEARCH'));

    expect(history.location.search).toEqual('');
  });

  test('click add button', async () => {
    store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    userEvent.click(screen.getByText('+ ADD MOVIE'));
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('snapshot renders with search', () => {
    const mockLocation = {
      pathname: '/movies',
      search: 'qwerty',
      state: null,
      hash: '',
    };
    const store = mockStore(initialState);
    const history = createMemoryHistory();
    history.location = mockLocation;
    jest.spyOn(ReactRouterDom, 'useLocation').mockReturnValue(mockLocation);
    const rrd = require('react-router-dom');
    rrd.BrowserRouter = ({ children }: any) => <div>{children}</div>;

    const container = render(
      <MemoryRouter initialEntries={['/movies?search=qwerty']}>
        <Provider store={store}>
          <Header />
        </Provider>
      </MemoryRouter>,
    );

    const expectedActions = [{ type: 'UPDATE_SEARCH_QUERY', search: { value: 'qwerty' } }];

    expect(store.getActions()).toEqual(expectedActions);

    expect(container.baseElement).toMatchSnapshot();
  });
});
