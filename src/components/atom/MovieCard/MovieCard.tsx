import React from 'react';
import './MovieCard.scoped.scss';

interface IProps {
  id: number | undefined;
  title: string;
  movieUrl?: string;
  releaseDate: string;
  genres: string[] | { value: string, label: string }[];
  posterPath: string | undefined;
  changeSelectedMovieId: (e: number) => void;
}

export default function MovieCard({
  id = 0,
  title = 'missing_title',
  releaseDate = 'missing_releaseDate',
  genres = ['missing_genre'],
  posterPath = 'missing_image',
  changeSelectedMovieId,
}: IProps): JSX.Element {
  const year = releaseDate.split('-')[0];
  const KEY = 'value';
  const genreStr =
    typeof genres[0] === 'object'
      ? genres
          .map(function (item: any) {
            return item[KEY];
          })
          .join(', ')
      : genres.join(', ');

  return (
    <>
      <div className="movie-card">
        <div className="movie-image">
          <a href="#">
            <img
              src={posterPath}
              className="img-fluid"
              alt={title}
              onClick={() => changeSelectedMovieId(id)}
            />
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
}
