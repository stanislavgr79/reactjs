import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import storeReal from '../../../../redux/redux-store';
// eslint-disable-next-line max-len
import { SidebarActionTypes, UPDATE_SELECTED_INDEX_LIST_NAV } from '../../../../redux/types/sidebar-reducer-types';

import { render, screen, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SidebarListNav from '../SidebarListNav';
import { Genres } from '../../../../helpers/enums';

describe('SidebarListNav', () => {
  const initialState = { sidebar: { selectedIndexListNav: 0 } };
  const mockStore = configureStore();
  let container: Element 
    | DocumentFragment 
    // eslint-disable-next-line prettier/prettier
    | RenderOptions<typeof import('@testing-library/dom/types/queries'), HTMLElement>
    | null;

  const updateCurrentGenreMock = jest.fn();
  
  afterEach(() => {
    container = null;
    jest.clearAllMocks();
  });

  test('render', async () => {
    const store = mockStore(initialState);

    container = render(
      <Provider store={store}>
          <SidebarListNav defaultValue={Genres.ALL} updateCurrentGenre={updateCurrentGenreMock} />
      </Provider>,
    );
    
    expect(container.baseElement).toMatchSnapshot();
  });

  test('render Genres.CRIME select', async () => {
    const store = storeReal;
    
    container = render(
      <Provider store={store}>
          <SidebarListNav defaultValue={Genres.ALL} updateCurrentGenre={updateCurrentGenreMock} />
      </Provider>,
    );

    userEvent.click(screen.getByText('CRIME'));
    expect(container.baseElement).toMatchSnapshot();
    expect(container.baseElement)
      .toContainHTML('<option class="selected" id="crime-4" value="crime">CRIME</option>');
  });

  test('handleChange function', async () => {
    const store = mockStore(initialState);

    jest.mock('../../../../redux/actions/sidebar-actions', () => ({
      updateSelectedIndexListNav: (selectedIndexListNav: number): SidebarActionTypes => {
        return {
          type: UPDATE_SELECTED_INDEX_LIST_NAV,
          payload: selectedIndexListNav,
        };
      },
    }));

    render(
      <Provider store={store}>
          <SidebarListNav defaultValue={Genres.ALL} updateCurrentGenre={updateCurrentGenreMock} />
      </Provider>,
    );
    
    userEvent.click(screen.getByText('CRIME'));
    const expectedActions = [{ type: 'UPDATE_SELECTED_INDEX_LIST_NAV', payload: 4 }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
