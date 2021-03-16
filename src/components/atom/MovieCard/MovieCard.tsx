import React from 'react';
import './MovieCard.scoped.scss';

interface MovieCardProps {
  title: string;
  releaseDate: string;
  movieUrl: string;
  genres: string[];
  posterPath: string;
}

const MovieCard = ({
  title = 'missing_title',
  releaseDate = 'missing_releaseDate',
  movieUrl = '#',
  genres = ['missing_genre'],
  posterPath = 'missing_image',
}: MovieCardProps): JSX.Element => {
  const year = releaseDate.split('-')[0];
  const genreStr =
    typeof genres[0] === 'object'
      ? genres
          .map(function (item) {
            return item['value'];
          })
          .join(', ')
      : genres.join(', ');

  return (
    <>
      <div className="movie-card">
        <div className="movie-image">
          <a href={movieUrl}>
            <img src={posterPath} className="img-fluid" alt={title} />
          </a>
        </div>
        <div className="movie-props">
          <div className="movie-info">
            <div className="movie-title">{title}</div>
            <div className="movie-releaseDate">{year}</div>
          </div>
          <div className="movie-genre">{genreStr}</div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
