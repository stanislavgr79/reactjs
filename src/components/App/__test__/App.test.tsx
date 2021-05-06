import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';

jest.mock('../../../pages/Intro', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="intro"></div>;
    },
  };
});
jest.mock('../../../pages/NoMatch', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="noMatch"></div>;
    },
  };
});

describe('App', () => {
  const rrd = require('react-router-dom');
  rrd.BrowserRouter = ({ children }: any) => <div>{children}</div>;

  test('render intro page with `/`', () => {
    const tree = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render intro page with `/movies`', () => {
    const tree = render(
      <MemoryRouter initialEntries={['/movies']}>
        <App />
      </MemoryRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render intro page with `/movies/12345`', () => {
    const tree = render(
      <MemoryRouter initialEntries={['/movies/12345']}>
        <App />
      </MemoryRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render noMatch 404 page with `/404`', () => {
    const tree = render(
      <MemoryRouter initialEntries={['/404']}>
        <App />
      </MemoryRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render noMatch 404 page with bad url', () => {
    const tree = render(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });
});
