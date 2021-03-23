import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/redux-store';
import { fetchMovies, updateSelectedMovieId } from '../../../redux/actions/movies-actions';

import MovieCard from '../../atom/MovieCard';
import MovieMenuPopup from '../MovieMenuPopup';
import { IMovie } from '../../../helpers/interface';

import './MoviesList.scoped.scss';

import image from '@resources/images/menu-icon.png';

interface IProp {
  movies: IMovie[];
}

const RenderMoviesFounded = ({ movies }: IProp): JSX.Element => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeMovieId, setActiveMovieId] = useState(0);
  const dispatch = useDispatch();

  const updateShowSubMenuWithId = (id: number) => {
    setActiveMovieId(id);
    setShowSubMenu(!showSubMenu);
  };

  const updateShowSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const changeSelectedMovieId = useCallback(
    (id: number) => {
      dispatch(updateSelectedMovieId(id));
    },
    [dispatch],
  );

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

export default function MoviesList(): JSX.Element {
  const dispatch = useDispatch();
  const store = useSelector((store: AppState) => {
    return {
      movies: store.moviesStore.movies,
      dataStatus: store.moviesStore.dataStatus,
      sidebar: store.sidebar,
      search: store.searchStore.search,
    };
  });

  useEffect(() => {
    let params: string[][];
    if (store.dataStatus === 'idle') {
      params = [
        ['offset', '0'],
        ['limit', '6'],
        ['filter', store.sidebar.genre],
        ['sortBy', store.sidebar.sortBy],
        ['sortOrder', store.sidebar.sortOrder],
      ];
    } else {
      params = [
        ['offset', store.movies.offset.toString()],
        ['limit', '6'],
        ['searchBy', 'title'],
        ['search', store.search.value],
        ['filter', store.sidebar.genre],
        ['sortBy', store.sidebar.sortBy],
        ['sortOrder', store.sidebar.sortOrder],
      ];
    }
    dispatch(fetchMovies(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    store.movies.totalAmount,
    store.search.value,
    store.sidebar.sortBy,
    store.sidebar.sortOrder,
    store.movies.offset,
    store.sidebar.genre,
    dispatch,
  ]);

  let content;

  if (store.dataStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (store.dataStatus === 'succeeded') {
    content = (
      <>
        <div className="container-md movies_finded">
          <label>
            <strong>{store.movies.totalAmount}</strong> movies found
          </label>
        </div>
        {store.movies.totalAmount > 0 ? (
          <RenderMoviesFounded movies={store.movies.data} />
        ) : (
          <div className="movies_not_finded">Movies not finded</div>
        )}
      </>
    );
  } else if (store.dataStatus === 'failed') {
    content = <div>Error</div>;
  }

  return <>{content}</>;
}
