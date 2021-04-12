import React, { useState } from 'react';

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
          {movies.map((movie: IMovie, index: number) => (
            <div className="col movie-unit" key={`unit-${index}`}>
              <div className="movie_holder">
                <MovieCard movie={movie} />
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
