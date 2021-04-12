import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';

import NavBar from '../../container/Navbar';
import MoviesList from '../../container/MoviesList';
import ErrorBoundary from '../../plugins/ErrorBoundary';
import withLoading from '../../plugins/WithLoading';

import './ContentIntro.scoped.scss';

const MovieListWithLoading = withLoading(MoviesList);

export default function ContentIntro(): JSX.Element {
  const { dataStatus, newPage } = useSelector((store: AppState) => {
    return store.moviesStore;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dataStatus == 'success') {
      setIsLoading(false);
      return;
    }
  }, [dataStatus]);

  return (
    <div className="content content-intro">
      <NavBar />
      <ErrorBoundary>
        <MovieListWithLoading isLoading={newPage ? false : isLoading} />
      </ErrorBoundary>
    </div>
  );
}
