import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

import Header from '../../components/structure/Header';
import Footer from '../../components/structure/Footer';
import DetailMovieTop from '../../components/container/DetailMovieTop';

const ContentIntro = React.lazy(() => import('../../components/structure/ContentIntro'));

import './Intro.scoped.scss';

export default function Intro(): JSX.Element {
  const { showPopup, selectedMovieId } = useSelector((store: AppState) => {
    return store.moviesStore;
  });

  return (
    <div className={`intro_page ${!showPopup ? '' : 'show_movie_popup'}`}>
      {selectedMovieId !== 0 ? <DetailMovieTop /> : <Header />}
      <Suspense fallback="Loading ...">
        <ContentIntro />
      </Suspense>
      <Footer />
    </div>
  );
}
