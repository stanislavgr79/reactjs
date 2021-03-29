import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { fetchMovies } from '../../../redux/actions/movies-actions';

import './MoviesList.scoped.scss';

import RenderMoviesFounded from './RenderMoviesFounded';

export default function MoviesList(): JSX.Element {
  const dispatch = useDispatch();
  const { movies, dataStatus, sidebar, search } = useSelector((store: AppState) => {
    return {
      movies: store.moviesStore.movies,
      dataStatus: store.moviesStore.dataStatus,
      sidebar: store.sidebar,
      search: store.searchStore.search,
    };
  });

  useEffect(() => {
    let params: string[][];
    if (dataStatus === 'idle') {
      params = [
        ['offset', '0'],
        ['limit', '6'],
        ['filter', sidebar.genre],
        ['sortBy', sidebar.sortBy],
        ['sortOrder', sidebar.sortOrder],
      ];
    } else {
      params = [
        ['offset', movies.offset.toString()],
        ['limit', '6'],
        ['searchBy', 'title'],
        ['search', search.value],
        ['filter', sidebar.genre],
        ['sortBy', sidebar.sortBy],
        ['sortOrder', sidebar.sortOrder],
      ];
    }
    dispatch(fetchMovies(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    movies.totalAmount,
    search.value,
    sidebar.sortBy,
    sidebar.sortOrder,
    movies.offset,
    sidebar.genre,
    dispatch,
  ]);

  let content;

  if (dataStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (dataStatus === 'succeeded') {
    content = (
      <>
        <div className="container-md movies_finded">
          <label>
            <strong>{movies.totalAmount}</strong> movies found
          </label>
        </div>
        {movies.totalAmount > 0 ? (
          <RenderMoviesFounded movies={movies.data} />
        ) : (
          <div className="movies_not_finded">Movies not finded</div>
        )}
      </>
    );
  } else if (dataStatus === 'failed') {
    content = <div>Error</div>;
  }

  return <>{content}</>;
}
