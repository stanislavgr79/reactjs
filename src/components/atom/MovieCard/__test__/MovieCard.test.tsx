import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MovieCard from '../MovieCard';

describe('MovieCard', () => {
  const movie = {
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

  test('render', () => {
    const tree = render(
      <BrowserRouter>
        <MovieCard movie={movie} />,
      </BrowserRouter>,
    );

    expect(tree.baseElement).toMatchSnapshot();
  });
});
