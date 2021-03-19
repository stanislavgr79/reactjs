import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';

import NavBar from '../../container/Navbar';
import MoviesList from '../../container/MoviesList';
import ErrorBoundary from '../../../components/plugins/ErrorBoundary';
import withLoading from '../../../components/plugins/WithLoading';

import './ContentIntro.scoped.scss';

const MovieListWithLoading = withLoading(MoviesList);

export default function ContentIntro(): JSX.Element {
  const store = useSelector((store: AppState) => {
    return {
      moviesIsLoading: store.moviesStore.moviesIsLoading,
    };
  });
  const [isLoading, setIsloading] = useState(store.moviesIsLoading);

  useEffect(() => {
    const id = setTimeout(() => {
      if (isLoading) {
        return;
      }
      setIsloading(false);
    }, 1500);
    return () => clearTimeout(id);
  }, [isLoading]);

  return (
    <div className="content content-intro">
      <NavBar />
      <ErrorBoundary>
        <MovieListWithLoading isLoading={!isLoading} />
      </ErrorBoundary>
    </div>
  );
}
