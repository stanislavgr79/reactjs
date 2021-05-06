import React from 'react';
import { render } from '@testing-library/react';

import NoMatch from '../NoMatch';
import ReactRouter from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../../../components/structure/Header', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="header"></div>;
    },
  };
});
jest.mock('../../../components/structure/Footer', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="footer"></div>;
    },
  };
});

describe('NoMatch', () => {
  test('snapshot renders location is empty', () => {
    const initialState = { searchStore: { location: '' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    const tree = render(
      <Provider store={store}>
        <NoMatch />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="nomatch-page">');
    expect(tree.getByText(`The page /movies doesn't exist.`)).toBeInTheDocument();
  });

  test('snapshot renders location is 123456', () => {
    const initialState = { searchStore: { location: '123456' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const mockLocation = {
      pathname: '/movies',
      search: '',
      state: null,
      hash: '',
    };

    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
    const tree = render(
      <Provider store={store}>
        <NoMatch />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="nomatch-page">');
    expect(tree.getByText(`The page 123456 doesn't exist.`)).toBeInTheDocument();
  });
});
