import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import storeReal from '../../../../redux/redux-store';

import { render, screen, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SidebarSelectNav from '../SidebarSelectNav';
import { SortBy } from '../../../../helpers/enums';

describe('SidebarSelectNav', () => {
  const initialState = { sidebar: { selectedIndexListNav: 0 } };
  const mockStore = configureStore();
  let container: Element 
    | DocumentFragment 
    // eslint-disable-next-line prettier/prettier
    | RenderOptions<typeof import('@testing-library/dom/types/queries'), HTMLElement>
    | null;

  const updateCurrentSortByMock = jest.fn();
  
  afterEach(() => {
    container = null;
    jest.clearAllMocks();
  });

  test('render', async () => {
    const store = mockStore(initialState);

    container = render(
      <Provider store={store}>
          <SidebarSelectNav
            defaultValue={SortBy.TITLE}
            updateCurrentSortBy={updateCurrentSortByMock}
          />
      </Provider>,
    );
    
    expect(container.baseElement).toMatchSnapshot();
  });

  test('render SortBy.RATING select', async () => {
    const store = storeReal;

    container = render(
      <Provider store={store}>
          <SidebarSelectNav
            defaultValue={SortBy.TITLE}
            updateCurrentSortBy={updateCurrentSortByMock}
          />
      </Provider>,
    );

    expect(container.baseElement).toMatchSnapshot();
    userEvent.selectOptions(screen.getByRole('combobox', { name: '' }), ['runtime']);
    expect(container.baseElement).toMatchSnapshot();
    expect(container.baseElement)
      .toContainHTML('<select class="sidebar-select-nav selected-runtime">');
  });

  test('handleChange function', async () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
          <SidebarSelectNav
            defaultValue={SortBy.TITLE}
            updateCurrentSortBy={updateCurrentSortByMock}
          />
      </Provider>,
    );
    
    userEvent.selectOptions(screen.getByRole('combobox', { name: '' }), ['runtime']);
    expect(updateCurrentSortByMock).toBeCalled();
  });
});
