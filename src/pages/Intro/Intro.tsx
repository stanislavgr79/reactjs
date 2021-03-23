import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

import Header from '../../components/structure/Header';
import Footer from '../../components/structure/Footer';
import DetailMovieTop from '../../components/container/DetailMovieTop';

const ContentIntro = React.lazy(() => import('../../components/structure/ContentIntro'));

import './Intro.scoped.scss';

export default function Intro(): JSX.Element {
  const store = useSelector((store: AppState) => {
    return {
      showPopup: store.moviesStore.showPopup,
      selectedMovieId: store.moviesStore.selectedMovieId,
    };
  });

  return (
    <div className={`intro_page ${!store.showPopup ? '' : 'show_movie_popup'}`}>
      {store.selectedMovieId !== 0 ? <DetailMovieTop /> : <Header />}
      <Suspense fallback="Loading ...">
        <ContentIntro />
      </Suspense>
      <Footer />
    </div>
  );
}
