import React from 'react';
import { Provider } from 'react-redux';
import storeReal from '../../../../redux/redux-store';
import configureStore from 'redux-mock-store';

import NavBar from '../NavBar';

import { render, screen, fireEvent } from '@testing-library/react';
import { SearchActionTypes } from '../../../../redux/types/search-reducer-types';
import { MoviesActionTypes } from '../../../../redux/types/movies-reducer-types';
import {
  SidebarActionTypes,
  UPDATE_SELECT_GENRE,
  UPDATE_SORT_BY,
  UPDATE_SORT_ORDER,
} from '../../../../redux/types/sidebar-reducer-types';
import { Store } from 'redux';
import { Genres, SortBy, SortOrder } from '../../../../helpers/enums';

// jest.mock('../../../atom/SideBarListNav', () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return <div className="sidebar-list-nav"></div>;
//     },
//   };
// });
// const handleChangeGenre = () => {
//   return jest.fn();
// };
// jest.mock('../../../atom/SidebarSelectNav', () => {
//   return {
//     __esModule: true,
//     default: () => {
//       return handleChangeGenre;
//     },
//   };
// });
jest.mock('../../../../redux/actions/sidebar-actions', () => ({
  updateCurrentGenre: (): SidebarActionTypes => {
    return {
      type: UPDATE_SELECT_GENRE,
      payload: Genres.CRIME,
    };
  },
  updateCurrentSortBy: (): SidebarActionTypes => {
    return {
      type: UPDATE_SORT_BY,
      payload: SortBy.RATING,
    };
  },
  // updateSortOrder: (): SidebarActionTypes => {
  //   return {
  //     type: UPDATE_SORT_ORDER,
  //     payload: SortOrder.ASC,
  //   };
  // },
  updateSortOrder: (sortOrder: SortOrder): SidebarActionTypes => {
    return {
      type: UPDATE_SORT_ORDER,
      payload: sortOrder,
    };
  },
}));

describe('NavBar', () => {
  let store: Store<unknown, SearchActionTypes | MoviesActionTypes | SidebarActionTypes>;

  beforeEach(() => {
    store = storeReal;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('snapshot renders', () => {
    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('snapshot UPDATE_SORT_ORDER ASC', () => {
    const initialState = {
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );
    const expectedActions = [
      { type: 'UPDATE_SELECT_GENRE', payload: 'crime' },
      { type: 'UPDATE_SORT_BY', payload: 'vote_average' },
      { type: 'UPDATE_SORT_ORDER', payload: 'asc' },
    ];
    expect(tree.baseElement).toMatchSnapshot();
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('snapshot UPDATE_SORT_ORDER DESC', () => {
    const initialState = {
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.DESC },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    const expectedActions = [
      { type: 'UPDATE_SELECT_GENRE', payload: 'crime' },
      { type: 'UPDATE_SORT_BY', payload: 'vote_average' },
      { type: 'UPDATE_SORT_ORDER', payload: 'desc' },
    ];
    expect(tree.baseElement).toMatchSnapshot();
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('snapshot renders button class: arrow_up', () => {
    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTitle('Change sort order'));
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('snapshot renders button class: arrow_down', () => {
    const initialState = {
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.DESC },
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTitle('Change sort order'));
    expect(tree.baseElement).toMatchSnapshot();
  });
});
