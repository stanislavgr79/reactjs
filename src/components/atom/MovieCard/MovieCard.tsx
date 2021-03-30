import React, { useState } from 'react';
import { IMovie } from '../../../helpers/interface';

import noneImage from '@resources/images/nofoto.png';
import './MovieCard.scoped.scss';

interface IProps {
  movie: IMovie;
  changeSelectedMovieId: (e: number) => void;
}

export default function MovieCard({ movie, changeSelectedMovieId }: IProps): JSX.Element {
  const year = movie.release_date.split('-')[0];
  const KEY = 'value';
  const genreStr =
    typeof movie.genres[0] === 'object'
      ? movie.genres
          .map(function (item: any) {
            return item[KEY];
          })
          .join(', ')
      : movie.genres.join(', ');

  const [error, setError] = useState(false);

  const handleImageLoaded = () => {
    if (!error) setError(false);
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <>
      <div className="movie-card">
        <div className="movie-image">
          <a href="#">
            <img
              src={error || movie.poster_path == null ? noneImage : movie.poster_path}
              onLoad={handleImageLoaded}
              onError={handleImageError}
              className="img-fluid"
              alt={movie.title}
              onClick={() => changeSelectedMovieId(Number(movie.id))}
            />
          </a>
        </div>
        <div className="movie-props">
          <div className="movie-info">
            <div className="movie-title">{movie.title}</div>
            <div className="movie-releaseDate">{year}</div>
          </div>
          <div className="movie-genre">{genreStr}</div>
        </div>
      </div>
    </>
  );
}
