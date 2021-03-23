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
  const store = useSelector((store: AppState) => {
    return {
      dataStatus: store.moviesStore.dataStatus,
    };
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      if (status == 'succeeded') {
        return;
      }
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(id);
  }, [store.dataStatus]);

  return (
    <div className="content content-intro">
      <NavBar />
      <ErrorBoundary>
        <MovieListWithLoading isLoading={isLoading} />
      </ErrorBoundary>
    </div>
  );
}
