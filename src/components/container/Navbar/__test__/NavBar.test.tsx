import React from 'react';
import { Provider } from 'react-redux';
import storeReal from '../../../../redux/redux-store';

import NavBar from '../NavBar';

import { render, screen, fireEvent } from '@testing-library/react';
import { SearchActionTypes } from '../../../../redux/types/search-reducer-types';
import { MoviesActionTypes } from '../../../../redux/types/movies-reducer-types';
import { SidebarActionTypes } from '../../../../redux/types/sidebar-reducer-types';
import { Store } from 'redux';

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
    expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');
  });

  test('snapshot renders button class: arrow_up', () => {
    const tree = render(
      <Provider store={store}>
        <NavBar />
      </Provider>,
    );
    expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');

    expect(tree.baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByTitle('Change sort order'));
    expect(tree.baseElement).toMatchSnapshot();
  });
});
