import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import calendar from '../../../resources/images/calendar.png';

interface IPropInput {
  date: Date | [Date, Date] | null | string;
}

const changeReleaseDate = (date: Date | [Date, Date] | null | string) => {
  const dateFormat = require('dateformat');
  const momentDateFormat = 'yyyy-mm-dd';
  return date == (null || '') ? '' : dateFormat(date, momentDateFormat);
};

const CustomInput = forwardRef(({ date }: IPropInput, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <input
      name="release_date"
      className="simple_input"
      placeholder="Select Date"
      value={changeReleaseDate(date)}
      ref={ref}
      readOnly
    ></input>
  );
});

interface IProps {
  name: string;
  value: string;
  onChange: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
}

export default function Calendar({ name, value, onChange }: IProps): JSX.Element {
  const ref: React.LegacyRef<HTMLInputElement> = React.createRef();
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);
  const openDatePicker = () => {
    setDatePickerIsOpen(!datePickerIsOpen);
  };

  return (
    <DatePicker
      name={name}
      selected={value != '' ? new Date(value) : null}
      placeholderText="Select Date"
      dateFormat="yyyy-MM-dd"
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      onChange={(val) => {
        openDatePicker();
        onChange(name, changeReleaseDate(val));
      }}
      customInput={
        <>
          <CustomInput date={value != '' ? new Date(value) : ''} ref={ref} />
          <img src={calendar} className="image_calendar" onClick={openDatePicker} alt="" />
        </>
      }
      calendarClassName="calendar"
      onKeyDown={(e) => e.preventDefault()}
      onClickOutside={openDatePicker}
      open={datePickerIsOpen}
    />
  );
}
