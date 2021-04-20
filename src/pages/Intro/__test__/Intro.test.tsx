import React from 'react';
import { render } from '@testing-library/react';
import ReactRouter from 'react-router';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Intro from '../Intro';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// const mockLocation = '/movies';
// beforeEach(() => {
//   jest.spyOn(location, 'useLocation').mockReturnValue(mockLocation);
// });

describe('Intro', () => {
  const initialState = { moviesStore: { showPopup: false, dataStatus: 'success' } };
  const mockStore = configureStore();
  let store;

  // jest.mock('react-router', () => ({
  //   // ...jest.requireActual('react-router'),
  //   useParams: () => ({
  //     id: undefined,
  //   }),
  //   useRouteMatch: () => ({ url: '/movies' }),
  // }));

  test('snapshot renders', () => {
    store = mockStore(initialState);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: undefined });
    
    // const tree = render(
    //   <Provider store={store}>
    //     <Intro />
    //   </Provider>,
    // );

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Route path="/movies">
              <Intro />
            </Route>
          </Provider>
        </BrowserRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    // expect(tree).toContainHTML('<div class="header">');
  });




  test('snapshot renders2', () => {
    store = mockStore(initialState);
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '123' });
    // const tree = render(
    //   <Provider store={store}>
    //     <Intro />
    //   </Provider>,
    // );

    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Route path="/movies/123">
              <Intro />
            </Route>
          </Provider>
        </BrowserRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    // expect(tree).toContainHTML('<div class="header">');
  });
});
