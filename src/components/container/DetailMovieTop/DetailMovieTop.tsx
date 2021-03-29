import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { updateSelectedMovieId } from '../../../redux/actions/movies-actions';

import Button from '../../atom/Button';
import Sitename from '../../atom/SiteName';

import noneImage from '@resources/images/nofoto.png';
import './DetailMovieTop.scoped.less';

export default function DetailMovieTop(): JSX.Element {
  const dispatch = useDispatch();
  const { movie } = useSelector((store: AppState) => {
    return store.moviesStore;
  });
  const year = movie?.release_date.split('-')[0];
  const [error, setError] = useState(false);

  const resetActiveMovieId = useCallback(() => {
    dispatch(updateSelectedMovieId(0));
  }, [dispatch]);

  const handleImageLoaded = () => {
    if (!error) setError(false);
  };

  const handleImageError = () => {
    setError(true);
  };

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
              src={error || movie?.poster_path == null ? noneImage : movie.poster_path}
              onLoad={handleImageLoaded}
              onError={handleImageError}
              className="img-fluid"
              alt={movie?.title}
              onClick={(e) => e.preventDefault()}
            />
          </div>
          <div className="section-detail">
            <div className="title_reiting">
              <div className="movie-title">{movie?.title}</div>
              <div className="vote_average">{movie?.vote_average}</div>
            </div>
            <div className="tagline">{movie?.tagline}</div>
            <div className="release_runtime">
              <div className="release">{year}</div>
              <div className="runtime">{movie?.runtime} min</div>
            </div>
            <div className="movie_overview">{movie?.overview}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
