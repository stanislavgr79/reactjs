import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import MovieCard from '../../atom/MovieCard';
import { IMovie } from '../../../helpers/interface';
import MovieMenuPopup from '../MovieMenuPopup';
import image from '@resources/images/menu-icon.png';

import './MoviesList.scoped.scss';
interface IProp {
  movies: IMovie[];
}

function filterByGenre(movies: IMovie[], genre: string) {
  return movies.filter(function (el) {
    let isFinded = false;
    el.genres.forEach(function (e) {
      if (e.toLowerCase() == genre.toLowerCase()) {
        isFinded = true;
      }
    });
    if (isFinded) {
      return el;
    }
  });
}

function renderMoviesNotFounded() {
  return <div className="movies_not_finded">Movies not finded</div>;
}

const RenderMoviesFounded = ({ movies }: IProp): JSX.Element => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState(0);

  const updateShowSubMenuWithId = (id: number) => {
    setActiveMovieId(id);
    setShowSubMenu(!showSubMenu);
  };

  const updateShowSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <>
      <div className="container-md movies-wraper">
        <div className="row row-cols-3">
          {movies.map((movie: IMovie) => (
            <div className="col movie-unit" key={movie.title}>
              <div className="movie_holder">
                <MovieCard
                  title={movie.title}
                  releaseDate={movie.release_date}
                  genres={movie.genres}
                  movieUrl={movie.movieUrl}
                  posterPath={movie.poster_path}
                  key={movie.title}
                />
                {!showSubMenu ? (
                  <img
                    src={image}
                    className="sub_menu_icon"
                    onClick={() => updateShowSubMenuWithId(movie.id)}
                  />
                ) : activeMovieId == movie.id ? (
                  <MovieMenuPopup movie={movie} closeMenu={updateShowSubMenu} />
                ) : (
                  <img src={image} className="sub_menu_icon" onClick={updateShowSubMenu} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function dynamicSort(property: string) {
  let sortOrder = 1;
  if (property.toString().startsWith('-')) {
    sortOrder = -1;
    property = property.toString().substr(1);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (a: { [x: string]: any }, b: { [x: string]: any }) {
    if (property == 'release') {
      property = 'release_date';
    }

    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

function searchMovies(movies: IMovie[], search: string) {
  return movies.filter((movie: IMovie) => movie.title.toLowerCase().includes(search.toLowerCase()));
}

const MoviesList = (): JSX.Element => {
  const store = {
    movies: useSelector((store: { moviesStore: { movies: IMovie[] } }) => store.moviesStore.movies),
    sidebar: useSelector((store: { sidebar: { genre: string, sortBy: string } }) => store.sidebar),
    search: useSelector((store: { search: { value: string } }) => store.search.value),
  };

  const movies = store.search != '' ? searchMovies(store.movies, store.search) : store.movies;
  const filteredMovies =
    store.sidebar.genre == 'ALL' ? movies : filterByGenre(movies, store.sidebar.genre);

  filteredMovies.sort(dynamicSort(store.sidebar.sortBy.toString().toLowerCase()));

  return (
    <>
      <div className="movies_finded">
        <label>
          <strong>{filteredMovies.length}</strong> movies found
        </label>
      </div>
      {filteredMovies.length > 0 ? (
        <RenderMoviesFounded movies={filteredMovies} />
      ) : (
        renderMoviesNotFounded()
      )}
    </>
  );
};

export default MoviesList;
