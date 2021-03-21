import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromMovies, updateShowPopup } from '@redux/actions/movies-actions';

import Sitename from '@components/atom/SiteName/SiteName';
import Button from '@components/atom/Button';
import Footer from '@components/structure/Footer';

import './DeleteMoviePopup.scoped.less';

interface IProps {
  movieId: number;
  closePopup: () => void;
}

export default function DeleteMoviePopup({ movieId, closePopup }: IProps): JSX.Element {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    dispatch(deleteFromMovies(movieId));
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
              <Button buttonType="button" className="btn_close" onClick={handleClick} />
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