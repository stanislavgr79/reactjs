import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromMovies, updateShowPopup } from '../../../redux/actions/movies-actions';
import Button from '../../atom/Button';
import Sitename from '../../atom/SiteName/SiteName';
import Footer from '../../structure/Footer';
import './DeleteMoviePopap.scoped.less';

interface IProps {
  movieId: number | undefined;
  closePopup: () => void;
}

const DeleteMoviePopap = ({ movieId, closePopup }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteFromMovies(movieId));
    dispatch(updateShowPopup(false));
    closePopup();
  };

  const handleClick = () => {
    dispatch(updateShowPopup(false));
    closePopup();
  };

  return (
    <>
      <div className="popup_model">
        <div className="model_content">
          <Sitename />
          <div className="container delete_movie">
            <div className="container form">
              <div className="page_close">
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
    </>
  );
};

export default DeleteMoviePopap;
