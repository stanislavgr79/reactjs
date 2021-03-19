import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

import Header from '../../components/structure/Header';
import ContentIntro from '../../components/structure/ContentIntro';
import Footer from '../../components/structure/Footer';
import DetailMoviePopup from '../../components/container/DetailMovieTop';

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
      {store.selectedMovieId !== 0 ? <DetailMoviePopup /> : <Header />}
      <ContentIntro />
      <Footer />
    </div>
  );
}
