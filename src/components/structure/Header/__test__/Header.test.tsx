import React from 'react';
import renderer from 'react-test-renderer';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import Header from '../Header';

import ReactRouter from 'react-router';

import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import storeReal from '../../../../redux/redux-store';

describe('Header', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockLocation = {
    pathname: '/movies',
    search: '',
    state: null,
    hash: '',
  };
  const history = createMemoryHistory();
  history.location = mockLocation;

  jest.mock('../../../atom/SiteName', () => {
    return {
      __esModule: true,
      default: () => {
        return <p className="site_name"></p>;
      },
    };
  });
  jest.spyOn(ReactRouter, 'useLocation').mockReturnValue(mockLocation);
  const replaceHistorySpy = jest.spyOn(ReactRouter, 'useHistory').mockReturnValue(history);
  const mockStore = configureStore();
  let store;

  test('snapshot renders', () => {
    store = mockStore();

    const tree = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('search input value display test1', () => {
    store = mockStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'film' },
    });

    expect(screen.getByDisplayValue('film')).toBeInTheDocument();
  });

  test('search input value display test2', async () => {
    store = mockStore();

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(screen.queryByText(/film/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'film');

    expect(screen.getByDisplayValue('film')).toBeInTheDocument();
  });

  test('handleChange callback', async () => {
    store = mockStore();

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'film' },
    });

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('click search button', async () => {
    const store = storeReal;

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'film' },
    });
    fireEvent.click(screen.getByText('SEARCH'));

    expect(tree.baseElement).toMatchSnapshot();
    expect(replaceHistorySpy).toHaveBeenCalled();
    expect(store.getState().searchStore.search.value).toEqual('film');
  });

  test('click add button', async () => {
    store = mockStore();

    const tree = render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    fireEvent.click(screen.getByText('+ ADD MOVIE'));

    expect(tree.baseElement).toMatchSnapshot();
    expect(tree.baseElement).toContainHTML('<div class="container add_movie">');
  });
});
