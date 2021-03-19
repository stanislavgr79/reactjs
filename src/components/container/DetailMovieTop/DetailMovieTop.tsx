import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { updateSelectedMovieId } from '@redux/actions/movies-actions';

import Button from '@components/atom/Button';
import Sitename from '@components/atom/SiteName/SiteName';

import './DetailMovieTop.scoped.less';

export default function DetailMoviePopup(): JSX.Element {
  const dispatch = useDispatch();

  const store = useSelector((store: AppState) => {
    return {
      movie: store.moviesStore.movie,
    };
  });

  const resetActiveMovieId = useCallback(() => {
    dispatch(updateSelectedMovieId(0));
  }, [dispatch]);

  const year = store.movie?.release_date.split('-')[0];

  return (
    <section className="movie_detail">
      <div className="model_content container-md">
        <Sitename />
        <div className="section_icon-close">
          <Button
            buttonType="button"
            className="btn_close icon_small"
            onClick={resetActiveMovieId}
          />
        </div>
        <div className="detail_movie-card">
          <div className="section_image">
            <img
              src={store.movie?.poster_path}
              className="img-fluid"
              alt={store.movie?.title}
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <div className="section-detail">
            <div className="title_reiting">
              <div className="movie-title">{store.movie?.title}</div>
              <div className="vote_average">{store.movie?.vote_average}</div>
            </div>
            <div className="tagline">{store.movie?.tagline}</div>
            <div className="release_runtime">
              <div className="release">{year}</div>
              <div className="runtime">{store.movie?.runtime} min</div>
            </div>
            <div className="movie_overview">{store.movie?.overview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
