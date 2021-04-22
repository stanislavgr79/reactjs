import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import NavBar from '../NavBar';

import ReactRouter from 'react-router';

import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import storeReal from '../../../../redux/redux-store';
import { SidebarState } from '../../../../redux/types/sidebar-reducer-types';
import { Genres, SortBy, SortOrder } from '../../../../helpers/enums';
import { updateSortOrder } from '../../../../redux/actions/sidebar-actions';

jest.mock('../../../atom/SideBarListNav', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="sidebar-list-nav"></div>;
    },
  };
});
jest.mock('../../../atom/SidebarSelectNav', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="sidebar-select-nav"></div>;
    },
  };
});

describe('NavBar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  interface AppState {
    sidebar: SidebarState;
  }

  const initialState: AppState = {
    sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);

  test('snapshot renders', () => {
    // const store = storeReal;

    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');
  });

  jest.mock('../../../../redux/actions/sidebar-actions', () => ({
    updateSortOrder: () => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
      const newInitialState: AppState = {
        sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.DESC },
      };
      store = mockStore(newInitialState);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
    },
  }));

  test('snapshot renders2', () => {
    const store = storeReal;
    // store = mockStore(initialState);
    const spy = jest.spyOn(store, 'dispatch');

    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );

    fireEvent.click(screen.getByTitle('Change sort order'));

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');
    expect(spy).toHaveBeenCalled();
    console.log(store.getState());
  });

});
