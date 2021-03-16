import React from 'react';
import Header from '../../components/structure/Header';
import ContentIntro from '../../components/structure/ContentIntro';
import Footer from '../../components/structure/Footer';
import { useSelector } from 'react-redux';

import './Intro.scoped.scss';

const Intro = (): JSX.Element => {
  const showPopupStore = useSelector(
    (store: { moviesStore: { showPopup: boolean } }) => store.moviesStore.showPopup,
  );

  return (
    <div className={!showPopupStore ? 'intro_page' : 'intro_page show_movie_popup'}>
      <Header />
      <ContentIntro />
      <Footer />
    </div>
  );
};

export default Intro;
