import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IMovie } from '../../../helpers/interface';

import { updateShowPopup } from '../../../redux/actions/movies-actions';
import Button from '../../atom/Button';
import DeleteMoviePopap from '../DeleteMoviePopap';
import EditMoviePopap from '../EditMoviePopap';

import './MovieMenuPopup.scoped.less';

interface IProps {
  movie: IMovie;
  closeMenu: () => void;
}

const MovieMenuPopup = ({ movie, closeMenu }: IProps): JSX.Element => {
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateShowPopup(showPopupEdit));
    dispatch(updateShowPopup(showPopupDelete));
  }, [dispatch, showPopupEdit, showPopupDelete]);

  const updatePopupEdit = () => {
    setShowPopupEdit(!showPopupEdit);
  };

  const togglePopupEdit = () => {
    setShowPopupDelete(!showPopupEdit);
    closeMenu();
  };

  const updatePopupDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  const togglePopupDelete = () => {
    setShowPopupDelete(!showPopupDelete);
    closeMenu();
  };

  return (
    <div className="movie_sub_menu">
      <div className="page_close">
        <Button buttonType="button" className="btn_close icon_small" onClick={closeMenu} />
      </div>
      <div className="menu_list">
        <div className="edit_point menu_item" onClick={updatePopupEdit}>
          Edit
        </div>
        {showPopupEdit ? <EditMoviePopap movie={movie} closePopup={togglePopupEdit} /> : null}
        <div className="delete_point menu_item" onClick={updatePopupDelete}>
          Delete
        </div>
        {showPopupDelete ? (
          <DeleteMoviePopap movieId={movie.id} closePopup={togglePopupDelete} />
        ) : null}
      </div>
    </div>
  );
};

export default MovieMenuPopup;
