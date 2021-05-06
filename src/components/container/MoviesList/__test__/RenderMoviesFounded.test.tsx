import React from 'react';
import { render, screen } from '@testing-library/react';

import RenderMoviesFounded from '../RenderMoviesFounded';
import userEvent from '@testing-library/user-event';

jest.mock('../../../atom/MovieCard', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="MovieCard"></div>;
    },
  };
});

jest.mock('../../MovieMenuPopup', () => {
  return {
    __esModule: true,
    default: () => {
      return <div className="MovieMenuPopup"></div>;
    },
  };
});

describe('RenderMoviesFounded', () => {
  const movie1 = {
    id: 12345,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: '',
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
    vote_average: 5.5,
    tagline: '0',
  };
  const movie2 = {
    id: 98765,
    title: 'film title',
    release_date: '2020-01-02',
    poster_path: '',
    genres: ['crime'],
    overview: 'overview',
    runtime: 66,
    vote_average: 5.5,
    tagline: '0',
  };
  const movies = [movie1];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render', () => {
    const tree = render(<RenderMoviesFounded movies={movies} />);

    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render MovieMenuPopup', () => {
    const tree = render(<RenderMoviesFounded movies={movies} />);

    userEvent.click(screen.getByRole('img'));
    expect(tree.baseElement).toMatchSnapshot();
  });

  test('render MovieMenuPopup2', () => {
    const movies = [movie1, movie2];
    const tree = render(<RenderMoviesFounded movies={movies} />);

    const images = screen.getAllByRole('img');
    userEvent.click(images[1]);
    expect(tree.baseElement).toMatchSnapshot();
    userEvent.click(screen.getByRole('img'));
    expect(tree.baseElement).toMatchSnapshot();
  });
});
