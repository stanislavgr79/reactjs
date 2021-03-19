import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { IMovie } from '../../../helpers/interface';

// import path_calendar from '../../../resources/images/icon_calendar.png';
const path_calendar = '../../../resources/images/calendar256.png';

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
        <img src={path_calendar} className="image_calendar" onClick={onClick} alt="" />
      </>
    );
  },
);

interface IProps {
  form: IMovie;
  handleChangeReleaseDate: (date: any) => void;
}

export default function Calendar({ form, handleChangeReleaseDate }: IProps): JSX.Element {
  const ref: React.LegacyRef<HTMLInputElement> = React.createRef();
  return (
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
          value={form.release_date ? new Date(form.release_date).toString() : ''}
          onClick={handleChangeReleaseDate}
          ref={ref}
        />
      }
      calendarClassName="calendar"
      onKeyDown={(e) => e.preventDefault()}
    />
  );
}
