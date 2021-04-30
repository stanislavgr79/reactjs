import React from 'react';
import { render } from '@testing-library/react';

import ContentIntro from '../ContentIntro';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

jest.mock('../../../../components/container/NavBar', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="nav-bar container-md"></div>;
    },
  };
});
jest.mock('../../../../components/container/MoviesList', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="movies-list"></div>;
    },
  };
});

interface PropsErrorBoundary {
  children: React.ReactFragment;
}
jest.mock('../../../plugins/ErrorBoundary', () => ({ children }: PropsErrorBoundary) => children);

describe('ContentIntro', () => {
  test('snapshot renders: movies list', () => {
    const initialState = { moviesStore: { newPage: true, dataStatus: 'idle' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <ContentIntro />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="movies-list">');
  });

  test('snapshot renders: movies are loading', () => {
    const initialState = { moviesStore: { newPage: false, dataStatus: 'idle' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <ContentIntro />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="content content-intro">');
    expect(tree.getByText('Just a moment... Movies are loading...')).toBeInTheDocument();
  });

  test('snapshot renders: movies list', () => {
    const initialState = { moviesStore: { newPage: false, dataStatus: 'success' } };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const tree = render(
      <Provider store={store}>
        <ContentIntro />
      </Provider>,
    );

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="movies-list">');
  });
});
