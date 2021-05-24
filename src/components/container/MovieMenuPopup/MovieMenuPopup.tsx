import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateShowPopup } from '../../../redux/actions/movies-actions';

import Button from '../../atom/Button';
import DeleteMoviePopup from '../DeleteMoviePopup';
import ModelMoviePopup from '../ModelMoviePopup';
import { IMovie } from '../../../helpers/interface';

import './MovieMenuPopup.scoped.scss';

interface IProps {
  movie: IMovie;
  closeMenu: () => void;
}

export default function MovieMenuPopup({ movie, closeMenu }: IProps): JSX.Element {
  const dispatch = useDispatch();
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  useEffect(() => {
    dispatch(updateShowPopup(showPopupEdit && showPopupDelete));
  }, [dispatch, showPopupEdit, showPopupDelete]);

  const updatePopupEdit = useCallback(() => {
    setShowPopupEdit(!showPopupEdit);
  }, [showPopupEdit]);

  const togglePopupEdit = useCallback(() => {
    setShowPopupDelete(!showPopupEdit);
    closeMenu();
  }, [closeMenu, showPopupEdit]);

  const updatePopupDelete = useCallback(() => {
    setShowPopupDelete(!showPopupDelete);
  }, [showPopupDelete]);

  const togglePopupDelete = useCallback(() => {
    setShowPopupDelete(!showPopupDelete);
    closeMenu();
  }, [closeMenu, showPopupDelete]);

  return (
    <div className="movie_sub_menu">
      <div className="page_close">
        <Button buttonType="button" className="btn_close icon_small" onClick={closeMenu} />
      </div>
      <div className="menu_list">
        <div className="edit_point menu_item" onClick={updatePopupEdit}>
          Edit
        </div>
        {showPopupEdit && (
          <ModelMoviePopup movie={movie} closePopup={togglePopupEdit} role="edit" />
        )}
        <div className="delete_point menu_item" onClick={updatePopupDelete}>
          Delete
        </div>
        {showPopupDelete && <DeleteMoviePopup movieId={movie.id} closePopup={togglePopupDelete} />}
      </div>
    </div>
  );
}
