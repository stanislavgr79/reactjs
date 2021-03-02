import React from 'react';
import NavBar from '../../container/Navbar';
import MoviesList from '../../container/MoviesList';
import ErrorBoundary from '../../../components/plugins/ErrorBoundary';
import withLoading from '../../../components/plugins/WithLoading';

import './ContentIntro.scoped.scss';

const MovieListWithLoading = withLoading(MoviesList);

function ContentIntro() {
  return (
    <div className="content content-intro">
      <NavBar />
      <ErrorBoundary>
        <MovieListWithLoading isLoading={false} />
      </ErrorBoundary>
    </div>
  );
}

export default ContentIntro;
