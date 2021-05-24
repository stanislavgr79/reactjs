import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/redux-store';

import Header from '../../components/structure/Header';
import Footer from '../../components/structure/Footer';
import DetailMovieTop from '../../components/container/DetailMovieTop';

import { Redirect, useLocation, useParams } from 'react-router';
import { fetchGetMovieById } from '../../redux/actions/movies-actions';
import { updateLocation } from '../../redux/actions/search-actions';

const ContentIntro = React.lazy(() => import('../../components/structure/ContentIntro'));

import './Intro.scoped.scss';

interface Props {
  id: string | undefined;
}

export default function Intro(): JSX.Element {
  const dispatch = useDispatch();
  const { showPopup, dataStatus } = useSelector((store: AppState) => {
    return store.moviesStore;
  });
  const { id }: Props = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(updateLocation(location.pathname));
      dispatch(fetchGetMovieById(parseInt(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  let content;

  if (dataStatus == 'failed') {
    content = <Redirect to="/404" />;
  } else {
    content = (
      <div className={`intro_page ${!showPopup ? '' : 'show_movie_popup'}`}>
        {id && showPopup ? <DetailMovieTop /> : <Header />}
        <ContentIntro />
        <Footer />
      </div>
    );
  }

  return <>{content}</>;
}
