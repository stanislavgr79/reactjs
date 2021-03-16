import React, { forwardRef, useState } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import Sitename from '../../atom/SiteName/SiteName';
import Footer from '../../structure/Footer';
import { IMovie } from '../../../helpers/interface';
import './EditMoviePopap.scoped.less';

import Select, { components } from 'react-select';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { updateMovieInMovies, updateShowPopup } from '../../../redux/actions/movies-actions';

const select_genres = require('../../../resources/select_genres.json');
const path = '../../../resources/images/icon_calendar.png';

interface IProps {
  movie: IMovie;
  closePopup: () => void;
}

const initialState = [
  {
    id: 0,
    title: '',
    release_date: '',
    movieUrl: '',
    poster_path: '',
    genres: [],
    overview: '',
    runtime: undefined,
  },
];

const Option = (props: any): JSX.Element => {
  return (
    <>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          datatype={props.isSelected.toString()}
          onChange={() => null}
        />{' '}
        <label>{props.value} </label>
      </components.Option>
    </>
  );
};

const MultiValue = (props: any): JSX.Element => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

function transformGenresToArrayObjects(movie: IMovie) {
  const genresArray: { value: string, label: string }[] = [];
  movie.genres.map((it: any) =>
    genresArray.push({
      label: it,
      value: it,
    }),
  );
  return genresArray;
}

const EditMoviePopap = ({ movie, closePopup }: IProps): JSX.Element => {
  const ref: React.LegacyRef<HTMLInputElement> = React.createRef();
  const [form, setForm] = useState(movie);
  const dispatch = useDispatch();

  const closeEditPopup = () => {
    dispatch(updateShowPopup(false));
    closePopup();
  };

  const handleChange = (event: any) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  const handleChangeReleaseDate = (date: any) => {
    const dateFormat = require('dateformat');
    const momentDateFormat = 'yyyy-mm-dd';
    setForm({ ...form, release_date: dateFormat(date, momentDateFormat) });
  };

  const handleChangeGenre = (genres: any) => {
    setForm({ ...form, genres: genres });
  };

  const onClickReset = () => {
    setForm(initialState[0]);
  };

  const handleSubmit = () => {
    dispatch(updateMovieInMovies(form));
    dispatch(updateShowPopup(false));
    closePopup();
  };

  interface IPropInput {
    value: string | undefined;
    onClick: (date: any) => void;
  }

  const CustomInput = forwardRef(
    ({ value, onClick }: IPropInput, ref: React.LegacyRef<HTMLInputElement>) => {
      return (
        <>
          <input
            name="release_date"
            className="simple_input"
            placeholder="Select Date"
            value={value}
            ref={ref}
            readOnly
          ></input>
          <img src={path} className="image_calendar" onClick={onClick} alt="" />
        </>
      );
    },
  );

  return (
    <>
      <div className="popup_model">
        <div className="model_content">
          <Sitename />
          <div className="container add_movie">
            <div className="container form">
              <div className="page_close">
                <Button buttonType="button" className="btn_close" onClick={closeEditPopup} />
              </div>
              <div className="page_title">ADD MOVIE</div>
              <form className="movie_form" onSubmit={handleSubmit}>
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
                <DatePicker
                  name="release_date"
                  selected={form.release_date ? new Date(form.release_date) : null}
                  placeholderText="Select Date"
                  dateFormat="yyyy-MM-dd"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  onChange={handleChangeReleaseDate}
                  customInput={
                    <CustomInput
                      value={form.release_date ? new Date(form.release_date) : undefined}
                      onClick={handleChangeReleaseDate}
                      ref={ref}
                    />
                  }
                  calendarClassName="calendar"
                  onKeyDown={(e) => e.preventDefault()}
                />
                <label>MOVIE URL</label>
                <Input
                  type="text"
                  name="movieUrl"
                  className="simple_input"
                  placeholder="Movie URL here"
                  value={form.movieUrl}
                  onChange={handleChange}
                />
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
                <Select
                  className="select_genres"
                  closeMenuOnSelect={false}
                  placeholder="Select Genre"
                  isMulti={true}
                  components={{ Option, MultiValue }}
                  value={
                    typeof form.genres[0] === 'object'
                      ? form.genres
                      : transformGenresToArrayObjects(movie)
                  }
                  options={select_genres}
                  hideSelectedOptions={false}
                  menuIsClose={false}
                  backspaceRemovesValue={false}
                  onChange={handleChangeGenre}
                />
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
                  type="text"
                  name="runtime"
                  className="simple_input"
                  placeholder="Runtime here"
                  value={form.runtime}
                  onChange={handleChange}
                />
                <div className="button_section">
                  <Button
                    buttonType="submit"
                    className="btn_submit"
                    id="add_movie_btn_submit"
                    label="SAVE"
                    onClick={handleSubmit}
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
};

export default EditMoviePopap;
