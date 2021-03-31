import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormikProps, FormikErrors, Form, Formik } from 'formik';
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
import './ModelMoviePopup.scoped.less';

interface FormValues {
  id?: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: string[];
  overview: string;
  runtime: number;
}

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

export default function ModelMoviePopup(props: IProps & FormikProps<FormValues>): JSX.Element {
  const { movie, closePopup, role } = props;
  const dispatch = useDispatch();
  const isEditForm = role == 'edit' ? true : false;
  const [form, setForm] = useState(movie ? movie : init);

  const closeEditPopup = useCallback(() => {
    dispatch(updateShowPopup(false));
    closePopup();
  }, [closePopup, dispatch]);

  const handleChangeProp = useCallback((event: any) => {
    const { name, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleChangeReleaseDate = useCallback(
    (date) => {
      const dateFormat = require('dateformat');
      const momentDateFormat = 'yyyy-mm-dd';
      setForm({ ...form, release_date: dateFormat(date, momentDateFormat) });
    },
    [form],
  );

  const handleChangeGenre = useCallback(
    (genres: string[]) => {
      setForm({ ...form, genres: genres });
    },
    [form],
  );

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
  }, [form, dispatch, closePopup]);

  const handleSubmitAdd = useCallback(() => {
    const fetchForm: IMovie = {
      title: form.title,
      release_date: form.release_date,
      poster_path: form.poster_path,
      genres: form.genres,
      overview: form.overview,
      runtime: form.runtime,
      tagline: '',
      vote_average: 0,
      vote_count: 0,
      budget: 0,
      revenue: 0,
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
              <Formik
                initialValues={form}
                validate={(values: IMovie) => {
                  const errors: FormikErrors<FormValues> = {};
                  if (!values.title) {
                    errors.title = 'Required title';
                  }
                  if (values.release_date) {
                    if (new Date().getTime() < new Date(values.release_date).getTime()) {
                      errors.release_date = 'Bad date';
                    }
                  }
                  if (!values.poster_path) {
                    errors.poster_path = 'Required';
                  }
                  if (values.genres.length == 0) {
                    errors.genres = 'Required min 1 genre';
                  }
                  if (!values.overview) {
                    errors.overview = 'Required overview';
                  }
                  if (!values.runtime || values.runtime < 1) {
                    errors.runtime = 'Required runtime > 0';
                  }
                  return errors;
                }}
                onSubmit={(_form, { setSubmitting }) => {
                  setTimeout(() => {
                    {
                      isEditForm ? handleSubmitEdit() : handleSubmitAdd();
                    }
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  resetForm,
                }) => (
                  <Form className="movie_form" onSubmit={handleSubmit}>
                    {isEditForm && (
                      <>
                        <label>MOVIE ID</label>
                        <Input
                          type="text"
                          name="id"
                          className="simple_input input_readonly"
                          // value={form?.id}
                          value={values?.id}
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
                      value={values.title}
                      onChange={(e) => {
                        handleChangeProp(e);
                        handleChange(e);
                      }}
                    />
                    {errors.title && <div>{errors.title}</div>}
                    <label>RELEASE DATE</label>
                    <Calendar
                      name="release_date"
                      value={values.release_date}
                      handleChangeReleaseDate={handleChangeReleaseDate}
                      onChange={(name, val) => {
                        setFieldValue(name, val, true);
                        handleChangeReleaseDate(val);
                      }}
                    />
                    {errors.release_date && <div>{errors.release_date}</div>}
                    <label>POSTER URL</label>
                    <Input
                      type="text"
                      name="poster_path"
                      className="simple_input"
                      placeholder="Poster URL here"
                      value={values.poster_path}
                      onChange={(e) => {
                        handleChangeProp(e);
                        handleChange(e);
                      }}
                    />
                    {errors.poster_path && <div>{errors.poster_path}</div>}
                    <label>GENRE</label>
                    <MultiSelect
                      name="genres"
                      value={values.genres}
                      onChange={(name: string, val: string[]) => {
                        setFieldValue(name, val, true);
                        handleChangeGenre(val);
                      }}
                    />
                    {errors.genres && <div>{errors.genres}</div>}
                    <label>OVERVIEW</label>
                    <Input
                      type="text"
                      name="overview"
                      className="simple_input"
                      placeholder="Overview here"
                      value={values.overview}
                      onChange={(e) => {
                        handleChangeProp(e);
                        handleChange(e);
                      }}
                    />
                    {errors.overview && <div>{errors.overview}</div>}
                    <label>RUNTIME</label>
                    <Input
                      type="number"
                      name="runtime"
                      className="simple_input"
                      placeholder="Runtime here"
                      value={form.runtime == (0 || null) ? '' : values.runtime}
                      min={'0'}
                      onChange={(e) => {
                        handleChangeProp(e);
                        handleChange(e);
                      }}
                    />
                    {errors.runtime && <div>{errors.runtime}</div>}
                    <div className="button_section">
                      <Button
                        className="btn_submit"
                        id="add_movie_btn_submit"
                        label={isEditForm ? 'SAVE' : 'SUBMIT'}
                        buttonType="submit"
                        disabled={isSubmitting}
                      />
                      <Button
                        buttonType="reset"
                        className="btn_reset"
                        id="add_movie_btn_reset"
                        label="RESET"
                        onClick={resetForm}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
