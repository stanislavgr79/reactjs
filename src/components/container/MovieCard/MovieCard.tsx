import React from 'react';
import './MovieCard.scoped.scss';
import images from '../../../helpers/images';

interface MovieCardProps {
  title: string;
  releaseDate: string;
  movieUrl: string;
  genre: string;
  image: string;
  overview?: string;
  runtime?: number | string;
}

export default function MovieCard({
  title = 'missing_title',
  releaseDate = 'missing_releaseDate',
  movieUrl = 'missing_movieUrl',
  genre = 'missing_genre',
  image = 'missing_image',
}: MovieCardProps) {
  const imageRef = images.find((obj: any) => obj.name === image);
  const year = releaseDate.split('.')[2];
  return (
    <>
      <div className="container-md movie-card">
        <div className="movie-image">
          <a href={movieUrl}>
            <img src={imageRef ? imageRef?.value : ''} className="img-fluid" alt={imageRef?.name} />
          </a>
        </div>
        <div className="movie-props">
          <div className="movie-info">
            <div className="movie-title">{title}</div>
            <div className="movie-releaseDate">{year}</div>
          </div>
          <div className="movie-genre">{genre}</div>
        </div>
      </div>
    </>
  );
}
