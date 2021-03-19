import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { updateSelectedMovieId } from '../../../redux/actions/movies-actions';

import MovieCard from '../../atom/MovieCard';
import MovieMenuPopup from '../MovieMenuPopup';
import { IMovie } from '../../../helpers/interface';

import image from '@resources/images/menu-icon.png';
import './MoviesList.scoped.scss';

interface IProp {
  movies: IMovie[];
}

const renderMoviesNotFounded = () => {
  <div className="movies_not_finded">Movies not finded</div>;
};

const RenderMoviesFounded = ({ movies }: IProp): JSX.Element => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState(0);
  const [selectedMovieId, setSelectedMovieId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateSelectedMovieId(selectedMovieId));
  }, [dispatch, selectedMovieId]);

  const updateShowSubMenuWithId = (id: number) => {
    setActiveMovieId(id);
    setShowSubMenu(!showSubMenu);
  };

  const updateShowSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const changeSelectedMovieId = (id: number) => {
    setSelectedMovieId(id);
  };

  return (
    <>
      <div className="container-md movies-wraper">
        <div className="row row-cols-3">
          {movies.map((movie: IMovie) => (
            <div className="col movie-unit" key={movie.title}>
              <div className="movie_holder">
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  releaseDate={movie.release_date}
                  genres={movie.genres}
                  movieUrl={movie.movieUrl}
                  posterPath={movie.poster_path}
                  key={movie.title}
                  changeSelectedMovieId={changeSelectedMovieId}
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

export default function MoviesList(): JSX.Element {
  const store = useSelector((store: AppState) => {
    return {
      movies: store.moviesStore.movies,
      sidebar: store.sidebar,
      search: store.searchStore.search,
    };
  });

  const movies: IMovie[] = useMemo(() => {
    const movies: IMovie[] =
      store.search.value != '' ? searchMovies(store.movies, store.search.value) : store.movies;
    const filteredMovies: IMovie[] =
      store.sidebar.genre == 'ALL' ? movies : filterByGenre(movies, store.sidebar.genre);
    return filteredMovies.sort(dynamicSort(store.sidebar.sortBy.toString().toLowerCase()));
  }, [store.movies, store.search, store.sidebar.genre, store.sidebar.sortBy]);

  return (
    <>
      <div className="container-md movies_finded">
        <label>
          <strong>{movies.length}</strong> movies found
        </label>
      </div>
      {movies.length > 0 ? <RenderMoviesFounded movies={movies} /> : renderMoviesNotFounded}
    </>
  );
}
