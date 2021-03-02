import React from 'react';
import './MovieCard.scoped.scss';
import images from '../helpers/images';

interface MovieCardProps {
  title: string;
  releaseDate: Date | string;
  movieUrl: URL | string;
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
  // const imageRef = images.find((obj: any) => obj.name === image);
  return images.map((obj) => (
    <>
      <div className="movie-card">
        <div className="container movie-image">
          <img src={obj.name === image ? obj.value : ''} />
        </div>
        <div className="container movie-props">
          <div className="movie-url">{movieUrl}</div>
          <div className="movie-info">
            <div className="movie-title">{title}</div>
            <div className="movie-releaseDate">{releaseDate}</div>
          </div>
          <div className="movie-genre">{genre}</div>
        </div>
      </div>
    </>
  ));
}
