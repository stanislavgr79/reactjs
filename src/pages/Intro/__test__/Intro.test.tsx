import React from 'react';
import renderer from 'react-test-renderer';

import Intro from '../Intro';
import ReactRouter, { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from '../../NoMatch';

jest.mock('../../../components/structure/Footer', () => 'Footer');
jest.mock('../../../components/structure/Header', () => 'Header');
jest.mock('../../../components/container/DetailMovieTop', () => 'DetailMovieTop');
jest.mock('../../../components/container/NavBar', () => 'NavBar');
jest.mock('../../../components/container/MoviesList', () => 'MoviesList');
jest.mock('../../../pages/NoMatch', () => 'NoMatch');
jest.mock('../../../redux/actions/movies-actions', () => ({
  fetchGetMovieById: () => ({
    type: 'fetchGetMovieByIdMock',
  }),
}));

describe('Intro', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('snapshot renders expected Header', () => {
    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: undefined });
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    jest.mock('react-router', () => ({
      useRouteMatch: () => ({ url: '/movies' }),
    }));

    const initialState = { moviesStore: { showPopup: false, dataStatus: 'success' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = renderer.create(
      <Provider store={store}>
        <Intro />
      </Provider>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('snapshot renders expected DetailMovieTop', () => {
    const mockLocation = {
      pathname: '/movies/123456',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '123456' });
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    jest.mock('react-router', () => ({
      useRouteMatch: () => ({ url: '/movies/123456' }),
    }));

    const initialState = { moviesStore: { showPopup: true, dataStatus: 'success' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = renderer.create(
      <BrowserRouter>
        <Switch>
          <Route exact key="Intro" path="/movies" render={() => <Intro />} />
        </Switch>
        <Provider store={store}>
          <Intro />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('snapshot renders expected redirect to 404 page', () => {
    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: undefined });
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    jest.mock('react-router', () => ({
      useRouteMatch: () => ({ url: '/movies' }),
    }));

    const initialState = { moviesStore: { showPopup: false, dataStatus: 'failed' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = renderer.create(
      <BrowserRouter>
        <Switch>
          <Route exact key="Intro" path="/movies" render={() => <Intro />} />
          <Route exact key="404" path="/404" render={() => <NoMatch />} />
        </Switch>
        <Provider store={store}>
          <Intro />
        </Provider>
      </BrowserRouter>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
