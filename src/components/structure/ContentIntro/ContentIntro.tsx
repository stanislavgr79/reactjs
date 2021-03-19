import React, { useEffect, useState } from 'react';
import NavBar from '../../container/Navbar';
import MoviesList from '../../container/MoviesList';
import ErrorBoundary from '../../../components/plugins/ErrorBoundary';
import withLoading from '../../../components/plugins/WithLoading';
import { useSelector } from 'react-redux';

import './ContentIntro.scoped.scss';

const MovieListWithLoading = withLoading(MoviesList);

const ContentIntro = () => {
  const [isLoading, setIsloading] = useState(
    useSelector(
      (store: { moviesStore: { moviesIsLoading: boolean } }) => store.moviesStore.moviesIsLoading,
    ),
  );

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
};

export default ContentIntro;
