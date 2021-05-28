import React, { useState } from 'react';
import { IMovie } from '../../../helpers/interface';

import noneImage from '../../../resources/images/nofoto.png';
import './MovieCard.scoped.scss';
import { Link } from 'react-router-dom';

interface IProps {
  movie: IMovie;
}

export default function MovieCard({ movie }: IProps): JSX.Element {
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
          <Link to={`/movies/${movie.id}`}>
            <img
              src={error || movie.poster_path == null ? noneImage : movie.poster_path}
              onLoad={handleImageLoaded}
              onError={handleImageError}
              className="img-fluid"
              alt={movie.title}
            />
          </Link>
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
