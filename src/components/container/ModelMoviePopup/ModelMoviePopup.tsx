/* eslint-disable max-len */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
import './ModelMoviePopup.scoped.scss';

const emptyMovieForm: IMovie = {
  id: 0,
  title: '',
  release_date: '',
  poster_path: '',
  genres: [],
  overview: '',
  runtime: 0,
};

interface IProps {
  movie?: IMovie;
  closePopup: () => void;
  role: string;
}

export default function ModelMoviePopup(props: IProps): JSX.Element {
  const dispatch = useDispatch();
  const { movie, closePopup, role } = props;
  const isEditForm = role == 'edit' ? true : false;

  const closeEditPopup = useCallback(() => {
    dispatch(updateShowPopup(false));
    closePopup();
  }, [closePopup, dispatch]);

  const resetForm = useCallback((formik) => {
    formik.handleReset();
  }, []);

  const handleSubmitEdit = useCallback(
    (form: IMovie) => {
      dispatch(
        fetchUpdateMovie({
          ...form,
          tagline: form.tagline == undefined ? 'Out description' : form.tagline,
        }),
      );
      dispatch(updateShowPopup(false));
      closePopup();
    },
    [dispatch, closePopup],
  );

  const handleSubmitAdd = useCallback(
    (form: IMovie) => {
      const fetchForm: IMovie = {
        title: form.title,
        release_date: form.release_date,
        poster_path: form.poster_path,
        genres: form.genres,
        overview: form.overview,
        runtime: form.runtime,
        tagline: 'Out description',
        vote_average: 0,
        vote_count: 0,
        budget: 0,
        revenue: 0,
      };
      dispatch(fetchAddMovie(fetchForm));
      closePopup();
    },
    [dispatch, closePopup],
  );

  const form = movie ? movie : emptyMovieForm;

  const formik = useFormik({
    initialValues: {
      id: form.id,
      title: form.title,
      release_date: form.release_date,
      poster_path: form.poster_path,
      genres: form.genres,
      overview: form.overview,
      runtime: form.runtime,
      tagline: form.tagline,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, 'Must be min 2 characters')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      release_date: Yup.string().matches(
        new RegExp('^[\\d]{4}-[\\d]{2}-[\\d]{2}$'),
        'Not valide date stamp',
      ),
      poster_path: Yup.string()
        .matches(new RegExp('^.+(\\.)(jpg|jpeg|png)$'), 'Must be a Picture')
        .required('Required'),
      genres: Yup.array().min(1, 'Must be one or more genres').required('Required'),
      overview: Yup.string().min(6, 'Must be 6 characters or more'),
      runtime: Yup.number()
        .positive('time must be greater than zero')
        .typeError('time must be a number')
        .required('Required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        {
          isEditForm ? handleSubmitEdit(values) : handleSubmitAdd(values);
        }
        setSubmitting(false);
      }, 400);
    },
  });

  return (
    <>
      <div className="popup_model">
        <div className="model_content container-md">
          <Sitename />
          <div className={`container ${role}_movie`}>
            <div className="container-sm form">
              <div className="page_close">
                <Button buttonType="button" className="btn_close" onClick={closeEditPopup} />
              </div>
              <div className="page_title">{isEditForm ? 'EDIT MOVIE' : 'ADD MOVIE'}</div>
              <form className="movie_form" onSubmit={formik.handleSubmit}>
                {isEditForm && (
                  <>
                    <label>MOVIE ID</label>
                    <Input
                      type="text"
                      name="id"
                      className="simple_input input_readonly"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      readonly={true}
                    />
                  </>
                )}
                <label>
                  TITLE
                  <Input
                    type="text"
                    name="title"
                    className="simple_input"
                    placeholder="Write Title"
                    value={formik.values.title}
                    onChange={(e) => {
                      formik.setFieldTouched('title');
                      formik.handleChange(e);
                    }}
                  />
                </label>
                {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
                <label>
                  RELEASE DATE
                  <Calendar
                    name="release_date"
                    value={formik.values.release_date}
                    onChange={(name, val) => {
                      formik.setFieldTouched('release_date');
                      formik.setFieldValue(name, val, true);
                    }}
                  />
                </label>
                {formik.errors.release_date && formik.errors.release_date && (
                  <div>{formik.errors.release_date}</div>
                )}
                <label>
                  POSTER URL
                  <Input
                    type="text"
                    name="poster_path"
                    className="simple_input"
                    placeholder="Poster URL here"
                    value={formik.values.poster_path}
                    onChange={(e) => {
                      formik.setFieldTouched('poster_path');
                      formik.handleChange(e);
                    }}
                  />
                </label>
                {formik.touched.poster_path && formik.errors.poster_path && (
                  <div>{formik.errors.poster_path}</div>
                )}
                <label>
                  GENRE
                  <MultiSelect
                    name="genres"
                    value={formik.values.genres}
                    onChange={(name: string, val: string[]) => {
                      formik.setFieldTouched('genres');
                      formik.setFieldValue(name, val, true);
                    }}
                  />
                </label>
                {formik.touched.genres && formik.errors.genres && <div>{formik.errors.genres}</div>}
                <label>
                  OVERVIEW
                  <Input
                    type="text"
                    name="overview"
                    className="simple_input"
                    placeholder="Overview here"
                    value={formik.values.overview}
                    onChange={(e) => {
                      formik.setFieldTouched('overview');
                      formik.handleChange(e);
                    }}
                  />
                </label>
                {formik.touched.overview && formik.errors.overview && (
                  <div>{formik.errors.overview}</div>
                )}
                <label>
                  RUNTIME
                  <Input
                    type="number"
                    name="runtime"
                    className="simple_input"
                    placeholder="Runtime here"
                    value={formik.values.runtime == 0 ? '' : formik.values.runtime}
                    min={'0'}
                    onChange={(e) => {
                      formik.setFieldTouched('runtime');
                      formik.handleChange(e);
                    }}
                  />
                </label>
                {formik.touched.runtime && formik.errors.runtime && (
                  <div>{formik.errors.runtime}</div>
                )}
                <div className="button_section">
                  <Button
                    className="btn_submit"
                    id="add_movie_btn_submit"
                    label={isEditForm ? 'SAVE' : 'SUBMIT'}
                    buttonType="submit"
                    disabled={formik.isSubmitting}
                  />
                  <Button
                    buttonType="reset"
                    className="btn_reset"
                    id="add_movie_btn_reset"
                    label="RESET"
                    onClick={() => resetForm(formik)}
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
