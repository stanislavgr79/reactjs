import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDeleteMovie, updateShowPopup } from '../../../redux/actions/movies-actions';

import Sitename from '../../atom/SiteName';
import Button from '../../atom/Button';
import Footer from '../../structure/Footer';

import './DeleteMoviePopup.scoped.scss';

interface IProps {
  movieId?: number;
  closePopup: () => void;
}

export default function DeleteMoviePopup({ movieId, closePopup }: IProps): JSX.Element {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(fetchDeleteMovie(movieId));
    dispatch(updateShowPopup(false));
    closePopup();
  }, [dispatch, movieId, closePopup]);

  const handleClick = useCallback(() => {
    dispatch(updateShowPopup(false));
    closePopup();
  }, [dispatch, closePopup]);

  return (
    <div className="popup_model">
      <div className="model_content container-md">
        <Sitename />
        <div className="container delete_movie">
          <div className="container form">
            <div className="section_icon-close">
              <Button
                buttonType="button"
                id="delete_movie_btn_close"
                className="btn_close"
                onClick={handleClick}
              />
            </div>
            <div className="page_title">DELETE MOVIE</div>
            <div className="page_description">Are you sure want to delete this movie?</div>
            <div className="button_section">
              <Button
                buttonType="submit"
                className="btn_submit"
                id="delete_movie_btn_submit"
                label="CONFIRM"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
