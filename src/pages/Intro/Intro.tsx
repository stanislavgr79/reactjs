import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

import Header from '../../components/structure/Header';
import Footer from '../../components/structure/Footer';
import DetailMovieTop from '../../components/container/DetailMovieTop';

const ContentIntro = React.lazy(() => import('../../components/structure/ContentIntro'));

import './Intro.scoped.scss';
import { Redirect, useLocation, useParams } from 'react-router';
import { fetchGetMovieById } from '../../redux/actions/movies-actions';
import { updateLocation } from '../../redux/actions/search-actions';

export default function Intro(): JSX.Element {
  const dispatch = useDispatch();
  const { showPopup, dataStatus } = useSelector((store: AppState) => {
    return store.moviesStore;
  });
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(updateLocation(location.pathname));
      dispatch(fetchGetMovieById(parseInt(id)));
    }
  }, [dispatch, id]);

  let content;

  if (dataStatus == 'failed') {
    content = <Redirect to="/404" />;
  } else {
    content = (
      <div className={`intro_page ${!showPopup ? '' : 'show_movie_popup'}`}>
        {showPopup ? <DetailMovieTop /> : <Header />}
        <Suspense fallback="Loading ...">
          <ContentIntro />
        </Suspense>
        <Footer />
      </div>
    );
  }

  return <>{content}</>;
}
