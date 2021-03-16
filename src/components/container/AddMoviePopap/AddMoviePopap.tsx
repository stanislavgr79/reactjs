import React, { Component, forwardRef } from 'react';
import Input from '../../atom/Input';
import Button from '../../atom/Button';
import Sitename from '../../atom/SiteName/SiteName';
import Footer from '../../structure/Footer';
import { IMovie } from '../../../helpers/interface';

import Select, { components } from 'react-select';
import DatePicker from 'react-datepicker';

const select_genres = require('../../../resources/select_genres.json');
import image from '@resources/images/icon_calendar.png';
import './AddMoviePopap.scoped.less';

import { connect } from 'react-redux';
import { addToMovies } from '../../../redux/actions/movies-actions';
import { AnyAction, Dispatch } from 'redux';

interface IProps {
  closePopup: () => void;
  addMovieToMovies: () => void;
}

interface IState {
  form: {
    id?: number,
    title: string,
    release_date: string,
    movieUrl: string,
    poster_path: string,
    genres: string[],
    overview: string,
    runtime: number | undefined,
  };
}

const initialState = [
  {
    id: undefined,
    title: '',
    release_date: '',
    movieUrl: '',
    poster_path: '',
    genres: [],
    overview: '',
    runtime: 0,
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

class AddMoviePopap extends Component<IProps, IState> {
  addToMovies: any;
  constructor(props: IMovie) {
    super(props);
    this.state = {
      form: initialState[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeReleaseDate = this.handleChangeReleaseDate.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillUnmount() {
    this.onClickReset();
  }

  handleChange(event: any) {
    const property = event.target.name;
    const value = event.target.value;
    this.setState({
      form: {
        ...this.state.form,
        [property]: value,
      },
    });
  }

  handleChangeReleaseDate(date: any) {
    const dateFormat = require('dateformat');
    const momentDateFormat = 'yyyy-mm-dd';
    this.setState({
      form: {
        ...this.state.form,
        release_date: dateFormat(date, momentDateFormat),
      },
    });
  }

  handleChangeGenre(genres: any) {
    this.setState({
      form: {
        ...this.state.form,
        genres: genres,
      },
    });
  }

  onClickReset() {
    this.setState({ form: initialState[0] });
  }

  handleSubmit() {
    this.setState({
      form: {
        ...this.state.form,
        id: new Date().getTime(),
      },
    });
    const { form } = this.state;
    this.props.addMovieToMovies(form);
    this.props.closePopup();
  }

  handleClick() {
    this.props.closePopup();
  }

  render() {
    const ref: React.LegacyRef<HTMLInputElement> = React.createRef();
    const {
      title,
      release_date,
      movieUrl,
      poster_path,
      genres,
      overview,
      runtime,
    } = this.state.form;

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
            <img src={image} className="image_calendar" onClick={onClick} alt="" />
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
                  <Button buttonType="button" className="btn_close" onClick={this.handleClick} />
                </div>
                <div className="page_title">ADD MOVIE</div>
                <form className="movie_form" onSubmit={this.handleSubmit}>
                  <label>TITLE</label>
                  <Input
                    type="text"
                    name="title"
                    className="simple_input"
                    placeholder="Write Title"
                    value={title}
                    onChange={this.handleChange}
                  />
                  <label>RELEASE DATE</label>
                  <DatePicker
                    name="release_date"
                    selected={release_date ? new Date(release_date) : null}
                    placeholderText="Select Date"
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onChange={this.handleChangeReleaseDate}
                    customInput={
                      <CustomInput
                        value={release_date ? new Date(release_date) : null}
                        onClick={this.handleChangeReleaseDate}
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
                    value={movieUrl}
                    onChange={this.handleChange}
                  />
                  <label>POSTER URL</label>
                  <Input
                    type="text"
                    name="poster_path"
                    className="simple_input"
                    placeholder="Poster URL here"
                    value={poster_path}
                    onChange={this.handleChange}
                  />
                  <label>GENRE</label>
                  <Select
                    className="select_genres"
                    closeMenuOnSelect={false}
                    placeholder="Select Genre"
                    isMulti={true}
                    components={{ Option, MultiValue }}
                    defaultValue={genres}
                    value={genres}
                    options={select_genres}
                    hideSelectedOptions={false}
                    menuIsClose={false}
                    backspaceRemovesValue={false}
                    onChange={this.handleChangeGenre}
                  />
                  <label>OVERVIEW</label>
                  <Input
                    type="text"
                    name="overview"
                    className="simple_input"
                    placeholder="Overview here"
                    value={overview}
                    onChange={this.handleChange}
                  />
                  <label>RUNTIME</label>
                  <Input
                    type="text"
                    name="runtime"
                    className="simple_input"
                    placeholder="Runtime here"
                    value={runtime == 0 ? '' : runtime}
                    onChange={this.handleChange}
                  />
                  <div className="button_section">
                    <Button
                      buttonType="submit"
                      className="btn_submit"
                      id="add_movie_btn_submit"
                      label="SUBMIT"
                      onClick={this.handleSubmit}
                    />
                    <Button
                      buttonType="reset"
                      className="btn_reset"
                      id="add_movie_btn_reset"
                      label="RESET"
                      onClick={this.onClickReset}
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
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    addMovieToMovies: (newMovie: IMovie) => {
      dispatch(addToMovies(newMovie));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddMoviePopap);
