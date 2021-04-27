import React from 'react';
import { Provider } from 'react-redux';

import NavBar from '../NavBar';

import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import storeReal from '../../../../redux/redux-store';
import { SidebarState } from '../../../../redux/types/sidebar-reducer-types';
import { Genres, SortBy, SortOrder } from '../../../../helpers/enums';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

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
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

interface AppState {
  sidebar: SidebarState;
}
const initialState: AppState = {
  sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.ASC },
};
const buildStore = configureStore([thunk]);
let store = buildStore(initialState);

jest.mock('../../../../redux/actions/sidebar-actions', () => ({
  updateSortOrder: () => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
    const newInitialState: AppState = {
      sidebar: { genre: Genres.ALL, sortBy: SortBy.TITLE, sortOrder: SortOrder.DESC },
    };
    store = buildStore(newInitialState);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
  },
}));

describe('NavBar', () => {
  // let store;
  // let wrapper;

  beforeEach(() => {
    store = buildStore(initialState);
    // wrapper = shallow(<colorbuttons store="{store}" />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test('snapshot renders', () => {
  //   const tree = render(
  //     <Provider store={store}>
  //       <NavBar />
  //     </Provider>,
  //   );

  //   expect(tree.baseElement).toMatchSnapshot();
  //   expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');
  // });

  test('snapshot renders2', () => {
    // const store = storeReal;
    // store = buildStore(initialState);
    // const spy = jest.spyOn(store, 'dispatch');

    const tree = render(
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </BrowserRouter>,
    );
    // const wrapper = shallow(
    //   <Provider store={store}>
    //     <NavBar />
    //   </Provider>,
    // );

    fireEvent.click(screen.getByTitle('Change sort order'));
    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="nav-bar container-md">');
    // expect(spy).toHaveBeenCalled();
    console.log(store.getState());
  });
});
