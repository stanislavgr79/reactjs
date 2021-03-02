import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard';
import { IMovie } from '../../../helpers/interface';
import './MoviesList.scoped.scss';

interface MovieCardProps {
  movies: IMovie[];
}

const mapStateToProps = (store: { movies: IMovie[] }) => ({
  movies: store.movies,
});

function MoviesList({ movies }: MovieCardProps) {
  return (
    <>
      <div className="movies_founded">
        <label>
          <strong>{movies.length}</strong> movies found
        </label>
      </div>
      <div className="container-md movies-wraper">
        <div className="row row-cols-3">
          {movies.map(({ title, releaseDate, genre, movieUrl, image }: IMovie) => (
            <div className="col movie-unit" key={title}>
              <MovieCard
                title={title}
                releaseDate={releaseDate}
                genre={genre}
                movieUrl={movieUrl}
                image={image}
                key={title}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
