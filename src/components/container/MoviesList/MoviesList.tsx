import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { fetchMovies } from '../../../redux/actions/movies-actions';

import './MoviesList.scoped.scss';

import RenderMoviesFounded from './RenderMoviesFounded';
import NewPage from '../../../pages/NewPage/NewPage';
import { Redirect } from 'react-router-dom';

export default function MoviesList(): JSX.Element {
  const dispatch = useDispatch();
  const { movies, dataStatus, newPage, sidebar, search } = useSelector((store: AppState) => {
    return {
      movies: store.moviesStore.movies,
      dataStatus: store.moviesStore.dataStatus,
      newPage: store.moviesStore.newPage,
      sidebar: store.sidebar,
      search: store.searchStore.search,
    };
  });
  const [isNewPage, setIsNewPage] = useState(newPage);

  useEffect(() => {
    if (isNewPage && search.value == '') {
      setIsNewPage(false);
      return;
    }
    const params = [
      ['offset', movies.offset.toString()],
      ['limit', '6'],
      ['searchBy', 'title'],
      ['search', search.value],
      ['filter', sidebar.genre],
      ['sortBy', sidebar.sortBy],
      ['sortOrder', sidebar.sortOrder],
    ];

    dispatch(fetchMovies(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.value, sidebar.sortBy, sidebar.sortOrder, movies.offset, sidebar.genre, dispatch]);

  let content;

  if (newPage && dataStatus === 'idle') {
    content = <NewPage />;
  } else if (dataStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (dataStatus === 'success') {
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
    content = <Redirect to="/404" />;
  }

  return <>{content}</>;
}
