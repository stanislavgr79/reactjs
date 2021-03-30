import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSelectedMovieId } from '../../../redux/actions/movies-actions';

import MovieCard from '../../atom/MovieCard';
import MovieMenuPopup from '../MovieMenuPopup';
import { IMovie } from '../../../helpers/interface';

import image from '@resources/images/menu-icon.png';
import './RenderMoviesFounded.scoped.scss';

interface IProp {
  movies: IMovie[];
}

export default function RenderMoviesFounded({ movies }: IProp): JSX.Element {
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
            <div className="col movie-unit" key={movie.id}>
              <div className="movie_holder">
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  changeSelectedMovieId={changeSelectedMovieId}
                />
                {!showSubMenu ? (
                  <img
                    src={image}
                    className="sub_menu_icon"
                    onClick={() => updateShowSubMenuWithId(Number(movie.id))}
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
}
