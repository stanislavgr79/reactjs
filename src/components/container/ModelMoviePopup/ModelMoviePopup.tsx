import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateShowPopup,
  fetchUpdateMovie,
  fetchAddMovie,
} from '../../../redux/actions/movies-actions';

import Footer from '../../structure/Footer';
import Sitename from '../../atom/SiteName';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import Calendar from '../../atom/Calendar';
import MultiSelect from '../../atom/MultiSelect';
import { IMovie } from '../../../helpers/interface';
import { transformGenresToStringArray } from '../../../helpers/utils';
import './ModelMoviePopup.scoped.less';

interface IProps {
  movie?: IMovie;
  closePopup: () => void;
  role: string;
}

const init = (): IMovie => {
  const form = {
    id: 0,
    title: '',
    release_date: '',
    poster_path: '',
    genres: [],
    overview: '',
    runtime: 0,
  };
  return form;
};

export default function ModelMoviePopup({ movie, closePopup, role }: IProps): JSX.Element {
  const dispatch = useDispatch();

  const isEditForm = role == 'edit' ? true : false;
  const [form, setForm] = useState(movie ? movie : init);

  const closeEditPopup = useCallback(() => {
    dispatch(updateShowPopup(false));
    closePopup();
  }, [closePopup, dispatch]);

  const handleChange = useCallback(
    (event: any) => {
      const property = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [property]: value });
    },
    [form],
  );

  const handleChangeReleaseDate = useCallback(
    (date) => {
      const dateFormat = require('dateformat');
      const momentDateFormat = 'yyyy-mm-dd';
      setForm({ ...form, release_date: dateFormat(date, momentDateFormat) });
    },
    [form],
  );

  const handleChangeGenre = useCallback(
    (genres: { label: string, value: string }[]) => {
      const newGenres: string[] = transformGenresToStringArray(genres);
      setForm({ ...form, genres: newGenres });
    },
    [form],
  );

  const onClickReset = useCallback(() => {
    const newForm = init();
    newForm.id = form.id ? form.id : 0;
    setForm(newForm);
  }, [form.id]);

  const getValidForm = (form: any) => {
    if (form.tagline?.length == 0) {
      form.tagline = 'Out description';
    }
    form.runtime = form.runtime == null ? 0 : parseInt(form.runtime);
    return form;
  };

  const handleSubmitEdit = useCallback(() => {
    const formValid = getValidForm(form);
    dispatch(fetchUpdateMovie(formValid));
    dispatch(updateShowPopup(false));
    closePopup();
  }, [dispatch, closePopup, form]);

  const handleSubmitAdd = useCallback(() => {
    const fetchForm: IMovie = {
      title: form.title,
      tagline: '',
      vote_average: 0,
      vote_count: 0,
      release_date: form.release_date,
      poster_path: form.poster_path,
      overview: form.overview,
      budget: 0,
      revenue: 0,
      runtime: form.runtime,
      genres: form.genres,
    };
    dispatch(fetchAddMovie(getValidForm(fetchForm)));
    closePopup();
  }, [form, dispatch, closePopup]);

  return (
    <>
      <div className="popup_model">
        <div className="model_content container-md">
          <Sitename />
          <div className="container edit_movie">
            <div className="container-sm form">
              <div className="page_close">
                <Button buttonType="button" className="btn_close" onClick={closeEditPopup} />
              </div>
              <div className="page_title">{isEditForm ? 'EDIT MOVIE' : 'ADD MOVIE'}</div>
              <form
                className="movie_form"
                onSubmit={isEditForm ? handleSubmitEdit : handleSubmitAdd}
              >
                {isEditForm && (
                  <>
                    <label>MOVIE ID</label>
                    <Input
                      type="text"
                      name="id"
                      className="simple_input input_readonly"
                      value={form?.id}
                      onChange={handleChange}
                      readonly={true}
                    />
                  </>
                )}
                <label>TITLE</label>
                <Input
                  type="text"
                  name="title"
                  className="simple_input"
                  placeholder="Write Title"
                  value={form.title}
                  onChange={handleChange}
                />
                <label>RELEASE DATE</label>
                <Calendar form={form} handleChangeReleaseDate={handleChangeReleaseDate} />
                <label>POSTER URL</label>
                <Input
                  type="text"
                  name="poster_path"
                  className="simple_input"
                  placeholder="Poster URL here"
                  value={form.poster_path}
                  onChange={handleChange}
                />
                <label>GENRE</label>
                <MultiSelect genres={form.genres} handleChangeGenre={handleChangeGenre} />
                <label>OVERVIEW</label>
                <Input
                  type="text"
                  name="overview"
                  className="simple_input"
                  placeholder="Overview here"
                  value={form.overview}
                  onChange={handleChange}
                />
                <label>RUNTIME</label>
                <Input
                  type="number"
                  name="runtime"
                  className="simple_input"
                  placeholder="Runtime here"
                  value={form.runtime == (0 || null) ? '' : form.runtime}
                  min={'0'}
                  onChange={handleChange}
                />
                <div className="button_section">
                  <Button
                    className="btn_submit"
                    id="add_movie_btn_submit"
                    label={isEditForm ? 'SAVE' : 'SUBMIT'}
                    onClick={isEditForm ? handleSubmitEdit : handleSubmitAdd}
                  />
                  <Button
                    buttonType="reset"
                    className="btn_reset"
                    id="add_movie_btn_reset"
                    label="RESET"
                    onClick={onClickReset}
                  />
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
